import type { FC } from "react";
import type { QuestionComponentItem } from "./index";
import {
  QuestionInput,
  QuestionTextarea,
  QuestionRadio,
  QuestionCheckbox,
  QuestionInfo,
  QuestionTitle,
  QuestionParagraph,
} from "./index";

type Props = {
  item: QuestionComponentItem;
};

// 根据组件 type 统一渲染
const QuestionComponent: FC<Props> = ({ item }) => {
  const { fe_id, type, props } = item;
  const feId = String(fe_id);

  switch (type) {
    case "questionInput":
      return (
        <QuestionInput
          fe_id={feId}
          props={props as { title: string; placeholder?: string }}
        />
      );
    case "questionTextarea":
      return (
        <QuestionTextarea
          fe_id={feId}
          props={props as { title: string; placeholder?: string }}
        />
      );
    case "questionRadio":
      return (
        <QuestionRadio
          fe_id={feId}
          props={
            props as {
              title: string;
              options: Array<{ value: string; text: string }>;
              value: string;
              isVertical: boolean;
            }
          }
        />
      );
    case "questionCheckbox":
      return (
        <QuestionCheckbox
          fe_id={feId}
          props={
            props as {
              title: string;
              list: Array<{ value: string; text: string }>;
              isVertical?: boolean;
            }
          }
        />
      );
    case "questionInfo":
      return (
        <QuestionInfo
          fe_id={feId}
          props={props as { text?: string; desc?: string }}
        />
      );
    case "questionTitle":
      return (
        <QuestionTitle
          fe_id={feId}
          props={props as { text?: string; level?: number; isCenter?: boolean }}
        />
      );
    case "questionParagraph":
      return (
        <QuestionParagraph
          fe_id={feId}
          props={props as { text?: string; isCenter?: boolean }}
        />
      );
    default:
      return null;
  }
};

export default QuestionComponent;
