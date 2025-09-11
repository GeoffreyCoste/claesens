'use client';

import styles from './page.module.scss';
import {useState, useEffect, useRef} from 'react';
import dynamic from 'next/dynamic';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import {useLenis} from '@/hooks/useLenis';
import Header from '@/components/header';
import Preloader from '@/components/preloader';
import SectionHero from '@/components/section-hero';
import SectionWho from '@/components/section-who';
import SectionSkills from '@/components/section-skills';
import ImageParallax from '@/components/image-parallax';
import SectionProcess from '@/components/section-process';
import SectionRelease from '@/components/section-release';
import InfiniteText from '@/components/infinite-text';
import CursorCustom from '@/components/cursor-custom';
import SideMenu from '@/components/side-menu';
import Footer from '@/components/footer';
import AsideFooter from '@/components/aside-footer';
import AsideFooterBody from '@/components/aside-footer/aside-footer-body';
import {h2FooterAsideHome} from '@/components/animate-heading/data';
import CanvasShaderLens from '@/components/canvas-shader-lens';

const DynamicGridParallax = dynamic(
  () => import('@/components/grid-parallax'),
  {
    ssr: false
  }
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const {stop, start} = useLenis();
  const {isSideMenuOpen} = useSideMenu();

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
        <DynamicGridParallax />
        <SectionSkills />
        <ImageParallax />
        <SectionProcess />
        <SectionRelease />
        <CursorCustom stickyElementRefs={stickyRefs} />
      </main>
      <Footer>
        <AsideFooter
          variant="home"
          anim={<CanvasShaderLens />}
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
