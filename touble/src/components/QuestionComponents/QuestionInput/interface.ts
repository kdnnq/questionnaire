import type { BaseComponentProps } from '../index';
export interface QuestionInputPropsType extends BaseComponentProps {
  title?: string;
  placeholder?: string;
  disabled?: boolean;
}
export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: '输入框标题',
  placeholder: '请输入',
};
