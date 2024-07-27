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
import SectionInterlude from '@/components/section-interlude';
import SectionRelease from '@/components/section-release';
import Footer from '@/components/footer';
import CursorSticky from '@/components/cursor-sticky';
import FooterSticky from '@/components/footer-sticky';
import Gallery from '@/components/gallery';
import ImageParallax from '@/components/image-parallax';
import DynamicCircle from '@/components/dynamic-circle';
import SideMenu from '@/components/side-menu';
import PageLayout from '@/components/page-layout';
import PageSection from '@/components/page-section';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const stickyElement = useRef(null);
  const releaseSectionRef = useRef(null);

  const {desktop} = useMediaQueries();

  const {isOpen} = useSideMenu();

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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2000);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <PageLayout>
        <PageSection></PageSection>
        <PageSection></PageSection>
      </PageLayout>
      {/* <AnimatePresence mode="wait">
        {isOpen && <SideMenu isOpen={isOpen} />}
      </AnimatePresence>
      <Header ref={stickyElement}></Header>
      <main>
        <SectionHero />
        <SectionWho />
        <InfiniteText />
        <Gallery />
        <SectionSkills />
        <ImageParallax />
        <SectionProcess />
        {/* <SectionInterlude /> *}
        <SectionRelease ref={releaseSectionRef} />
        {!desktop && <DynamicCircle sectionRef={releaseSectionRef} />}
        <CursorSticky stickyElement={stickyElement} />
      </main>
      <FooterSticky /> */}
    </>
  );
}
