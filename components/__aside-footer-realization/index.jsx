'use client';

import styles from './style.module.scss';
import {forwardRef} from 'react';
import ButtonCopy from '../button-copy';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import {h2FooterAsideRealization} from '../animate-heading/data';
import AnimateFade from '../animate-fade';
import SvgEllipsesAnim from './svg-ellipses-anim';

const AsideFooterRealization = forwardRef(
  function AsideFooterRealization(props, ref) {
    return (
      <div className={styles.aside_footer_realization}>
        <aside className={styles.aside}>
          <div className={styles.content}>
            <div className={styles.anim}>
              <SvgEllipsesAnim />
            </div>
            <div className={styles.body}>
              <AnimateStagger>
                <div ref={ref}>
                  {h2FooterAsideRealization.map((text, index) => (
                    <AnimateHeading key={index} {...text} />
                  ))}
                </div>
                <AnimateFade>
                  <p className={styles.text}>Une seule connexion suffit !</p>
                </AnimateFade>
              </AnimateStagger>

              <ButtonCopy />
            </div>
          </div>
        </aside>
      </div>
    );
  }
);

export default AsideFooterRealization;