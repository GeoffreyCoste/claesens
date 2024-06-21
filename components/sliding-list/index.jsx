import styles from './style.module.scss';
import {useState} from 'react';
import clsx from 'clsx';
import {bricolage_grotesque} from '@/app/font';
import {motion, AnimatePresence} from 'framer-motion';

const SlidingList = () => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleMouseIsHover = () => {
    const isHover = !isHovered;
    setIsHovered(isHover);
  };

  return (
    <ul className={styles.sliding_list}>
      <li
        className={styles.sliding_item}
        onMouseEnter={toggleMouseIsHover}
        onMouseOut={toggleMouseIsHover}
      >
        <AnimatePresence>
          <motion.div className={styles.sliding_item_background}></motion.div>
        </AnimatePresence>
        <div className={styles.sliding_item_content}>
          <div
            className={clsx(
              bricolage_grotesque.className,
              styles.sliding_item_title
            )}
          >
            Signal
          </div>
        </div>
      </li>
    </ul>
  );
};

export default SlidingList;
