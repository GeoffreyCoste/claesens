import styles from './style.module.scss';
import clsx from 'clsx';
import ArrowDownRight from '../icons/arrow-down-right';
import CurvedText from './curved-text';

const SpinningBadge = () => {
  return (
    <div className={styles.badge}>
      <CurvedText />
      <div className={clsx(styles.circle, styles.circle_yellow)}>
        <div className={styles.icon}>
          <ArrowDownRight />
        </div>
      </div>
    </div>
  );
};

export default SpinningBadge;
