import styles from './style.module.scss';

const Badge = ({text}) => {
  return <span className={styles.badge}>{text}</span>;
};

export default Badge;
