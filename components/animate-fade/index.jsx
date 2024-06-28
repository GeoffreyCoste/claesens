'use client';

import styles from './style.module.scss';
import {useRef} from 'react';
import {motion, useInView} from 'framer-motion';
import clsx from 'clsx';
import {bricolage_grotesque} from '@/app/font';
import {fadeInUpVariants} from './data';

const AnimateFade = ({children}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);

  return (
    <motion.div
      ref={containerRef}
      className={clsx(bricolage_grotesque.className, styles.fade_container)}
      variants={fadeInUpVariants}
    >
      {children}
    </motion.div>
  );
};

export default AnimateFade;
