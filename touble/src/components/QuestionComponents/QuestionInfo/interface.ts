import type { BaseComponentProps } from '../index';

export interface QuestionInfoPropsType extends BaseComponentProps {
  title?: string;
  desc?: string;
  disabled?: boolean;
}
export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: '问卷标题',
  desc: '问卷描述',
};
