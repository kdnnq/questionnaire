import type { FC } from "react";

// 组件数据结构（来自 Mock 的 componentList 单项）
export type QuestionComponentItem = {
  fe_id: string | number;
  type: string;
  title: string;
  isHidden: boolean;
  isLocked: boolean;
  props: Record<string, unknown>;
};

// 各组件的 Props 通用结构
export type ComponentProps<T = Record<string, unknown>> = {
  fe_id: string;
  props: T;
};

// 统一导出所有组件
export { default as QuestionInput } from "./QuestionInput/QuestionInput";
export { default as QuestionTextarea } from "./QuestionTextarea/QuestionTextarea";
export { default as QuestionRadio } from "./QuestionRadio/QuestionRadio";
export { default as QuestionCheckbox } from "./QuestionCheckbox/QuestionCheckbox";
export { default as QuestionInfo } from "./QuestionInfo/QuestionInfo";
export { default as QuestionTitle } from "./QuestionTitle/QuestionTitle";
export { default as QuestionParagraph } from "./QuestionParagraph/QuestionParagraph";

// 统一渲染器
export { default as QuestionComponent } from "./QuestionComponent";
