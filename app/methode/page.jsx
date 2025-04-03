'use client';

import styles from './page.module.scss';
import {useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import Header from '@/components/header';
import CursorSticky from '@/components/cursor-sticky';
/* import FooterSticky from '@/components/footer-sticky'; */
import SideMenu from '@/components/side-menu';
import SectionMethod from '@/components/section-method';
import FooterCustom from '@/components/footer-custom';
import AsideFooterMethod from '@/components/aside-footer-method';

export default function Method() {
  const stickyElement = useRef(null);

  const {isSideMenuOpen} = useSideMenu();

  return (
    <>
      <AnimatePresence mode="wait">
        {isSideMenuOpen && <SideMenu isOpen={isSideMenuOpen} />}
      </AnimatePresence>
      <Header ref={stickyElement}></Header>
      <main className={styles.main}>
        <SectionMethod />
        <CursorSticky stickyElement={stickyElement} />
      </main>
      {/* <FooterSticky /> */}
      <FooterCustom defaultAside={false} variants={['zIndex_9']} bgBlack>
        <AsideFooterMethod />
      </FooterCustom>
    </>
  );
}
