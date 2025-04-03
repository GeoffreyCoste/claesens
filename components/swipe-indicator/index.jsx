import styles from './style.module.scss';

const SwipeIndicator = () => {
  return (
    <div className={styles.swipe_indicator}>
      <div className={styles.indication}>swipe</div>
      <div className={styles.swipe}></div>
    </div>
  );
};

export default SwipeIndicator;
