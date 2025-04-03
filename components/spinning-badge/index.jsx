import styles from './style.module.scss';
import clsx from 'clsx';
import CurvedTextScrollDown from './curved-text-scroll-down';
import CurvedTextScrollDownOrBack from './curved-text-scroll-down-or-back';
import ArrowRight from '../icons/arrow-right';
import ScrollIndicator from '../scroll-indicator';

const SpinningBadge = ({defaultText = true}) => {
  return (
    <div className={styles.spinning_badge}>
      {defaultText ? <CurvedTextScrollDown /> : <CurvedTextScrollDownOrBack />}
      <div
        className={clsx(styles.circle, {[styles.circle_yellow]: defaultText})}
      >
        {defaultText ? (
          <div className={styles.icon_arrow}>
            <ArrowRight color={'#1e1e1e'} />
          </div>
        ) : (
          <div className={styles.icon_scroller}>
            <ScrollIndicator />
          </div>
        )}
      </div>
    </div>
  );
};

export default SpinningBadge;
