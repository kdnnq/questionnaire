import type { FC } from "react";

type PropsType = {
  fe_id: string;
  props: {
    text?: string;
    isCenter?: boolean;
  };
};

const QuestionParagraph: FC<PropsType> = ({ props }) => {
  const { text, isCenter = false } = props;
  return (
    <p className={`mb-2 ${isCenter ? "text-center" : ""}`}>{text}</p>
  );
};

export default QuestionParagraph;
