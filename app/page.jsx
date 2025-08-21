'use client';

import styles from './page.module.scss';
import {useState, useEffect, useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import {useLenis} from '@/hooks/useLenis';
import useMediaQueries from '@/hooks/useMediaQueries';
import Header from '@/components/header';
import Preloader from '@/components/preloader';
import SectionHero from '@/components/section-hero';
import SectionWho from '@/components/section-who';
import SectionSkills from '@/components/section-skills';
import SectionProcess from '@/components/section-process';
import InfiniteText from '@/components/infinite-text';
import SectionRelease from '@/components/section-release';
import CursorCustom from '@/components/cursor-custom';
import ImageParallax from '@/components/image-parallax';
import SideMenu from '@/components/side-menu';
import GridParallax from '@/components/grid-parallax';
import Footer from '@/components/footer';
import AsideFooter from '@/components/aside-footer';
import CanvasShaderLens from '@/components/canvas-shader-lens';
import AsideFooterBody from '@/components/aside-footer/aside-footer-body';
import {h2FooterAsideHome} from '@/components/animate-heading/data';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const {stop, start} = useLenis();
  const {isSideMenuOpen} = useSideMenu();
  const {desktop} = useMediaQueries();

  const stickyBurgerElement = useRef(null);
  const stickyRefs = [stickyBurgerElement];

  useEffect(() => {
    stop();

    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      start();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [stop, start]);

  /* useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []); */

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isSideMenuOpen && <SideMenu />}
      </AnimatePresence>
      <Header ref={stickyBurgerElement}></Header>
      <main className={styles.main}>
        <SectionHero />
        <SectionWho />
        <InfiniteText />
        <GridParallax />
        <SectionSkills />
        <ImageParallax />
        <SectionProcess />
        <SectionRelease />
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
