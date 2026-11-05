import type { BaseComponentProps } from '../index';

export interface QuestionParagraphPropsType extends BaseComponentProps {
  text?: string;
  isCenter?: boolean;
  disabled?: boolean;
}
export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '一行段落',
  isCenter: false,
};
