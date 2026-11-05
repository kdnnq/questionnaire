import type { FC } from 'react';
import type { QuestionRadioPropsType } from './interface';
import { QuestionRadioDefaultProps } from './interface';
import { Radio, Typography, Space } from 'antd';

const Component: FC<QuestionRadioPropsType> = (Props: QuestionRadioPropsType) => {
  const { Paragraph } = Typography;
  const { title, options = [], value, isVertical } = { ...QuestionRadioDefaultProps, ...Props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space orientation={isVertical ? 'vertical' : 'horizontal'}>
          {options.map((opt) => {
            const { value, text } = opt;
            return <Radio value={value}>{text}</Radio>;
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};
export default Component;
