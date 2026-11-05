import { QuestionComponent, type QuestionComponentItem } from "@/components/QuestionComponents";
import { getQuestionById } from "@/service/question";

type QuestionData = {
  _id: string;
  title: string;
  desc?: string;
  isPublished: boolean;
  isDeleted: boolean;
  componentList: QuestionComponentItem[];
};

type PageProps = {
  params: Promise<{ id: string }>;
};

function StatusPage({ title, message }: { title: string; message: string }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        <p className="text-gray-500">{message}</p>
      </div>
    </div>
  );
}

export default async function Question({ params }: PageProps) {
  const { id } = await params;

  // 获取问卷数据
  let resData: { errno: number; data?: QuestionData; msg?: string };
  try {
    resData = await getQuestionById(id);
  } catch {
    return <StatusPage title="错误" message="获取问卷数据失败，请检查 Mock 服务是否启动" />;
  }

  const { errno, data, msg = "" } = resData;
  if (errno !== 0) return <StatusPage title="错误" message={msg} />;

  const {
    _id: questionId,
    title = "",
    desc = "",
    isDeleted,
    isPublished,
    componentList = [],
  } = data || ({} as QuestionData);

  if (isDeleted) return <StatusPage title={title} message="该问卷已被删除" />;
  if (!isPublished) return <StatusPage title={title} message="该问卷还未发布" />;

  // 过滤隐藏组件
  const visibleList = componentList.filter((c) => !c.isHidden);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8">
      <main className="w-full max-w-[500px] bg-white shadow-md rounded-t-sm flex-1">
        <form method="post" action="/api/answer">
          <input type="hidden" name="questionId" value={questionId} />
          <div className="p-6">
            {desc && (
              <div className="mb-4 pb-4 border-b border-gray-100">
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            )}
            {visibleList.map((comp, index) => (
              <div
                key={comp.fe_id}
                className={
                  index < visibleList.length - 1
                    ? "border-b border-gray-100 pb-2 mb-2"
                    : "pb-2 mb-4"
                }
              >
                <QuestionComponent item={comp} />
              </div>
            ))}
            <div className="text-center pb-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded text-sm transition-colors cursor-pointer"
              >
                提交
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
