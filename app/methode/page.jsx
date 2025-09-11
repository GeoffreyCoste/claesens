'use client';

import styles from './page.module.scss';
import {useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import Header from '@/components/header';
import CursorCustom from '@/components/cursor-custom';
import SideMenu from '@/components/side-menu';
import SectionMethod from '@/components/section-method';
import SectionMethodProcess from '@/components/section-method-process';
import SectionMethodInterlude from '@/components/section-method-interlude';
import Footer from '@/components/footer';
import AsideFooter from '@/components/aside-footer';
import ShapesAnim from '@/components/shapes-anim';
import {h2FooterAsideMethod} from '@/components/animate-heading/data';
import AsideFooterBody from '@/components/aside-footer/aside-footer-body';

export default function Method() {
  const stickyBurgerElement = useRef(null);

  const {isSideMenuOpen} = useSideMenu();

  const stickyRefs = [stickyBurgerElement];

  const headings = h2FooterAsideMethod.map((item) => ({
    ...item,
    split: true,
    separator: '(re)'
  }));

  return (
    <>
      <AnimatePresence mode="wait">
        {isSideMenuOpen && <SideMenu isOpen={isSideMenuOpen} />}
      </AnimatePresence>
      <Header ref={stickyBurgerElement}></Header>
      <main className={styles.main}>
        <SectionMethod />
        <SectionMethodInterlude />
        <SectionMethodProcess />
        <CursorCustom stickyElementRefs={stickyRefs} />
      </main>
      <Footer zIndex="z_index_9">
        <AsideFooter
          variant="method"
          anim={<ShapesAnim />}
          body={
            <AsideFooterBody headings={headings} paragraph="Discutons-en !" />
          }
        ></AsideFooter>
      </Footer>
    </>
  );
}

