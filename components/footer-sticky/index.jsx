import styles from './style.module.scss';
import Brand from '../brand';
import SocialsList from '../socials-list';

const FooterSticky = () => {
  return (
    <footer
      className={styles.footer}
      style={{clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)'}}
    >
      <div className={styles.footer_content}>
        <div className={styles.footer_item}>
          <Brand></Brand>
        </div>
        <div className={styles.footer_item}>
          <div className={styles.footer_item_socials}>
            <SocialsList />
          </div>
        </div>
        <div className={styles.footer_item}>
          <span className={styles.footer_item_text}>&copy; 2024 claesens</span>
          <span className={styles.footer_item_text}>
            Créé avec &hearts; par Emilie Claesens
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSticky;
