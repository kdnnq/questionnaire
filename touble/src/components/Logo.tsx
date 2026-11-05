import { FormOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router';
import useGetUserInfo from '../hooks/useGetUserInfo';

export const Logo = () => {
  const { Title } = Typography;
  const { username } = useGetUserInfo();
  const targetPath = username ? MANAGE_INDEX_PATHNAME : HOME_PATHNAME;

  return (
    <div className={styles.container}>
      <Link to={targetPath}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>小慕问卷</Title>
        </Space>
      </Link>
    </div>
  );
};
