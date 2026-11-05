import type { FC } from "react";

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    list: Array<{
      value: string;
      text: string;
    }>;
    isVertical?: boolean;
  };
};

const QuestionCheckbox: FC<PropsType> = ({ fe_id, props }) => {
  const { title, list = [], isVertical = false } = props;

  return (
    <>
      <p>{title}</p>
      <ul className={`flex ${isVertical ? 'flex-col' : 'flex-row'} flex-wrap gap-x-5 gap-y-2 list-none px-0`}>
        {list.map((opt) => {
          const { value, text } = opt;
          return (
            <li key={value} className="flex items-center gap-1">
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" name={fe_id} value={value} />
                {text}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default QuestionCheckbox;
