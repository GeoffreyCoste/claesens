import styles from './style.module.scss';
import Canvas3d from './canvas-3d';
import Brand from '../brand';
import SocialsList from '../socials-list';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import AnimateFade from '../animate-fade';
import {h2FooterAside} from '../animate-heading/data';
import ButtonCopy from '../button-copy';

const FooterNew = () => {
  return (
    <footer
      className={styles.footer}
      style={{clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)'}}
    >
      <aside className={styles.footer_aside}>
        <Canvas3d />
        <div className={styles.footer_aside_overlay}>
          <div className={styles.overlay_item}>
            <AnimateStagger>
              {h2FooterAside.map((text, index) => (
                <AnimateHeading key={index} {...text} />
              ))}
              <AnimateFade>
                <div className={styles.item_container}>
                  <p className={styles.item_text}>
                    Ensemble, faisons rayonner vos idées !
                  </p>
                </div>
              </AnimateFade>
            </AnimateStagger>

            <ButtonCopy />
          </div>
        </div>
      </aside>
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

export default FooterNew;
