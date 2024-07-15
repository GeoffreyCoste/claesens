'use client';

import {useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import Header from '@/components/header';
import CursorSticky from '@/components/cursor-sticky';
import FooterSticky from '@/components/footer-sticky';
import SideMenu from '@/components/side-menu';
import SectionAboutIntro from '@/components/section-about-intro';
import CountersAside from '@/components/counters-aside';

export default function About() {
  const stickyElement = useRef(null);

  const {isOpen} = useSideMenu();

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && <SideMenu isOpen={isOpen} />}
      </AnimatePresence>
      <Header ref={stickyElement}></Header>
      <main>
        <SectionAboutIntro />
        <CountersAside />
        <CursorSticky stickyElement={stickyElement} />
      </main>
      <FooterSticky />
    </>
  );
}
