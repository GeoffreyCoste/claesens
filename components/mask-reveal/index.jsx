'use client';

import styles from './style.module.scss';
import { useRef, useEffect } from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import {useMedia} from '@/hooks/useMedia';

const MaskReveal = ({children, maskValues}) => {
  const containerRef = useRef(null);

  const {maskRadius, maskHeight, maskMarginTop} = maskValues;

  const {isHydrated, matches} = useMedia();
  const {mobile} = matches;

  // Framer Motion Hook to follow scroll relative to container
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['center end += 20px', 'end end']
  });

  const scrollProgressArray = mobile
    ? [0, 0.1, 0.15, 1] // mobile
    : [0, 0.25, 0.5, 1]; // desktop/tablet

  // Gradient sizes Array
  const maskGradientArray = mobile
    ? ['20px', '150px', '600px', `${maskRadius * 2}px`]
    : ['30px', '200px', '600px', `${maskRadius * 2}px`];

  // Transform progress into circle size
  const maskSize = useTransform(
    scrollYProgress,
    scrollProgressArray,
    maskGradientArray
  );

  const maskImage = useTransform(
    maskSize,
    (size) =>
      `radial-gradient(circle at center, black ${size}, transparent ${size})`
  );

  return (
    <div
      ref={containerRef}
      className={styles.mask}
      style={{height: maskHeight, marginTop: maskMarginTop}}
    >
      {isHydrated ? (
        <motion.div
          className={styles.mask_content}
          style={{
            WebkitMaskImage: maskImage,
            maskImage: maskImage
          }}
        >
          <div className={styles.body}>{children}</div>
        </motion.div>
      ) : (
        <div className={styles.body}>{children}</div>
      )}
    </div>
  );
};

export default MaskReveal;
