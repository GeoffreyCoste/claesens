'use client';

import {useContext} from 'react';
import {SideMenuContext} from '@/context/sideMenuContext';

export const useSideMenu = () => {
  const {isSideMenuOpen, toggleIsSideMenuOpen, openSideMenu, closeSideMenu} =
    useContext(SideMenuContext);
  return {isSideMenuOpen, toggleIsSideMenuOpen, openSideMenu, closeSideMenu};
};
