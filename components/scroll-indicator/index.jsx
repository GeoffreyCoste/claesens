import styles from './style.module.scss';

const ScrollIndicator = () => {
  return (
    <div className={styles.scroll_indicator}>
      <div className={styles.mouse}></div>
      <div className={styles.ball}></div>
    </div>
  );
};

export default ScrollIndicator;
