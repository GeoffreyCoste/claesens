'use client';

import {
  useEffect,
  useRef,
  useState,
  createContext,
  useCallback
} from 'react';
import Lenis from '@studio-freight/lenis';

export const LenisContext = createContext({
  lenis: null,
  stop: () => {},
  start: () => {},
});

export const LenisProvider = ({ children }) => {
  const [lenis, setLenis] = useState(null);
  const scrollLockCountRef = useRef(0); // compteur des blocages de scroll
  const frameRef = useRef();

  // Initialise Lenis
  useEffect(() => {
    const instance = new Lenis({
      smooth: true
      // ...other options
    });

    setLenis(instance);

    const raf = (time) => {
      instance.raf(time);
      frameRef.current = requestAnimationFrame(raf);
    };
    frameRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameRef.current);
      instance.destroy();
    };
  }, []);

  // stop: increment count and stop lenis if first call
  const stop = useCallback(() => {
    if (!lenis) return;

    scrollLockCountRef.current += 1;

    if (scrollLockCountRef.current === 1) {
      lenis.stop();
    }
  }, [lenis]);

  // start: decrement count and start Lenis if no lock
  const start = useCallback(() => {
    if (!lenis) return;

    scrollLockCountRef.current = Math.max(0, scrollLockCountRef.current - 1);

    if (scrollLockCountRef.current === 0) {
      lenis.start();
    }
  }, [lenis]);

  return (
    <LenisContext.Provider value={{lenis, stop, start}}>
      {children}
    </LenisContext.Provider>
  );
};
