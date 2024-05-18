'use client';

import styles from './page.module.scss';
import {useState, useEffect, useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import Header from '@/components/header';
import StickyCursor from '@/components/stickyCursor';
import Preloader from '@/components/preloader';
import HeroSection from '@/components/hero-section';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const stickyElement = useRef(null);

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
      <Header ref={stickyElement}></Header>
      <main /* className={styles.main} */>
        <HeroSection />
        <StickyCursor stickyElement={stickyElement}></StickyCursor>
      </main>
    </>
  );
}
