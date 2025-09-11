'use client';

import {useState, useEffect, createContext} from 'react';

const IS_SERVER = typeof window === 'undefined';

const MEDIA_QUERIES = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  xs: '(min-width: 320px) and (max-width: 359px)',
  sm: '(min-width: 360px) and (max-width: 767px)',
  md: '(min-width: 768px) and (max-width: 992px)',
  lg: '(min-width: 992px) and (max-width: 1023px)',
  xl: '(min-width: 1024px) and (max-width: 1199px)',
  xxl: '(min-width: 1200px) and (max-width: 1399px)',
  xxxl: '(min-width: 1400px) and (max-width: 1599px)',
  ultra: '(min-width: 1600px)'
};

const defaultMatches = {
    isServer: true,
    mobile: false,
    tablet: false,
    desktop: false,
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
    xxxl: false,
    ultra: false,
}

export const MediaContext = createContext({
    isHydrated: false,
    matches: defaultMatches,
});

export const MediaProvider = ({children}) => {
  const [matches, setMatches] = useState(defaultMatches);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (IS_SERVER || !window.matchMedia) return;

    const getMatches = (query) => window.matchMedia(query).matches;

    const updateMatches = () => {
      const newMatches = Object.fromEntries(
        Object.entries(MEDIA_QUERIES).map(([key, query]) => [
          key,
          getMatches(query),
        ])
      );
      setMatches(newMatches);
      setIsHydrated(true);
    };

    // Initial update
    updateMatches();

    // Add listeners for media query lists
    const mqls = Object.values(MEDIA_QUERIES).map((q) => window.matchMedia(q));

    mqls.forEach((mql) => {
      const handler = () => updateMatches();
      // Safari < 14 compatibility
      if (mql.addListener) mql.addListener(handler);
      else mql.addEventListener('change', handler);
    });

    return () => {
      mqls.forEach((mql) => {
        const handler = () => updateMatches();
        if (mql.removeListener) mql.removeListener(handler);
        else mql.removeEventListener('change', handler);
      });
    };
  }, []);

  return (
    <MediaContext.Provider value={{isHydrated, matches}}>
      {children}
    </MediaContext.Provider>
  );
};