import { Form, Input, Checkbox, Select, Button, Space } from 'antd';
import { type QuestionRadioPropsType } from './interface';
import type { FC } from 'react';
import { useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';
import { type OptionType } from './interface';

const PropComponent: FC<QuestionRadioPropsType> = (props) => {
  const { title, options = [], value, isVertical, onChange, disabled } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title,
      options,
      value,
      isVertical,
    });
  }, [form, title, options, value, isVertical]);

  function handleChange() {
    if (!onChange) return;

    const values = form.getFieldsValue(true);

    const newValues: QuestionRadioPropsType = {
      ...values,
      options: (values.options || [])
        .filter((opt: OptionType) => opt != null)
        .map((opt: OptionType) => ({
          ...opt,
          value: opt.value || nanoid(5),
        })),
    };

    onChange(newValues);
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        title,
        options,
        value,
        isVertical,
      }}
      onValuesChange={handleChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => (
                <Space key={key} align="baseline">
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      {
                        required: true,
                        message: '请输入选项文字',
                      },
                      {
                        validator: (_, text) => {
                          if (!text) {
                            return Promise.resolve();
                          }

                          const options = form.getFieldValue('options') || [];

                          const count = options.filter(
                            (opt: OptionType) => opt?.text === text,
                          ).length;

                          if (count <= 1) {
                            return Promise.resolve();
                          }

                          return Promise.reject(new Error('和其他选项重复了'));
                        },
                      },
                    ]}
                  >
                    <Input placeholder="输入选项文字..." />
                  </Form.Item>

                  {index > 1 && (
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(name);

                        // Form.List 操作完成之后同步给父组件
                        setTimeout(() => {
                          handleChange();
                        });
                      }}
                    />
                  )}
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  block
                  icon={<PlusOutlined />}
                  onClick={() => {
                    add({
                      text: '',
                      value: nanoid(5),
                    });

                    // Form.List 操作完成之后同步给父组件
                    setTimeout(() => {
                      handleChange();
                    });
                  }}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item label="默认选中" name="value">
        <Select
          options={(form.getFieldValue('options') || []).map((opt: OptionType) => ({
            value: opt.value,
            label: opt.text || '',
          }))}
        />
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
