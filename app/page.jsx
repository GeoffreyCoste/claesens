'use client';

import styles from './page.module.scss';
import {useState, useEffect, useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import {useLenis} from '@/hooks/useLenis';
import Header from '@/components/header';
import Preloader from '@/components/preloader';
import SectionHero from '@/components/section-hero';
import SectionWho from '@/components/section-who';
import SectionSkills from '@/components/section-skills';
import SectionProcess from '@/components/section-process';
import InfiniteText from '@/components/infinite-text';
import SectionRelease from '@/components/section-release';
import CursorSticky from '@/components/cursor-sticky';
import Gallery from '@/components/gallery';
import ImageParallax from '@/components/image-parallax';
import SideMenu from '@/components/side-menu';
import FooterCustom from '@/components/footer-custom';
import ParallaxGrid from '@/components/parallax-grid';
import GridParallax from '@/components/grid-parallax';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const {stop, start} = useLenis();
  const {isSideMenuOpen} = useSideMenu();

  const stickyElement = useRef(null);

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
      <Header ref={stickyElement}></Header>
      <main className={styles.main}>
        <SectionHero />
        <SectionWho />
        <InfiniteText />
        <GridParallax />
        {/* <ParallaxGrid /> */}
        {/* <Gallery /> */}
        <SectionSkills />
        <ImageParallax />
        <SectionProcess />
        <SectionRelease />
        <CursorSticky stickyElement={stickyElement} />
      </main>
      <FooterCustom />
    </>
  );
}
