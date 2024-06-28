'use client';

import {useContext} from 'react';
import {SideMenuContext} from '@/context/sideMenuContext';

export const useSideMenu = () => {
  const {isOpen, toggleIsOpen, open, close} = useContext(SideMenuContext);
  return {isOpen, toggleIsOpen, open, close};
};
