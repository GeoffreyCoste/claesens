'use client';

import styles from './page.module.scss';
import {useRef, useEffect} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import useSliderMenu from '@/hooks/useSliderMenu';
import Header from '@/components/header';
import CursorSticky from '@/components/cursor-sticky';
import SideMenu from '@/components/side-menu';
import FooterCustom from '@/components/footer-custom';
import {SliderMenuProvider} from '@/context/sliderMenuContext';
import SliderMenu from '@/components/slider-menu';
import AsideFooterRealization from '@/components/aside-footer-realization';
import { FooterContentProvider } from '@/context/footerContentContext';

export default function RealizationsLayout({children}) {

  const stickyElement = useRef(null);
  const { isSideMenuOpen } = useSideMenu();

  return (
    <SliderMenuProvider>
      {/** Transmettre children à LayoutContent **/}
      <LayoutContent stickyElement={stickyElement} isSideMenuOpen={isSideMenuOpen}>
        {children}
      </LayoutContent>
    </SliderMenuProvider>
  );
}

function LayoutContent({stickyElement, isSideMenuOpen, children}) {
  const {isSliderMenuOpen} = useSliderMenu();

  return (
    <>
      <AnimatePresence mode="wait">
        {isSideMenuOpen && <SideMenu isOpen={isSideMenuOpen} />}
      </AnimatePresence>
      <Header ref={stickyElement}></Header>
      <main className={styles.main}>
        <SliderMenu />
        {children}
        <CursorSticky stickyElement={stickyElement} />
      </main>
      {!isSliderMenuOpen && (
          <FooterContentProvider>
            <FooterCustom defaultAside={false} variants={['zIndex_9']} bgBlack>
              <AsideFooterRealization />
            </FooterCustom>
          </FooterContentProvider>
        )
      }
    </>
  )
};




/* export default function RealizationsLayout({children}) {
  const stickyElement = useRef(null);

  const {isSideMenuOpen} = useSideMenu();

  const {isSliderMenuOpen} = useSliderMenu();

  useEffect(() => {
    console.log('isOpen (inside layout): ', isSliderMenuOpen);
  }, [isSliderMenuOpen]);

  return (
    <SliderMenuProvider>
      <AnimatePresence mode="wait">
        {isSideMenuOpen && <SideMenu isOpen={isSideMenuOpen} />}
      </AnimatePresence>
      <Header ref={stickyElement}></Header>
      <main className={styles.main}>
        <SliderMenu />
        {children}
        <CursorSticky stickyElement={stickyElement} />
      </main>
      {!isSliderMenuOpen && (
          <FooterCustom defaultAside={false} className={styles.zIndex_9}>
            <div style={{color: 'white'}}>CONTENU ADDITIONNEL</div>
          </FooterCustom>
        )
      }
    </SliderMenuProvider>
  );
} */
