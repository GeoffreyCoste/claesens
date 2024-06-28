'use client';

import styles from './style.module.scss';
import {forwardRef} from 'react';
import Button from '../button';
import ReleaseList from './release-list';
import releases from './release-list/data';
import AnimateStagger from '../animate-stagger';
import {h2SectionRelease} from '../animate-heading/data';
import AnimateHeading from '../animate-heading';
import AnimateFade from '../animate-fade';
import AnimateCirclePath from '../animate-circle-path';

const SectionRelease = forwardRef(function SectionRelease(props, ref) {
  return (
    <section ref={ref} className={styles.section_release}>
      <AnimateCirclePath>
        <div className={styles.section_release_content}>
          <AnimateStagger isTextCentered={true}>
            {h2SectionRelease.map((text, index) => (
              <AnimateHeading key={index} isWhite={true} {...text} />
            ))}
            <AnimateFade>
              <p className={styles.section_release_content_text}>
                Découvrez quelques-unes de mes créations originales.
              </p>
            </AnimateFade>
          </AnimateStagger>
          <ReleaseList items={releases} />
          <Button pathname={'/'} title={'tout voir'} outline />
        </div>
      </AnimateCirclePath>
    </section>
  );
});

export default SectionRelease;
