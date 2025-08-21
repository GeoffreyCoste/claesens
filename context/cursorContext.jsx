'use client';

import { createContext, useState } from 'react';

export const CursorContext = createContext({
  activeCursor: 'new',      // 'mask' | 'new' | null
  showCursor: (name) => {},
  hideCursor: () => {}
});

export const CursorProvider = ({ children }) => {
  const [activeCursor, setActiveCursor] = useState('new');

  const showCursor = (name) => {
    setActiveCursor(name);
  };

  const hideCursor = () => {
    setActiveCursor(null);
  };

  return (
    <CursorContext.Provider value={{ activeCursor, showCursor, hideCursor }}>
      {children}
    </CursorContext.Provider>
  );
};