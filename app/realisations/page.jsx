'use client';

import styles from './page.module.scss';
import {useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import Header from '@/components/header';
import CursorSticky from '@/components/cursor-sticky';
import SideMenu from '@/components/side-menu';
import FooterCustom from '@/components/footer-custom';
/* import SliderMenu from '@/components/slider-menu'; */
import {SliderMenuProvider} from '@/context/sliderMenuContext';
import SliderMenu from '@/components/slider-menu';

export default function Realizations() {
  const stickyElement = useRef(null);

  const {isOpen} = useSideMenu();

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && <SideMenu isOpen={isOpen} />}
      </AnimatePresence>
      <Header ref={stickyElement}></Header>
      <main className={styles.main}>
        <SliderMenuProvider>
          <SliderMenu />
        </SliderMenuProvider>
        <CursorSticky stickyElement={stickyElement} />
      </main>
      <FooterCustom />
    </>
  );
}
