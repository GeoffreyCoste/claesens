'use client';

import styles from './style.module.scss';
import useMediaQueries from '@/hooks/useMediaQueries';
import HorizontalScroll from '../../horizontal-scroll';
import HorizontalMotion from '../../horizontal-motion';

const SectionMethodProcess = () => {
  const {mobile, tablet} = useMediaQueries();

  return (
    <section className={styles.section_method_process}>
      <h3 className={styles.section_method_process_title}>
        Créons le mouvement ...
      </h3>

      {mobile && <HorizontalScroll />}
      {tablet && <HorizontalMotion />}
    </section>
  );
};

export default SectionMethodProcess;
