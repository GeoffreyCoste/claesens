'use client';

import styles from './style.module.scss';
import {useRef} from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {bricolage_grotesque} from '@/app/fonts';
import clsx from 'clsx';
import {useMedia} from '@/hooks/useMedia';
import {useScroll, useTransform, motion, useInView} from 'framer-motion';
import ImgDots from '../../public/images/img_dots.png';

const DynamicParticlesScene3d = dynamic(() => import('./particles-scene-3d'), {
  ssr: false
});

const ImageParallax = () => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);

  const {isHydrated, matches} = useMedia();
  const {mobile} = matches;

  const inView = useInView(textContainerRef, {amount: 'all'});
  const isInView = isHydrated ? inView : false;

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.parallax_container}
      style={{clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)'}}
    >
      {isHydrated && <DynamicParticlesScene3d />}
      <motion.div
        className={clsx(bricolage_grotesque.className, styles.motion_text)}
        ref={textContainerRef}
        aria-label="Chaque inspiration est un point dans le cercle de la créativité"
      >
        {isHydrated && mobile ? (
          <motion.div
            className={styles.motion_text_item}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={textVariants}
            transition={{duration: 1}}
          >
            Chaque <span className={styles.highlighted}>inspiration</span> est
            un point dans le cercle de la{' '}
            <span className={styles.highlighted}>créativité</span>.
          </motion.div>
        ) : (
          <>
            <motion.div
              className={styles.motion_text_item}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={textVariants}
              transition={{duration: 1}}
            >
              Chaque <span className={styles.highlighted}>inspiration</span> est
              un point
            </motion.div>

            <motion.div
              className={styles.motion_text_item}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={textVariants}
              transition={{duration: 1}}
            >
              dans le cercle de la{' '}
              <span className={styles.highlighted}>créativité</span>.
            </motion.div>
          </>
        )}
      </motion.div>
      <div className={styles.parallax_item}>
        <motion.div
          style={{y: isHydrated ? y : '0%'}}
          className={styles.parallax_image}
        >
          <Image
            src={ImgDots}
            fill
            alt="Motif de texture marbrée"
            style={{objectFit: 'cover'}}
            loading="lazy"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ImageParallax;