import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HOME_PATHNAME } from '../router';
export const NotFound = () => {
  const nav = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你访问的页面不存在"
      extra={
        <Button
          type="primary"
          onClick={() => {
            nav(HOME_PATHNAME);
          }}
        >
          返回首页
        </Button>
      }
    ></Result>
  );
};
