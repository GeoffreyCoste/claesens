'use client';

import RealizationDisplay from '@/components/realization-display';
import styles from './page.module.scss';

export default function Realization() {
  return (
    <section className={styles.realization_content}>
      <div className={styles.screen_spacer}></div>
      <RealizationDisplay />
    </section>
  );
}
