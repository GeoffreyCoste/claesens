import styles from './style.module.scss';
import {useEffect, useRef} from 'react';
import {motion, useAnimation, useInView} from 'framer-motion';
import clsx from 'clsx';
import {dm_sans, bricolage_grotesque} from '@/app/font';
import {labels, circlePositions, blobPositions} from './data';

const GooeyCircles = () => {
  const containerRef = useRef(null);
  const circleControls = useAnimation();
  const blobControls = useAnimation();
  const inView = useInView(containerRef, {amount: 0.2, once: true});

  useEffect(() => {
    if (inView) {
      const animateCirclesSequence = async () => {
        for (let i = 0; i < circlePositions.length; i++) {
          const {targets, x, y} = circlePositions[i];
          await circleControls.start((index) =>
            targets.includes(index) ? {x, y, transition: {duration: 1}} : {}
          );
        }
      };

      const animateBlobsSequence = async () => {
        for (let i = 0; i < blobPositions.length; i++) {
          const {x, y} = blobPositions[i];
          await blobControls.start((index) =>
            index === i
              ? {
                  x,
                  y,
                  transition: {duration: 1.5, delay: (i + 1) * 0.25},
                  opacity: 1
                }
              : {}
          );
        }
      };

      animateCirclesSequence();
      animateBlobsSequence();
    }
  }, [inView, circleControls, blobControls]);

  return (
    <div className={styles.gooey_container} ref={containerRef}>
      <ul className={styles.circles}>
        {['Br', 'Di', 'Pr', 'Il', 'Mo'].map((text, index) => (
          <motion.li
            key={index}
            className={styles.circle}
            custom={index}
            animate={circleControls}
            initial={{x: 0, y: 0}}
          >
            <motion.div
              className={clsx(
                bricolage_grotesque.className,
                styles.circle_content
              )}
              initial={{opacity: 0}}
              animate={{opacity: inView ? 1 : 0}}
              transition={{delay: (index + 1) * 1}}
            >
              <span
                className={clsx(dm_sans.className, styles.circle_index)}
              >{`0${index + 1}`}</span>
              <abbr>{text}</abbr>
              <span className={clsx(dm_sans.className, styles.circle_label)}>
                {labels[index]}
              </span>
            </motion.div>
          </motion.li>
        ))}
      </ul>
      <ul className={styles.blobs}>
        {[...Array(3)].map((_, index) => (
          <motion.li
            key={index}
            className={styles.blob}
            custom={index}
            animate={blobControls}
            initial={{
              x: blobPositions[index].xInit,
              y: blobPositions[index].yInit,
              opacity: 0
            }}
          ></motion.li>
        ))}
      </ul>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="blur">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default GooeyCircles;
