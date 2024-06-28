import styles from './style.module.scss';
import clsx from 'clsx';
import CurvedText from './curved-text';
import ArrowRight from '../icons/arrow-right';

const SpinningBadge = () => {
  return (
    <div className={styles.spinning_badge}>
      <CurvedText />
      <div className={clsx(styles.circle, styles.circle_yellow)}>
        <div className={styles.icon}>
          <ArrowRight color={'#1e1e1e'} />
        </div>
      </div>
    </div>
  );
};

export default SpinningBadge;
