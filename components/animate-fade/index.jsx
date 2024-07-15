'use client';

import styles from './style.module.scss';
import {useRef} from 'react';
import {motion, useInView} from 'framer-motion';
import {fadeInUpVariants} from './data';

const AnimateFade = ({children}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);

  return (
    <motion.div
      ref={containerRef}
      className={styles.fade_container}
      variants={fadeInUpVariants}
    >
      {children}
    </motion.div>
  );
};

export default AnimateFade;
