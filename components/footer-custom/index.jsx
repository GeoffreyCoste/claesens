'use client';

import styles from './style.module.scss';
import clsx from 'clsx';
import useMediaQueries from '@/hooks/useMediaQueries';
import useFooterContent from '@/hooks/useFooterContent';
import SocialsList from '../socials-list';
import FooterDefaultAside from './footer-default-aside';
import Canvas3d from './canvas-3d';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import AnimateFade from '../animate-fade';
import {h2FooterAside} from '../animate-heading/data';
import ButtonCopy from '../button-copy';
import AsideContent from './footer-default-aside/aside-content';

const FooterCustom = ({
  bgBlack = false,
  includeAside = true,
  defaultAside = true,
  variants,
  children
}) => {
  const {mobile} = useMediaQueries();
  const {isFooterContentVisible} = useFooterContent();

  const shouldApplyClipPath = includeAside && mobile;

  return (
    <footer
      className={clsx(
        styles.footer,
        {
          [styles.footer_bg_black]: bgBlack,
          [styles.footer_bg_gray]: !bgBlack,
          [styles.footer_h_300vh]: includeAside,
          [styles.footer_h_100vh]: !includeAside && mobile,
          [styles.footer_h_auto]: !includeAside && !mobile
        },
        variants?.map((v) => styles[v]).filter(Boolean)
      )}
      /* className={`${styles.footer} ${bgBlack ? styles.footer_bg_black : styles.footer_bg_gray} ${includeAside ? styles.footer_h_300vh : mobile ? styles.footer_h_100vh : styles.footer_h_auto} `} */
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
      {includeAside &&
        (defaultAside ? (
          <FooterDefaultAside>
            <AsideContent />
          </FooterDefaultAside>
        ) : (
          children
        ))}

      <div
        className={clsx(styles.footer_content, {
          [styles.hidden]: !isFooterContentVisible
        })}
      >
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

{
  /* {includeAside &&
        (defaultAside ? (
          <FooterDefaultAside>
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
          </FooterDefaultAside>
        ) : (
          children
        ))} */
}

{
  /* {includeAside && (
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
      )} */
}