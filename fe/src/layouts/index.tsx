import { useEffect } from 'react';
import { connect, Outlet, useLocation, history } from 'umi';
import { BackTop } from 'antd';
import TopBar from '@/components/TopBar';
import styles from './style.less';

const NOTOPBARPATH = [
  '/',
  '/loading',
];

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // 重定向
    pathname && pathname === "/" && history.replace('/loading');
  }, [pathname]);

  return (
    NOTOPBARPATH.includes(pathname) ?(
      <Outlet/>
    ) : (<div className={styles.page}>
      {/* 头顶栏 */}
      <div className={styles.topBar}>
        <TopBar/>
      </div>
      {/* 用来在父路由中渲染子路由 */}
      <div className={styles.innerContext}>
        <Outlet/>
      </div>
      {/* 回到顶部 */}
      <BackTop style={{ right: '40px', bottom: '30px' }} />
    </div>)
  );
};

export default Layout;