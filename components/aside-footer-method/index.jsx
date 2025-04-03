'use client';

import styles from './style.module.scss';
import ButtonCopy from '../button-copy';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import { h2FooterAsideMethod } from '../animate-heading/data';
import AnimateFade from '../animate-fade';
import Shapes from './shapes';

const AsideFooterMethod = () => {
  return (
    <div className={styles.aside_footer_method}>
        <aside className={styles.aside}>
            <div className={styles.content}>
                <div className={styles.anim}>
                  <Shapes />
                </div>
                <div className={styles.body}>
                  <AnimateStagger>
                      {h2FooterAsideMethod.map((text, index) => (
                        <AnimateHeading key={index} {...text} />
                      ))}
                      <AnimateFade>
                          <p className={styles.text}>Discutons-en !</p>
                      </AnimateFade>
                  </AnimateStagger>

                  <ButtonCopy />
                </div>
            </div>
        </aside>
    </div>
  )
}

export default AsideFooterMethod;