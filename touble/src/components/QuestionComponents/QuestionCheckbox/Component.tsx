import type { FC } from 'react';
import type { QuestionCheckboxPropsType } from './interface';
import { QuestionCheckboxDefaultProps } from './interface';
import { Typography, Space, Checkbox } from 'antd';

const Component: FC<QuestionCheckboxPropsType> = (Props: QuestionCheckboxPropsType) => {
  const { Paragraph } = Typography;
  const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...Props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space orientation={isVertical ? 'vertical' : 'horizontal'}>
        {list.map((opt) => {
          const { value, text, checked } = opt;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};
export default Component;
