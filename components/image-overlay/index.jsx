'use client';

import styles from './style.module.scss';
import {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import SlidingPuzzle from '../sliding-puzzle';

const ImageOverlay = () => {
  const [noOpacity, setNoOpacity] = useState(false);
  const [backgroundWidth, setBackgroundWidth] = useState(0);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (backgroundRef.current) {
        setBackgroundWidth(backgroundRef.current.offsetWidth);
      }
    };

    // Update width on mount
    updateWidth();

    // Update width on window resize
    window.addEventListener('resize', updateWidth);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  useEffect(() => {
    console.log('No opacity: ', noOpacity);
  }, [noOpacity]);

  return (
    <div className={styles.container}>
      <div ref={backgroundRef} className={styles.background_image}>
        <Image
          src="/images/img_portrait.jpg"
          alt="Background"
          fill
          loading="lazy"
          style={{objectFit: 'cover', opacity: noOpacity ? 1 : 0.3}}
        />
      </div>
      <div className={styles.overlay_image}>
        <SlidingPuzzle sizeBasis={backgroundWidth} onWin={setNoOpacity} />
      </div>
    </div>
  );
};

export default ImageOverlay;
