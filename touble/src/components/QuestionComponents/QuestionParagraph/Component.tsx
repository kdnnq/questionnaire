import type { FC } from 'react';
import { QuestionParagraphDefaultProps, type QuestionParagraphPropsType } from './interface';
import { Typography } from 'antd';

const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { Paragraph } = Typography;
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props };
  const textList = text.split('\n');
  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
      {textList.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  );
};
export default Component;
