import type { FC } from "react";

type PropsType = {
  fe_id: string;
  props: {
    text?: string;
    level?: number;
    isCenter?: boolean;
  };
};

const QuestionTitle: FC<PropsType> = ({ props }) => {
  const { text, level = 1, isCenter = false } = props;
  const Tag = (`h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6") || "h1";
  return (
    <Tag className="font-bold mb-2 text-center">
      {text}
    </Tag>
  );
};

export default QuestionTitle;
