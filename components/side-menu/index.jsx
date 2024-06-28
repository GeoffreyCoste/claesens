'use client';

import styles from './style.module.scss';
import {motion} from 'framer-motion';
import Curve from './curve';
import Navbar from '../navbar';
import SocialsList from '../socials-list';

const SideMenu = ({isOpen}) => {
  return (
    <motion.div
      className={styles.side_menu}
      initial={{x: '100%'}}
      animate={{x: isOpen ? '0%' : '100%'}}
      transition={{type: 'spring', stiffness: 300, damping: 30}}
    >
      <Curve isOpen={isOpen} />
      <div className={styles.side_menu_content}>
        <div className={styles.side_menu_item}>
          <span className={styles.side_menu_label}>menu</span>
          <Navbar />
        </div>
        <div className={styles.side_menu_item}>
          <span className={styles.side_menu_label}>suivez-moi</span>
          <SocialsList />
        </div>
      </div>
    </motion.div>
  );
};

export default SideMenu;
