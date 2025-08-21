'use client';

import styles from './page.module.scss';
import {useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import useMediaQueries from '@/hooks/useMediaQueries';
import Header from '@/components/header';
import CursorCustom from '@/components/cursor-custom';
/* import FooterSticky from '@/components/footer-sticky'; */
import SideMenu from '@/components/side-menu';
import FooterCustom from '@/components/footer-custom';
import SectionContact from '@/components/section-contact';
import Footer from '@/components/footer';

export default function Contact() {
  const stickyBurgerElement = useRef(null);

  const {isSideMenuOpen} = useSideMenu();
  const {desktop} = useMediaQueries();

  const stickyRefs = [stickyBurgerElement];

  return (
    <>
      <AnimatePresence mode="wait">
        {isSideMenuOpen && <SideMenu isOpen={isSideMenuOpen} />}
      </AnimatePresence>
      <Header ref={stickyBurgerElement}></Header>
      <main className={styles.main}>
        <SectionContact />
        {desktop && <CursorCustom stickyElementRefs={stickyRefs} />}
      </main>
      {/* <FooterSticky /> */}
      {/* <FooterCustom bgBlack includeAside={false} /> */}
      <Footer />
    </>
  );
}
