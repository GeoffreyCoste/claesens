'use client';

import styles from './page.module.scss';
import {useState, useEffect, useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import useMediaQueries from '@/hooks/useMediaQueries';
import Header from '@/components/header';
import Preloader from '@/components/preloader';
import SectionHero from '@/components/section-hero';
import SectionWho from '@/components/section-who';
import SectionSkills from '@/components/section-skills';
import SectionProcess from '@/components/section-process';
import InfiniteText from '@/components/infinite-text';
import SectionRelease from '@/components/section-release';
import CursorSticky from '@/components/cursor-sticky';
import FooterSticky from '@/components/footer-sticky';
import Gallery from '@/components/gallery';
import ImageParallax from '@/components/image-parallax';
import DynamicCircle from '@/components/dynamic-circle';
import SideMenu from '@/components/side-menu';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const stickyElement = useRef(null);
  const releaseSectionRef = useRef(null);

  const {desktop} = useMediaQueries();

  const {isOpen} = useSideMenu();

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <AnimatePresence mode="wait">{isOpen && <SideMenu />}</AnimatePresence>
      <Header ref={stickyElement}></Header>
      <main>
        <SectionHero />
        <SectionWho />
        <InfiniteText />
        <Gallery />
        <SectionSkills />
        <ImageParallax />
        <SectionProcess />
        <SectionRelease ref={releaseSectionRef} />
        {!desktop && <DynamicCircle sectionRef={releaseSectionRef} />}
        <CursorSticky stickyElement={stickyElement} />
      </main>
      <FooterSticky />
    </>
  );
}
