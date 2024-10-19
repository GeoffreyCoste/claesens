'use client';

import {useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import Header from '@/components/header';
import CursorSticky from '@/components/cursor-sticky';
import FooterSticky from '@/components/footer-sticky';
import SideMenu from '@/components/side-menu';
import SectionServicesIntro from '@/components/section-services-intro';
import CurvedTextSvg from '@/components/curved-text-svg';
import Card3d from '@/components/card-3d';
import Scene from '@/components/3d/scene';
import ScrollOverlap from '@/components/scroll-overlap';
import SectionServicesDetails from '@/components/section-services-details';

export default function Services() {
  const stickyElement = useRef(null);

  const {isOpen} = useSideMenu();

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && <SideMenu isOpen={isOpen} />}
      </AnimatePresence>
      <Header ref={stickyElement}></Header>
      <main>
        <SectionServicesIntro />
        <CurvedTextSvg />
        <SectionServicesDetails />
        <CursorSticky stickyElement={stickyElement} />
      </main>
      <FooterSticky />
    </>
  );
}
