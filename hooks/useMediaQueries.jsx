import {useState, useEffect} from 'react';

// Définir les media queries pour les différents types d'appareils
const MEDIA_QUERIES = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  xs: '(min-width: 320px) and (max-width: 575px)',
  sm: '(min-width: 576px) and (max-width: 767px)',
  md: '(min-width: 768px) and (max-width: 992px)',
  lg: '(min-width: 992px) and (max-width: 1023px)',
  xl: '(min-width: 1024px) and (max-width: 1200px)',
  xxl: '(min-width: 1201px) and (max-width: 1400px)',
  xxxl: '(min-width: 1401px)'
};

const useMediaQueries = () => {
  const getMatches = () => {
    // Prevents SSR issues
    if (typeof window !== undefined) {
      return {
        mobile: window.matchMedia(MEDIA_QUERIES.mobile).matches,
        tablet: window.matchMedia(MEDIA_QUERIES.tablet).matches,
        desktop: window.matchMedia(MEDIA_QUERIES.desktop).matches,
        xs: window.matchMedia(MEDIA_QUERIES.xs).matches,
        sm: window.matchMedia(MEDIA_QUERIES.sm).matches,
        md: window.matchMedia(MEDIA_QUERIES.md).matches,
        lg: window.matchMedia(MEDIA_QUERIES.lg).matches,
        xl: window.matchMedia(MEDIA_QUERIES.xl).matches,
        xxl: window.matchMedia(MEDIA_QUERIES.xxl).matches,
        xxxl: window.matchMedia(MEDIA_QUERIES.xxxl).matches
      };
    }
    return {
      mobile: false,
      tablet: false,
      desktop: false,
      xs: false,
      sm: false,
      md: false,
      lg: false,
      xl: false,
      xxl: false,
      xxxl: false
    };
  };

  const [matches, setMatches] = useState(getMatches());

  useEffect(() => {
    const mediaQueryLists = Object.values(MEDIA_QUERIES).map((query) =>
      window.matchMedia(query)
    );
    const listener = () => setMatches(getMatches());

    // Ajouter les listeners
    mediaQueryLists.forEach((mql) => mql.addEventListener('change', listener));

    // Nettoyer les listeners au démontage du composant
    return () => {
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener('change', listener)
      );
    };
  }, []);

  return matches;
};

export default useMediaQueries;
