"use client";

import styles from "./style.module.scss";
import {useEffect, forwardRef} from 'react';
import {useSideMenu} from '@/hooks/useSideMenu';
import Brand from '../brand';
import Magnetism from '../magnetism';
/* import {getLenisInstance} from '@/utils/lenisInstance'; */
import {useLenis} from '@/hooks/useLenis';

const Header = forwardRef(function Header(props, ref) {
  const {isSideMenuOpen, toggleIsSideMenuOpen} = useSideMenu();
  const {start, stop} = useLenis();

  useEffect(() => {
    // if (!lenis) return;
    // const lenis = new Lenis();
    /* const lenis = getLenisInstance();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }; */

    if (isSideMenuOpen) {
      stop();
    } else {
      start();
    }

    /* requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    }; */
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
