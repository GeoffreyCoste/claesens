'use client';

import styles from './style.module.scss';
import ButtonCopy from '../button-copy';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import { h2FooterAsideServices } from '../animate-heading/data';
import AnimateFade from '../animate-fade';
import GoeyCircles from './goey-circles';

const AsideFooterServices = () => {
  return (
    <div className={styles.aside_footer_services}>
      <aside className={styles.aside}>
        <div className={styles.content}>
          <div className={styles.anim}>
            <GoeyCircles />
          </div>
          <div className={styles.body}>
            <AnimateStagger>
              {h2FooterAsideServices.map((text, index) => (
                <AnimateHeading key={index} {...text} />
              ))}
              <AnimateFade>
                <p className={styles.text}>Un message et c’est parti !</p>
              </AnimateFade>
            </AnimateStagger>

            <ButtonCopy />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default AsideFooterServices;