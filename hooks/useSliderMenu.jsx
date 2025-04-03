'use client';

import {useContext} from 'react';
import {SliderMenuContext} from '@/context/sliderMenuContext';

const useSliderMenu = () => {
  const {
    isSliderMenuOpen,
    toggleIsSliderMenuOpen,
    openSliderMenu,
    closeSliderMenu
  } = useContext(SliderMenuContext);
  return {
    isSliderMenuOpen,
    toggleIsSliderMenuOpen,
    openSliderMenu,
    closeSliderMenu
  };
};

export default useSliderMenu;
