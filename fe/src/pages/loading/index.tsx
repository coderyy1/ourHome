import { history } from 'umi';
import styles from './style.less';

// 猫猫gif
import catRunGif from '@/assets/loadingPage/smooth.gif';

const LoadingPage: React.FC = () => {

  const toHomePage = () => {
    history.replace('/home');
  };

  return (
    <div className={styles.loadingPage}>
      <div className={styles.loadingBar}>
        <div className={styles.catGif}>
          <img src={catRunGif} alt="" />
        </div>
        <div className={styles.bgBar}>
          <div className={styles.innerBar} />
        </div>
      </div>
      <div className={styles.btn} onClick={toHomePage}>
        前往
      </div>
    </div>
  );
};

export default LoadingPage;