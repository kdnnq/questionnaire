import type { BaseComponentProps } from '..';

export type OptionType = {
  value: string;
  text: string;
};

export interface QuestionRadioPropsType extends BaseComponentProps {
  title?: string;
  isVertical?: boolean;
  value?: string;
  options?: OptionType[];
  disabled?: boolean;
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    { value: 'item1', text: '选项1' },
    { value: 'item2', text: '选项2' },
    { value: 'item3', text: '选项3' },
  ],
  value: '',
};

// 统计组件的type
export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>;
};
