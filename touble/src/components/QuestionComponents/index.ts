import type { FC } from 'react';
import QuestionInputConf, { type QuestionInputPropsType } from './QuestionInput/index';
import QuestionTitleConf, { type QuestionTitlePropsType } from './QuestionTitle/index';
import QuestionParagraphConf, { type QuestionParagraphPropsType } from './QuestionParagraph';
import QuestionInfoConf, { type QuestionInfoPropsType } from './QuestionInfo';
import QuestionTextareaConf, { type QuestionTextareaPropsType } from './QuestionTextarea';
import QuestionRadioConf, {
  type QuestionRadioPropsType,
  type QuestionRadioStatPropsType,
} from './QuestionRadio';
import QuestionCheckboxConf, {
  type QuestionCheckboxPropsType,
  type QuestionCheckboxStatPropsType,
} from './QuestionCheckbox';

export interface BaseComponentProps {
  onChange?: (newProps: BaseComponentProps) => void;
}
// 统一各组件的prop type
export type ComponentPropsType =
  | QuestionInputPropsType
  | QuestionTitlePropsType
  | QuestionParagraphPropsType
  | QuestionInfoPropsType
  | QuestionTextareaPropsType
  | QuestionRadioPropsType
  | QuestionCheckboxPropsType;

// 统一各组件的统计属性类型
export type ComponentStatPropsType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType;

// 统一 组件配置type
export type ComponentConfType<T extends BaseComponentProps = BaseComponentProps> = {
  title: string;
  type: string;
  Component: FC<T>;
  PropComponent: FC<T>;
  defaultProps: T;
};

// 统计图表组件异步加载器：动态 import，让 recharts 等重依赖不进入首屏包
export const statComponentLoaders: Record<
  string,
  () => Promise<{ default: FC<ComponentStatPropsType> }>
> = {
  questionRadio: () => import('./QuestionRadio/StatComponent'),
  questionCheckbox: () => import('./QuestionCheckbox/StatComponent'),
};

// 全部组件配置的列表
export const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
];
// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
];

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}
