'use client';

import { useContext } from 'react';
import { LenisContext } from '@/context/lenisContext';

export const useLenis = () => {
  return useContext(LenisContext);
};