'use client';

import {useState, createContext} from 'react';

export const SliderMenuContext = createContext({
  isSliderMenuOpen: true,
  openSliderMenu: () => undefined,
  closeSliderMenu: () => undefined,
  toggleIsSliderMenuOpen: () => undefined
});

export const SliderMenuProvider = ({children}) => {
  const [isSliderMenuOpen, setIsSliderMenuOpen] = useState(true);

  const openSliderMenu = () => {
    setIsSliderMenuOpen(true);
  };

  const closeSliderMenu = () => {
    setIsSliderMenuOpen(false);
  };

  const toggleIsSliderMenuOpen = () => {
    setIsSliderMenuOpen((prev) => !prev);
  };

  return (
    <SliderMenuContext.Provider
      value={{
        isSliderMenuOpen,
        toggleIsSliderMenuOpen,
        openSliderMenu,
        closeSliderMenu
      }}
    >
      {children}
    </SliderMenuContext.Provider>
  );
};
