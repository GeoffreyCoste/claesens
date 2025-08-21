'use client';

import styles from './style.module.scss';
import useMediaQueries from '@/hooks/useMediaQueries';
import HorizontalScroll from './horizontal-scroll';
import HorizontalSlider from './horizontal-slider';

const SectionMethodProcess = () => {
  const {mobile, tablet, desktop} = useMediaQueries();

  return (
    <section className={styles.section_method_process}>
      <h3 className={styles.section_method_process_title}>
        Créons le mouvement ...
      </h3>

      {mobile && <HorizontalScroll />}
      {!mobile && <HorizontalSlider />}
    </section>
  );
};

export default SectionMethodProcess;