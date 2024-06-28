'use client';

import styles from './style.module.scss';
import {useRef} from 'react';
import Image from 'next/image';
import {useScroll, useTransform, motion} from 'framer-motion';
import Background from '../../public/images/img_desk.jpg';

const ImageParallax = () => {
  const containerRef = useRef(null);

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div
      ref={containerRef}
      className={styles.parallax_container}
      style={{clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)'}}
    >
      <div className={styles.parallax_item}>
        <motion.div style={{y}} className={styles.parallax_image}>
          <Image
            src={Background}
            fill
            alt="Smartphone à gauche d'un carnet de notes surmonté d'un porte-mines posés sur un bureau blanc avec une petite plante verte"
            style={{objectFit: 'cover'}}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ImageParallax;
