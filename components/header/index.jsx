"use client";

import styles from "./style.module.scss";
import {useEffect, forwardRef} from 'react';
import {useSideMenu} from '@/hooks/useSideMenu';
import Brand from '../brand';
import Magnetism from '../magnetism';
import Lenis from '@studio-freight/lenis';

const Header = forwardRef(function Header(props, ref) {
  const {isOpen, toggleIsOpen} = useSideMenu();

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <Brand></Brand>
      <Magnetism>
        <div
          className={`${styles.burger} ${isOpen ? styles.open : ''}`}
          onClick={toggleIsOpen}
        >
          <div ref={ref} className={styles.bounds}></div>
        </div>
      </Magnetism>
    </header>
  );
});

export default Header;
