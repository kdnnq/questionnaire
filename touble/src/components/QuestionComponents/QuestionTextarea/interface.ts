import type { BaseComponentProps } from '../index';
export interface QuestionTextareaPropsType extends BaseComponentProps {
  title?: string;
  placeholder?: string;
  disabled?: boolean;
}
export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: '输入框标题',
  placeholder: '请输入',
};
