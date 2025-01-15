'use client';

import styles from './style.module.scss';
import useMediaQueries from '@/hooks/useMediaQueries';
import SocialsList from '../socials-list';
import FooterAside from './footer-aside';
import Canvas3d from './canvas-3d';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import AnimateFade from '../animate-fade';
import {h2FooterAside} from '../animate-heading/data';
import ButtonCopy from '../button-copy';

const FooterCustom = ({bgBlack = false, includeAside = true}) => {
  const {mobile} = useMediaQueries();

  const shouldApplyClipPath = includeAside && mobile;

  return (
    <footer
      className={`${styles.footer} ${bgBlack ? styles.footer_bg_black : styles.footer_bg_gray} ${includeAside ? styles.footer_h_300vh : mobile ? styles.footer_h_100vh : styles.footer_h_auto}`}
      /* style={{clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)'}} */
      style={
        includeAside
          ? {clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)'}
          : mobile
            ? {clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)'}
            : {}
      }
      /* style={
        shouldApplyClipPath
          ? {clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)'}
          : {}
      } */
    >
      {includeAside && (
        <FooterAside>
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
        </FooterAside>
      )}
      {/* {includeAside && (
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
      )} */}
      <div className={styles.footer_content}>
        <div className={`${styles.footer_item} ${styles.item_socials}`}>
          <SocialsList />
        </div>
        <div className={`${styles.footer_item} ${styles.item_copyright}`}>
          <span className={styles.footer_item_text}>&copy; 2024 claesens</span>
          <span className={styles.footer_item_text}>
            Créé avec {bgBlack ? '🤍' : '🖤'} par Emilie Claesens
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterCustom;
