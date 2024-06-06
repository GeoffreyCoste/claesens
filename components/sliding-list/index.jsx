import styles from './style.module.scss';
import {useState} from 'react';
import clsx from 'clsx';
import {Bricolage_Grotesque} from 'next/font/google';
import {motion, AnimatePresence} from 'framer-motion';

const bricolage_grotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin']
});

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
              bricolage_grotesque.variable,
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
