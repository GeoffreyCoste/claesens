'use client';

import {useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import Header from '@/components/header';
import CursorSticky from '@/components/cursor-sticky';
import FooterSticky from '@/components/footer-sticky';
import SideMenu from '@/components/side-menu';
import SectionAboutIntro from '@/components/section-about-intro';
import SectionMethodIntro from '@/components/section-method-intro';
import SectionMethod from '@/components/section-method';

export default function Method() {
  const stickyElement = useRef(null);

  const {isOpen} = useSideMenu();

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && <SideMenu isOpen={isOpen} />}
      </AnimatePresence>
      <Header ref={stickyElement}></Header>
      <main>
        <SectionMethod />
        {/* <SectionMethodIntro /> */}
        <CursorSticky stickyElement={stickyElement} />
      </main>
      <FooterSticky />
    </>
  );
}
