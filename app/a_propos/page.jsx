'use client';

import styles from './page.module.scss';
import {useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import Header from '@/components/header';
import CursorSticky from '@/components/cursor-sticky';
/* import FooterSticky from '@/components/footer-sticky'; */
import SideMenu from '@/components/side-menu';
import SectionAboutHero from '@/components/section-about-hero';
import SectionAboutIntro from '@/components/section-about-intro';
import SectionAboutOrigin from '@/components/section-about-origin';
import SectionAboutPanorama from '@/components/section-about-panorama';
import SectionAboutOverview from '@/components/section-about-overview';
import AsideLogos from '@/components/aside-logos';
import FooterCustom from '@/components/footer-custom';

export default function About() {
  const stickyElement = useRef(null);

  const {isSideMenuOpen} = useSideMenu();

  return (
    <>
      <AnimatePresence mode="wait">
        {isSideMenuOpen && <SideMenu isOpen={isSideMenuOpen} />}
      </AnimatePresence>
      <Header ref={stickyElement}></Header>
      <main className={styles.main}>
        <SectionAboutHero />
        <SectionAboutIntro />
        <SectionAboutOrigin />
        <SectionAboutPanorama />
        <AsideLogos />
        <SectionAboutOverview />
        <CursorSticky stickyElement={stickyElement} />
      </main>
      {/* <FooterSticky /> */}
      <FooterCustom />
    </>
  );
}
