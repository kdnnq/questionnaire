import { Form, Input, Checkbox, Space, Button } from 'antd';
import type { FC } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect } from 'react';

import type { QuestionCheckboxPropsType, OptionType } from './interface';

const PropComponent: FC<QuestionCheckboxPropsType> = (props) => {
  const { title, isVertical, list = [], onChange, disabled } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title,
      isVertical,
      list,
    });
  }, [title, isVertical, list, form]);

  function handleChange() {
    if (!onChange) return;

    const values = form.getFieldsValue(true);

    const newValues: QuestionCheckboxPropsType = {
      ...values,

      list: (values.list || [])
        .filter((opt: OptionType) => opt != null)
        .map((opt: OptionType) => ({
          ...opt,

          value: opt.value || nanoid(5),

          checked: opt.checked ?? false,
        })),
    };

    onChange(newValues);
  }

  /**
   * Input / Checkbox 修改
   */

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        title,
        isVertical,
        list,
      }}
      disabled={disabled}
      onValuesChange={handleChange}
    >
      {/* 标题 */}
      <Form.Item
        label="标题"
        name="title"
        rules={[
          {
            required: true,
            message: '请输入标题',
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* 选项 */}
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => (
                <Space
                  key={key}
                  align="baseline"
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                  }}
                >
                  {/* 是否默认选中 */}
                  <Form.Item
                    name={[name, 'checked']}
                    valuePropName="checked"
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    <Checkbox />
                  </Form.Item>

                  {/* 选项文字 */}
                  <Form.Item
                    name={[name, 'text']}
                    style={{
                      marginBottom: 0,
                    }}
                    rules={[
                      {
                        required: true,
                        message: '请输入选项文字',
                      },
                      {
                        validator: (_, text) => {
                          // 空值交给 required 处理
                          if (!text) {
                            return Promise.resolve();
                          }

                          const currentList: OptionType[] = form.getFieldValue('list') || [];

                          const count = currentList.filter((opt) => opt?.text === text).length;

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

                  {/* 第一项不允许删除 */}
                  {index > 0 && (
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(name);

                        // 等 Form.List 完成更新后同步
                        setTimeout(() => {
                          handleChange();
                        }, 0);
                      }}
                    />
                  )}
                </Space>
              ))}

              {/* 添加选项 */}
              <Form.Item>
                <Button
                  type="dashed"
                  block
                  icon={<PlusOutlined />}
                  onClick={() => {
                    add({
                      text: '',
                      value: nanoid(5),
                      checked: false,
                    });

                    // 等 Form.List 更新结束
                    setTimeout(() => {
                      handleChange();
                    }, 0);
                  }}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      {/* 排列方式 */}
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
