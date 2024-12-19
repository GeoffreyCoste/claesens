import styles from './style.module.scss';
import Brand from '../brand';
import SocialsList from '../socials-list';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import AnimateFade from '../animate-fade';
import {h2FooterAside} from '../animate-heading/data';
import Collapsible from '../collapsible';
import Canvas3d from './canvas-3d';

const FooterSticky = () => {
  return (
    <footer
      className={styles.footer}
      style={{clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)'}}
    >
      <div className={styles.footer_content}>
        <div className={styles.footer_item}>
          <Brand />
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
