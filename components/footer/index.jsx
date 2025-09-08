'use client';

import styles from './style.module.scss';
import useMediaQueries from '@/hooks/useMediaQueries';
import clsx from 'clsx';
import SocialsList from '../socials-list';

const Footer = ({zIndex = 'default', children}) => {
  const {mobile} = useMediaQueries();

  return (
    <footer
      className={clsx(styles.footer, {
        [styles.z_index_9]: zIndex === 'z_index_9',
        [styles.h_300vh]: !!children,
        [styles.h_100vh]: !children && mobile,
        [styles.h_auto]: !children && !mobile
      })}
      style={
        children
          ? {clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)'}
          : mobile
            ? {clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)'}
            : {}
      }
    >
      {children}

      <div className={styles.footer_content}>
        <div className={`${styles.footer_item} ${styles.item_socials}`}>
          <SocialsList />
        </div>
        <div className={`${styles.footer_item} ${styles.item_copyright}`}>
          <span className={styles.footer_item_text}>
            &copy; {new Date().getFullYear().toString()} claesens
          </span>
          <span className={styles.footer_item_text}>
            Créé avec {'🤍'} par Emilie Claesens
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;