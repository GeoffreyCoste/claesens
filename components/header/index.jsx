"use client";

import styles from "./style.module.scss";
import {useEffect, forwardRef} from 'react';
import {useSideMenu} from '@/hooks/useSideMenu';
import Brand from '../brand';
import Magnetism from '../magnetism';
import {useLenis} from '@/hooks/useLenis';

const Header = forwardRef(function Header(props, ref) {
  const {isSideMenuOpen, toggleIsSideMenuOpen} = useSideMenu();
  const {start, stop} = useLenis();

  useEffect(() => {
    if (isSideMenuOpen) {
      stop();
    } else {
      start();
    }
  }, [start, stop, isSideMenuOpen]);

  return (
    <header className={styles.header}>
      <Brand />
      <Magnetism>
        <div
          className={`${styles.burger} ${isSideMenuOpen ? styles.open : ''}`}
          onClick={toggleIsSideMenuOpen}
        >
          <div ref={ref} className={styles.bounds}></div>
        </div>
      </Magnetism>
    </header>
  );
});

export default Header;
