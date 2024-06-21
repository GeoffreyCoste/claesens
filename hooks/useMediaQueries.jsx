import {useState, useEffect} from 'react';

// Définir les media queries pour les différents types d'appareils
const MEDIA_QUERIES = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px)'
};

const useMediaQueries = () => {
  const getMatches = () => {
    // Prevents SSR issues
    if (typeof window !== undefined) {
      return {
        mobile: window.matchMedia(MEDIA_QUERIES.mobile).matches,
        tablet: window.matchMedia(MEDIA_QUERIES.tablet).matches,
        desktop: window.matchMedia(MEDIA_QUERIES.desktop).matches
      };
    }
    return {mobile: false, tablet: false, desktop: false};
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
