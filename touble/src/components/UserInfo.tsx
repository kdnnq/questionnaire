import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { removeToken } from '../utils/user-token';
import { useDispatch } from 'react-redux';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { logoutReducer } from '../store/userReducer';

export const UserInfo = () => {
  const { username, nickname } = useGetUserInfo();
  const nav = useNavigate();
  const dispatch = useDispatch();

  function LoginOut() {
    dispatch(logoutReducer());
    removeToken();
    nav(LOGIN_PATHNAME);
  }
  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={LoginOut}>
        退出
      </Button>
    </>
  );
  const Login = (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>;
    </>
  );
  return <div>{username ? UserInfo : Login}</div>;
};
