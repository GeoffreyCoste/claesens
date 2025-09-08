'use client';

import styles from './style.module.scss';
import AnimateFade from '../animate-fade';
import AnimateHeading from '../animate-heading';
import AnimateStagger from '../animate-stagger';
import StaggeredText from '@/components/staggered-text';
import { h2SectionMethodInterlude } from '../animate-heading/data';

const SectionMethodInterlude = () => {

  return (
    <section className={styles.section_method_interlude}>
      <div className={styles.section_heading}>
        <AnimateStagger>
          {h2SectionMethodInterlude.map((text, index) => (
            <AnimateHeading key={index} {...text} isWhite />
          ))}
          <AnimateFade>
            <div className={styles.section_heading_item}>
              <p className={styles.section_heading_text}>
                Chaque étape s&apos;enchaîne harmonieusement, <br />
                comme un cercle de créativité en perpétuel mouvement.
              </p>
            </div>
          </AnimateFade>
        </AnimateStagger>
      </div>

      <StaggeredText text={'immersion exploration itération réalisation'} />
    </section>
  );
};

export default SectionMethodInterlude;