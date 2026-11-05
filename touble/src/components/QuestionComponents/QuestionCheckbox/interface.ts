import type { BaseComponentProps } from '../index';

export type OptionType = {
  value: string;
  text: string;
  checked: boolean;
};

export interface QuestionCheckboxPropsType extends BaseComponentProps {
  title?: string;
  isVertical?: boolean;
  list?: OptionType[];
  disabled?: boolean;
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选标题',
  isVertical: false,
  list: [
    { value: 'item1', text: '选项1', checked: false },
    { value: 'item2', text: '选项2', checked: false },
    { value: 'item3', text: '选项3', checked: false },
  ],
};
// 统计组件的type
export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>;
};
