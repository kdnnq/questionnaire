import { useNavigate } from 'react-router-dom';
import { Button, Typography, Spin } from 'antd';
import { useRequest } from 'ahooks';
import { MANAGE_INDEX_PATHNAME } from '../router';
import { getHomeStatService } from '../services/stat';
import styles from './Home.module.scss';

export const Home = () => {
  const { Title, Paragraph } = Typography;
  const nav = useNavigate();

  const { data, loading } = useRequest(async () => {
    const res = await getHomeStatService();
    return res;
  });

  const {
    createdCount = 0,
    publishedCount = 0,
    answerCount = 0,
  } = (data || {}) as {
    createdCount?: number;
    publishedCount?: number;
    answerCount?: number;
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线编辑</Title>
        {loading ? (
          <div style={{ marginTop: '16px' }}>
            <Spin />
          </div>
        ) : (
          <Paragraph>
            已累计创建问卷{createdCount}份，已发布问卷{publishedCount}份，收到答卷{answerCount}份
          </Paragraph>
        )}
      </div>
      <div>
        <Button
          type="primary"
          onClick={() => {
            nav(MANAGE_INDEX_PATHNAME);
          }}
        >
          开始使用
        </Button>
      </div>
    </div>
  );
};
