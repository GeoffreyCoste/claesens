'use client';

import styles from '../style.module.scss';
import {useState, useEffect} from 'react';
import {motion} from 'framer-motion';

const Curve = ({isOpen}) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const svgPathClosed = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q-100 ${windowHeight / 2} 100 0`;
  const svgPathOpen = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q100 ${windowHeight / 2} 100 0`;

  const curveVariants = {
    closed: {
      d: svgPathClosed
    },
    opened: {
      d: svgPathOpen,
      transition: {duration: 0.5, ease: [0.76, 0, 0.24, 1]}
    },
    exit: {
      d: svgPathClosed,
      transition: {duration: 0.5, ease: [0.76, 0, 0.24, 1]}
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.svg className={styles.curve}>
      <motion.path
        d={isOpen ? svgPathOpen : svgPathClosed}
        initial="closed"
        animate="opened"
        exit="exit"
        variants={curveVariants}
      />
    </motion.svg>
  );
};

export default Curve;
