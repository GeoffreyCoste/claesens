'use client';

import styles from './style.module.scss';
import {useMedia} from '@/hooks/useMedia';
import clsx from 'clsx';
import SocialsList from '../socials-list';

const Footer = ({zIndex = 'default', children}) => {
  const {isHydrated, matches} = useMedia();
  const {mobile} = matches;

  const mobileBreakpoint = isHydrated ? mobile : false;

  const clipPathStyle =
    children || mobileBreakpoint
      ? {clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)'}
      : {};

  return (
    <footer
      className={clsx(styles.footer, {
        [styles.z_index_9]: zIndex === 'z_index_9',
        [styles.h_300vh]: !!children,
        [styles.h_100vh]: !children && mobileBreakpoint,
        [styles.h_auto]: !children && !mobileBreakpoint
      })}
      style={clipPathStyle}
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