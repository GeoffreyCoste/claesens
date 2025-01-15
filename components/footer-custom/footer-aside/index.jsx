import styles from '../style.module.scss';

const FooterAside = ({children}) => {
  return <aside className={styles.footer_aside}>{children}</aside>;
};

export default FooterAside;
