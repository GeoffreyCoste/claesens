'use client';

import styles from './page.module.scss';
import {useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import useMediaQueries from '@/hooks/useMediaQueries';
import Header from '@/components/header';
import CursorCustom from '@/components/cursor-custom';
import SideMenu from '@/components/side-menu';
import SectionAboutHero from '@/components/section-about-hero';
import SectionAboutIntro from '@/components/section-about-intro';
import SectionAboutOrigin from '@/components/section-about-origin';
import SectionAboutPanorama from '@/components/section-about-panorama';
import SectionAboutOverview from '@/components/section-about-overview';
import AsideLogos from '@/components/aside-logos';
import Footer from '@/components/footer';
import AsideFooter from '@/components/aside-footer';
import CanvasShaderLens from '@/components/canvas-shader-lens';
import AsideFooterBody from '@/components/aside-footer/aside-footer-body';
import {h2FooterAsideHome} from '@/components/animate-heading/data';

export default function About() {
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
        <SectionAboutHero />
        <SectionAboutIntro />
        <SectionAboutOrigin />
        <SectionAboutPanorama />
        <AsideLogos />
        <SectionAboutOverview />
        {desktop && <CursorCustom stickyElementRefs={stickyRefs} />}
      </main>
      <Footer>
        <AsideFooter
          variant="home"
          anim={desktop ? <CanvasShaderLens /> : ''}
          body={
            <AsideFooterBody
              headings={h2FooterAsideHome}
              paragraph="Ensemble, faisons rayonner vos idées !"
            />
          }
          draggable
        ></AsideFooter>
      </Footer>
    </>
  );
}