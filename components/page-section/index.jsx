import styles from './style.module.scss';

const PageSection = ({children}) => {
  return <section className={styles.section}>{children}</section>;
};

export default PageSection;
