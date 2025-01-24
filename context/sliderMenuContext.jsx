'use client';

import {useState, createContext} from 'react';

export const SliderMenuContext = createContext({
  isOpen: true,
  open: () => undefined,
  close: () => undefined
});

export const SliderMenuProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);

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
    <SliderMenuContext.Provider value={{isOpen, toggleIsOpen, open, close}}>
      {children}
    </SliderMenuContext.Provider>
  );
};
