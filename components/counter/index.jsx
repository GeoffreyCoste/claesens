'use client';

import styles from './style.module.scss';
import {useEffect, useRef} from 'react';
import {useInView, useMotionValue, useSpring} from 'framer-motion';

const Counter = ({value, direction = 'up'}) => {
  const counterRef = useRef(null);
  const motionValue = useMotionValue(direction === 'down' ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100
  });
  const isInView = useInView(counterRef, {
    once: true
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === 'down' ? 0 : value);
    }
  }, [motionValue, isInView, value, direction]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (counterRef.current) {
        counterRef.current.textContent = Intl.NumberFormat('fr-FR').format(
          latest.toFixed(0)
        );
      }
    });
  }, [springValue]);

  return (
    <span ref={counterRef} className={styles.counter}>
      {motionValue.get()}
    </span>
  );
};

export default Counter;
