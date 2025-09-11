'use client';

import {useContext} from 'react';
import { MediaContext } from '@/context/mediaContext';

export const useMedia = () => {
  const {isHydrated, matches} = useContext(MediaContext);
  return {isHydrated, matches};
};