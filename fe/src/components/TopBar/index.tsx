import BgmController from '../BgmController';
import transFlag from '@/assets/topBar/transFlag.png';
import styles from './style.less';

const TopBar: React.FC = () => {

  return (
    <div className={styles.comp}>
      <div className={styles.leftInfo}>
        <img className={styles.topicIcon} src={transFlag} alt="" />
        <div className={styles.mainTitle}>this is TopBar</div>
      </div>
      <div className={styles.rightTools}>
        <BgmController />
      </div>
    </div>
  );
};

export default TopBar;