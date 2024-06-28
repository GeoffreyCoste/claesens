'use client';

import styles from '../style.module.scss';
import {motion} from 'framer-motion';
import Image from 'next/image';

const Column = ({images, y}) => {
  return (
    <motion.div className={styles.column} style={{y}}>
      {images.map((image, index) => {
        const {src, alt} = image;
        return (
          <div key={index} className={styles.card}>
            <Image
              src={`/images/${src}`}
              alt={alt}
              width={561}
              height={747}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '1vw'
              }}
              /* fill
              style={{
                objectFit: 'contain',
                borderRadius: '10px'
              }} */
            />
          </div>
        );
      })}
    </motion.div>
  );
};

export default Column;
