import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './MainLayout.module.scss';
import { Logo } from '../components/Logo';
import { UserInfo } from '../components/UserInfo';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';

const { Header, Footer, Content } = Layout;
export const MainLayout = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>{!waitingUserData && <Outlet />}</Content>
      </Layout>

      <Footer className={styles.footer}>小慕问卷 2026.8.17-2026.9.05 小董</Footer>
    </Layout>
  );
};
