'use client';

import {useState, createContext} from 'react';

export const SideMenuContext = createContext({
  isSideMenuOpen: false,
  openSideMenu: () => undefined,
  closeSideMenu: () => undefined
});

export const SideMenuProvider = ({children}) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const openSideMenu = () => {
    setIsSideMenuOpen(true);
  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  const toggleIsSideMenuOpen = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <SideMenuContext.Provider
      value={{
        isSideMenuOpen,
        toggleIsSideMenuOpen,
        openSideMenu,
        closeSideMenu
      }}
    >
      {children}
    </SideMenuContext.Provider>
  );
};
