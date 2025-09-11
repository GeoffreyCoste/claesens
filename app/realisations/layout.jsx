'use client';

import styles from './page.module.scss';
import {useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import useSliderMenu from '@/hooks/useSliderMenu';
import Header from '@/components/header';
import SideMenu from '@/components/side-menu';
import {SliderMenuProvider} from '@/context/sliderMenuContext';
import SliderMenu from '@/components/slider-menu';
import {CursorProvider} from '@/context/cursorContext';
import CursorCustom from '@/components/cursor-custom';
import CursorMask from '@/components/cursor-mask';
import AsideFooterRealizationMaskContent from '@/components/aside-footer-realization-mask-content';
import Footer from '@/components/footer';
import AsideFooter from '@/components/aside-footer';
import AsideFooterBody from '@/components/aside-footer/aside-footer-body';
import {h2FooterAsideRealization} from '@/components/animate-heading/data';
import SvgEllipsesAnim from '@/components/svg-ellipses-anim';

export default function RealizationsLayout({children}) {
  return (
    <SliderMenuProvider>
      <CursorProvider>
        <LayoutContent>{children}</LayoutContent>
      </CursorProvider>
    </SliderMenuProvider>
  );
}

function LayoutContent({children}) {
  const {isSideMenuOpen} = useSideMenu();
  const {isSliderMenuOpen} = useSliderMenu();

  const stickyBurgerElement = useRef(null);
  const maskElement = useRef(null);
  const stickyRefs = [stickyBurgerElement];
  const maskRefs = [
    {
      ref: maskElement,
      content: AsideFooterRealizationMaskContent,
      shouldOverlap: true
    }
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {isSideMenuOpen && <SideMenu isOpen={isSideMenuOpen} />}
      </AnimatePresence>
      <Header ref={stickyBurgerElement}></Header>
      <main className={styles.main}>
        <SliderMenu />
        {children}
        <CursorMask maskElementRefs={maskRefs} />
        <CursorCustom stickyElementRefs={stickyRefs} />
      </main>
      {!isSliderMenuOpen && (
        <Footer zIndex="z_index_9">
          <AsideFooter
            variant="realization"
            anim={<SvgEllipsesAnim />}
            body={
              <AsideFooterBody
                headings={h2FooterAsideRealization}
                paragraph="Une seule connexion suffit !"
                withRef
                ref={maskElement}
              />
            }
          ></AsideFooter>
        </Footer>
      )}
    </>
  );
}