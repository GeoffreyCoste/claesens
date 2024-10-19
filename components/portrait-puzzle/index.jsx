'use client';

import styles from './style.module.scss';
import {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import useMediaQueries from '@/hooks/useMediaQueries';
import clsx from 'clsx';
import SlidingPuzzle from './puzzle-game';

const PortraitPuzzle = () => {
  const [isGameSolved, setIsGameSolved] = useState(false);
  const [gameWidth, setGameWidth] = useState(0);
  const containerRef = useRef(null);

  const {mobile, tablet, xxxl} = useMediaQueries();

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setGameWidth(width);
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

  return (
    <div className={styles.puzzle_container}>
      <div className={styles.puzzle_background}>
        <svg viewBox="0 0 100 100">
          <circle
            className={clsx(styles.stroke_circle, {
              [styles.animate]: isGameSolved
            })}
            cx="50"
            cy="50"
            r={mobile ? '47' : tablet ? '39' : xxxl ? '28' : '38'}
            // r={xxxl ? '28' : '38'}
            stroke={'#fce300'}
            strokeWidth="1"
            fill="none"
          />
        </svg>
        <div
          className={clsx(styles.puzzle_background_circle, {
            [styles.hidden]: isGameSolved
          })}
        ></div>
        <div
          className={clsx(styles.puzzle_background_image, {
            [styles.full_size]: isGameSolved
          })}
        >
          <Image
            src="/images/img_portrait.jpg"
            alt="Background"
            fill
            loading="lazy"
            style={{objectFit: 'cover'}}
          />
        </div>
        <div ref={containerRef} className={styles.puzzle_background_overlay}>
          <SlidingPuzzle sizeBasis={gameWidth} onWin={setIsGameSolved} />
        </div>
      </div>
    </div>
  );
};

export default PortraitPuzzle;
