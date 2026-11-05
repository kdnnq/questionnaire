import { Outlet } from 'react-router-dom';
import styles from './ManageLayout.module.scss';
import { Button, Divider, Space, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';
import { createQuestionService } from '../services/question';
import { useRequest } from 'ahooks';

export const ManageLayout = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { loading, run: handleClick } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id || result._id}`);
      message.success('创建成功');
    },
  });
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Space orientation="vertical">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={handleClick}
              disabled={loading}
            >
              新建问卷
            </Button>
            <Divider style={{ borderTop: 'transparent' }} />
            <Button
              type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
              size="large"
              icon={<BarsOutlined />}
              onClick={() => {
                nav('/manage/list');
              }}
            >
              我的问卷
            </Button>
            <Button
              type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
              size="large"
              icon={<StarOutlined />}
              onClick={() => {
                nav('/manage/star');
              }}
            >
              标星问卷
            </Button>
            <Button
              type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
              size="large"
              icon={<DeleteOutlined />}
              onClick={() => {
                nav('/manage/trash');
              }}
            >
              回收站
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
