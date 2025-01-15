'use client';

import styles from './page.module.scss';
import {useRef} from 'react';
import {AnimatePresence} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';
import Header from '@/components/header';
import CursorSticky from '@/components/cursor-sticky';
/* import FooterSticky from '@/components/footer-sticky'; */
import SideMenu from '@/components/side-menu';
import FooterCustom from '@/components/footer-custom';
import SectionContactNew from '@/components/section-contact-new';

export default function Contact() {
  const stickyElement = useRef(null);

  const {isOpen} = useSideMenu();

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && <SideMenu isOpen={isOpen} />}
      </AnimatePresence>
      <Header ref={stickyElement}></Header>
      <main className={styles.main}>
        <SectionContactNew />
        <CursorSticky stickyElement={stickyElement} />
      </main>
      {/* <FooterSticky /> */}
      <FooterCustom bgBlack includeAside={false} />
    </>
  );
}
