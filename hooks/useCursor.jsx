'use client';

import { useContext } from 'react';
import { CursorContext } from '@/context/cursorContext';

export const useCursor = () => {
  const { activeCursor, showCursor, hideCursor } = useContext(CursorContext);
  return { activeCursor, showCursor, hideCursor };
};
