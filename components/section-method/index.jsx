'use client';

import styles from './style.module.scss';
import {h1SectionMethod} from '../animate-heading/data';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import AnimateFade from '../animate-fade';
import PinContainer from './pin-container';

const SectionMethod = () => {
  return (
    <section className={styles.section_method}>
      <div className={styles.section_method_content}>
        <div className={styles.section_method_heading}>
          <AnimateStagger>
            {h1SectionMethod.map((text, index) => (
              <AnimateHeading key={index} {...text} />
            ))}
            <AnimateFade>
              <div className={styles.section_method_item}>
                <p className={styles.section_method_text}>
                  Mon approche structurée avec soin favorise une collaboration
                  simple et efficace.
                </p>
              </div>
            </AnimateFade>
          </AnimateStagger>
        </div>
        <div className={styles.section_method_wrapper}>
          <PinContainer />
        </div>
      </div>
    </section>
  );
};

export default SectionMethod;