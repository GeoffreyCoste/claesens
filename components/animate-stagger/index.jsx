'use client';

import styles from './style.module.scss';
import {useRef} from 'react';
import {motion, useInView} from 'framer-motion';
import clsx from 'clsx';

const AnimateStagger = ({children, isTextCentered = false}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {once: true});

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.025
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={clsx(
        isTextCentered && styles.stagger_text_center,
        styles.stagger_container
      )}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
};

export default AnimateStagger;
