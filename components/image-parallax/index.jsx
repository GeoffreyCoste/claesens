'use client';

import styles from './style.module.scss';
import {useRef} from 'react';
import Image from 'next/image';
import {bricolage_grotesque} from '@/app/fonts';
import clsx from 'clsx';
import useMediaQueries from '@/hooks/useMediaQueries';
import {useScroll, useTransform, motion, useInView} from 'framer-motion';
import ImgDots from '../../public/images/img_dots.png';
import ParticlesScene3d from './particles-scene-3d';

const ImageParallax = () => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);

  const isInView = useInView(textContainerRef, {amount: 'all'});

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const textArray = [
    'Chaque inspiration est un point',
    'dans le cercle de la créativité.'
  ].map((text) =>
    text
      .replace(
        'inspiration',
        '<span className="' + styles.highlighted + '">inspiration</span>'
      )
      .replace(
        'créativité',
        '<span className="' + styles.highlighted + '">créativité</span>'
      )
  );

  const {mobile} = useMediaQueries();

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
      <ParticlesScene3d />
      <motion.div
        className={clsx(bricolage_grotesque.className, styles.motion_text)}
        ref={textContainerRef}
        aria-label="Chaque inspiration est un point dans le cercle de la créativité"
      >
        {mobile ? (
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
        {/* {textArray.map((text, index) => (
          <motion.div
            key={`parallax-text-${index}`}
            className={styles.motion_text_item}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={textVariants}
            transition={{delay: index * 0.2, duration: 1}}
            dangerouslySetInnerHTML={{__html: text}} // Use of dangerouslySetInnerHTML to inject spans
          />
        ))} */}
      </motion.div>
      <div className={styles.parallax_item}>
        <motion.div style={{y}} className={styles.parallax_image}>
          <Image
            src={ImgDots}
            fill
            alt="Motif de texture marbrée"
            style={{objectFit: 'cover'}}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ImageParallax;