'use client';

import styles from './style.module.scss';
import {useMedia} from '@/hooks/useMedia';
import HorizontalScroll from './horizontal-scroll';
import HorizontalSlider from './horizontal-slider';

const SectionMethodProcess = () => {
  const {isHydrated, matches} = useMedia();
  const {mobile, tablet, desktop} = matches;

  let Component = null;
  if (isHydrated) {
    if (mobile) {
      Component = HorizontalScroll;
    } else if (tablet || desktop) {
      Component = HorizontalSlider;
    }
  }

  return (
    <section className={styles.section_method_process}>
      <h3 className={styles.section_method_process_title}>
        Créons le mouvement ...
      </h3>

      {Component && <Component />}
    </section>
  );
};

export default SectionMethodProcess;