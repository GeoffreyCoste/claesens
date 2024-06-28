import styles from '../style.module.scss';

const HeadingContainer = ({children}) => {
  return <span className={styles.heading_container}>{children}</span>;
};

export default HeadingContainer;
