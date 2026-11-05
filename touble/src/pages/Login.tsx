import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Space, Typography, Button, Checkbox, message } from 'antd';
import styles from './Login.module.scss';
import { UserAddOutlined } from '@ant-design/icons';
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../router';
import { useEffect } from 'react';
import { LoginService } from '../services/user';
import { useRequest } from 'ahooks';
import { setToken } from '../utils/user-token';

type LoginFormValues = {
  username: string;
  password: string;
  remember?: boolean;
};

export const Login = () => {
  const { Title } = Typography;
  // const nav = useNavigate();

  const USERNAME_KEY = 'USERNAME';
  const PASSWORD_KEY = 'PASSWORD';

  function rememberUser(username: string, password: string) {
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(PASSWORD_KEY, password);
  }
  function deleteUserFromStorage() {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(PASSWORD_KEY);
  }
  function getUserFromStorage() {
    return {
      username: localStorage.getItem(USERNAME_KEY),
      password: localStorage.getItem(PASSWORD_KEY),
    };
  }
  const [form] = Form.useForm();
  useEffect(() => {
    const { username, password } = getUserFromStorage();
    form.setFieldsValue({ username, password });
  }, []);

  const nav = useNavigate();
  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await LoginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result as { token?: string };
        setToken(token); //存储token
        message.success('登录成功');
        nav(MANAGE_INDEX_PATHNAME);
      },
    },
  );
  const onFinish = (values: LoginFormValues) => {
    const { username, password, remember } = values || {};
    run(username, password);

    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage();
    }
  };
  return (
    <div className={styles.container}>
      <Space>
        <Title level={2}>
          <UserAddOutlined />
        </Title>
        <Title level={2}>请登录</Title>
      </Space>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        initialValues={{ remember: true }}
        form={form}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { type: 'string', min: 5, max: 20, message: '字符长度在5-20之间' },
            { pattern: /^\w+$/, message: '只能是字母数字或者下划线' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              // onClick={() => {
              //   nav(HOME_PATHNAME);
              // }}
            >
              登录
            </Button>
            <Link to={REGISTER_PATHNAME}>注册</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};
