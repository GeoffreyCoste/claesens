'use client';

import styles from './style.module.scss';
import useMediaQueries from '@/hooks/useMediaQueries';
import ScrollTriggerWrapper from '..';
import HorizontalScroll from '../../horizontal-scroll';
import HorizontalMotion from '../../horizontal-motion';

const SectionMethodProcess = () => {
  const {mobile, tablet, desktop} = useMediaQueries();

  return (
    <section className={styles.section_method_process}>
      <h2 className={styles.section_method_process_title}>
        Créons le mouvement ...
      </h2>

      {mobile && <HorizontalScroll />}
      {tablet && <HorizontalMotion />}
      {desktop && <ScrollTriggerWrapper />}
    </section>
  );
};

export default SectionMethodProcess;
