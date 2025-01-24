'use client';

import {useContext} from 'react';
import {SliderMenuContext} from '@/context/sliderMenuContext';

export const useSliderMenu = () => {
  const {isOpen, toggleIsOpen, open, close} = useContext(SliderMenuContext);
  return {isOpen, toggleIsOpen, open, close};
};
