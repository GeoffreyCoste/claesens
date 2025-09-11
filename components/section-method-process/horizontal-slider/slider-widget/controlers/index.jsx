'use client';

import styles from './style.module.scss';
import {useState} from 'react';
import {useMedia} from '@/hooks/useMedia';
import clsx from 'clsx';

const Controlers = ({activeIndex, handleControlerClick}) => {
  const [isHovered, setIsHovered] = useState(false);

  const {isHydrated, matches} = useMedia();
  const {tablet} = matches;

  const minIndex = 1;
  const maxIndex = 4;

  const showButtons = !isHydrated ? false : tablet || isHovered;

  return (
    <div
      className={styles.controlers}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        disabled={activeIndex + 1 <= minIndex}
        className={clsx(styles.control_prev, {
          [styles.visible]: showButtons
        })}
        onClick={() => handleControlerClick('prev')}
      >
        -
      </button>
      <button
        type="button"
        disabled={activeIndex + 1 >= maxIndex}
        className={clsx(styles.control_next, {
          [styles.visible]: showButtons
        })}
        onClick={() => handleControlerClick('next')}
      >
        +
      </button>
    </div>
  );
};

export default Controlers;