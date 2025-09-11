'use client';

import styles from './style.module.scss';
import {useState, useEffect, useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import {useLenis} from '@/hooks/useLenis';
import Header from '@/components/header';
import Preloader from '@/components/preloader';
import CursorCustom from '@/components/cursor-custom';
import SideMenu from '@/components/side-menu';
import Footer from '@/components/footer';
import AsideFooter from '@/components/aside-footer';

export default function PageLayout({children, data, showPreloader = false, asideFooterVariant = null, asideFooterAnim = null, asideFooterBody = null, asideFooterDraggable = false}) {
  const [isLoading, setIsLoading] = useState(showPreloader);
  const {stop, start} = useLenis();
  const {isSideMenuOpen} = useSideMenu();

  const stickyBurgerElement = useRef(null);
  const stickyRefs = [stickyBurgerElement];

  useEffect(() => {
    if (!showPreloader) return;

    stop();

    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      start();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [showPreloader, stop, start]);

  useEffect(() => {
    console.log('Page data: ', data);
  }, [data]);

  return (
    <>
      {showPreloader && (
        <AnimatePresence mode="wait">
            {isLoading && <Preloader />}
        </AnimatePresence>
      )}
      <AnimatePresence mode="wait">
        {isSideMenuOpen && <SideMenu />}
      </AnimatePresence>
      <Header ref={stickyBurgerElement}></Header>
      <main className={styles.main}>
        {children}
        <CursorCustom stickyElementRefs={stickyRefs} />
      </main>
      <Footer>
        <AsideFooter
          variant={asideFooterVariant}
          anim={asideFooterAnim}
          body={asideFooterBody}
          draggable={asideFooterDraggable}
        ></AsideFooter>
      </Footer>
    </>
  );
}