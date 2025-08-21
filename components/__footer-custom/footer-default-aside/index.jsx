import styles from '../style.module.scss';

const FooterDefaultAside = ({children}) => {
  return <aside className={styles.footer_default_aside}>{children}</aside>;
};

export default FooterDefaultAside;
