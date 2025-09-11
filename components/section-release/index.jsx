'use client';

import styles from './style.module.scss';
import {useState, useRef, useLayoutEffect} from 'react';
import {useMedia} from '@/hooks/useMedia';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import AnimateFade from '../animate-fade';
import {h2SectionRelease} from '../animate-heading/data';
import ReleaseList from './release-list';
import releases from './release-list/data';
import Button from '../button';
import MaskReveal from '../mask-reveal';

const SectionRelease = () => {
  const [sectionHeight, setSectionHeight] = useState(0);
  const [maskValues, setMaskValues] = useState({
    maskRadius: 0,
    maskHeight: 0,
    maskMarginTop: 0
  });

  const contentRef = useRef(null);

  const {isHydrated, matches} = useMedia();
  const {mobile, tablet} = matches;

  useLayoutEffect(() => {
    if (!isHydrated) return;

    const content = contentRef.current;
    if (!content) return;

    const rect = content.getBoundingClientRect();
    const contentWidth = rect.width;
    const contentHeight = rect.height;

    const radius = Math.max(contentHeight, contentWidth / 2);

    const maskRadius = radius * 1.05; // small safety margin
    const maskHeight = tablet ? maskRadius * 3 : maskRadius * 2; // full circle diameter
    const maskMarginTop = -(maskHeight * (mobile ? 0.4 : 0.25)); // align circle center with content top
    const sectionHeight = maskHeight + maskMarginTop;

    setMaskValues({
      maskRadius,
      maskHeight,
      maskMarginTop
    });
    setSectionHeight(sectionHeight);
  }, [isHydrated, mobile, tablet]);

  return (
    <section className={styles.section_release} style={{height: sectionHeight}}>
      <div className={styles.container}>
        <MaskReveal maskValues={maskValues}>
          <div ref={contentRef} className={styles.content}>
            <div className={styles.content_inner}>
              <AnimateStagger isTextCentered={true}>
                {h2SectionRelease.map((text, index) => (
                  <AnimateHeading key={index} isWhite={true} {...text} />
                ))}
                <AnimateFade>
                  <p className={styles.text}>
                    Découvrez quelques-unes de mes créations originales.
                  </p>
                </AnimateFade>
              </AnimateStagger>
              <ReleaseList items={releases} />
              <Button pathname={'realisations'} title={'tout voir'} outline />
            </div>
          </div>
        </MaskReveal>
      </div>
    </section>
  );
};

export default SectionRelease;