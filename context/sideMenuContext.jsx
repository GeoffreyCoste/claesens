'use client';

import {useState, createContext} from 'react';

export const SideMenuContext = createContext({
  isOpen: false,
  open: () => undefined,
  close: () => undefined
});

export const SideMenuProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SideMenuContext.Provider value={{isOpen, toggleIsOpen, open, close}}>
      {children}
    </SideMenuContext.Provider>
  );
};
