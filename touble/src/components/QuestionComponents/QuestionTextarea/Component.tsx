import type { FC } from 'react';
import { Input, Typography } from 'antd';
import { QuestionTextareaDefaultProps, type QuestionTextareaPropsType } from './interface';

const QuestionTextarea: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { Paragraph } = Typography;
  const { TextArea } = Input;
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  );
};
export default QuestionTextarea;
