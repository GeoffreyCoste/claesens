'use client';

import styles from './style.module.scss';
import { useRef, useEffect } from 'react';
import { easeOut, motion, useScroll, useTransform } from 'framer-motion';
import useMediaQueries from '@/hooks/useMediaQueries';

const MaskReveal = ({ children, maskValues }) => {
  const containerRef = useRef(null);

  const { maskRadius, maskHeight, maskMarginTop } = maskValues;

  const {mobile, tablet} = useMediaQueries();

  // Hook Framer Motion pour suivre le scroll relatif au conteneur
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['center end += 20px', 'end end'],
  });

  const scrollProgressArray = mobile
  ? [0, 0.1, 0.15, 1]       // mobile
  : [0, 0.25, 0.5, 1];      // desktop/tablette, plus rapide ou avec des points différents

// Array des tailles du gradient
const maskGradientArray = mobile
  ? ['20px', '150px', '600px', `${maskRadius * 2}px`]  
  : ['30px', '200px', '600px', `${maskRadius * 2}px`];

  // Transformation de la progression en taille du cercle
  const maskSize = useTransform(
    scrollYProgress,
    scrollProgressArray,
    maskGradientArray
  );

  useEffect(() => {
    const unsub1 = scrollYProgress.on('change', (latest) => {
      console.log('progress:', latest.toFixed(3));
    });

    const unsub2 = maskSize.on('change', (latest) => {
      console.log('maskSize (radius):', latest);
    });

    return () => {
      unsub1();
      unsub2();
    };
  }, [scrollYProgress, maskSize]);

  return (
    <div
      ref={containerRef}
      className={styles.mask}
      style={{ height: maskHeight, marginTop: maskMarginTop }}
    >
      <motion.div
        className={styles.mask_content}
        style={{
          WebkitMaskImage: useTransform(
            maskSize,
            (size) =>
              `radial-gradient(circle at center, black ${size}, transparent ${size})`
          ),
          maskImage: useTransform(
            maskSize,
            (size) =>
              `radial-gradient(circle at center, black ${size}, transparent ${size})`
          ),
        }}
      >
        <div className={styles.body}>{children}</div>
      </motion.div>
    </div>
  );
};

export default MaskReveal;



/* 'use client';

import styles from './style.module.scss';
import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MaskReveal = ({ children, maskValues }) => {
  const containerRef = useRef(null);

  const { maskHeight, maskMaxSize, maskMarginTop } = maskValues;

  // Hook Framer Motion pour suivre le scroll relatif à ce conteneur
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['center end += 20px', 'end end'], // Retour aux offsets qui fonctionnent
  });

  // Transformation de la progression en taille du cercle avec courbe personnalisée
  const maskSize = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15, 1],
    ["20px", "150px", "600px", maskMaxSize]
  );

   useEffect(() => {
    // Abonnement sur la progression
    const unsub1 = scrollYProgress.on("change", (latest) => {
      console.log("progress:", latest.toFixed(3));
    });

    // Abonnement sur la taille du mask
    const unsub2 = maskSize.on("change", (latest) => {
      console.log("maskSize:", latest);
    });

    return () => {
      unsub1();
      unsub2();
    };
  }, [scrollYProgress, maskSize]);

  return (
    <div ref={containerRef} className={styles.mask} style={{ height: maskMaxSize, marginTop: maskMarginTop}}>
      <motion.div
        className={styles.mask_content}
        style={{
          WebkitMaskImage: useTransform(maskSize, (size) => 
            `radial-gradient(circle at center, black ${size}, transparent ${size})`
          ),
          maskImage: useTransform(maskSize, (size) => 
            `radial-gradient(circle at center, black ${size}, transparent ${size})`
          ),
        }}
      >
        <div className={styles.body}>
            {children}
        </div>
      </motion.div>
    </div>
  );
};

export default MaskReveal; */