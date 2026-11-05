import type { FC } from "react";

type PropsType = {
  fe_id: string;
  props: {
    text?: string;
    desc?: string;
  };
};

const QuestionInfo: FC<PropsType> = ({ props }) => {
  const { text, desc } = props;
  return (
    <div className="mb-2 text-center">
      <h2 className="text-xl font-bold">{text}</h2>
      {desc && <p className="text-gray-500 text-sm mt-1">{desc}</p>}
    </div>
  );
};

export default QuestionInfo;
