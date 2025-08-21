'use client';

import {useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import useMediaQueries from '@/hooks/useMediaQueries';
import Header from '@/components/header';
import CursorCustom from '@/components/cursor-custom';
import SideMenu from '@/components/side-menu';
import SectionServicesDetails from '@/components/section-services-details';
import SectionServicesHero from '@/components/section-services-hero';
import Footer from '@/components/footer';
import AsideFooter from '@/components/aside-footer';
import GoeyCircles from '@/components/goey-circles';
import AsideFooterBody from '@/components/aside-footer/aside-footer-body';
import {h2FooterAsideServices} from '@/components/animate-heading/data';

export default function Services() {
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
      <main>
        <SectionServicesHero />
        <SectionServicesDetails />
        {desktop && <CursorCustom stickyElementRefs={stickyRefs} />}
      </main>
      <Footer zIndex="z_index_9">
        <AsideFooter
          variant="services"
          anim={<GoeyCircles />}
          body={
            <AsideFooterBody
              headings={h2FooterAsideServices}
              paragraph="Un message et c'est parti !"
            />
          }
        ></AsideFooter>
      </Footer>
    </>
  );
}
