'use client';

import {useState, useRef, useCallback, useEffect} from 'react';

/**
 * Hook de navigation pour un slider.
 *
 * @param {Object} params
 * @param {boolean} params.isSliderMenuOpen - Indique si le slider est ouvert.
 * @param {boolean} params.isIntroNeeded - Indique si l'intro est encore active.
 * @param {number} [params.initialIndex=0] - Index initial du slider.
 * @returns {Object} Les gestionnaires d’événements et l’état courant.
 */
const useSliderNavigation = ({isSliderMenuOpen, isIntroNeeded, initialIndex = 0}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const isThrottled = useRef(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const hasSwiped = useRef(false);
  const hasScrolled = useRef(false);

  // Gestion du scroll (roulette de souris)
  const handleScroll = useCallback(
    (event) => {
      if (!isSliderMenuOpen || isIntroNeeded || isThrottled.current) return;

      hasScrolled.current = true;
      isThrottled.current = true;
      setTimeout(() => {
        isThrottled.current = false;
      }, 300); // Délai de throttling (300ms)

      if (event.deltaY > 0) {
        // Défilement vers le bas : passage à l'index suivant
        setCurrentIndex((prev) => prev + 1);
      } else if (event.deltaY < 0) {
        // Défilement vers le haut : passage à l'index précédent
        setCurrentIndex((prev) => prev - 1);
      }
    },
    [isSliderMenuOpen, isIntroNeeded]
  );

  // Gestion des événements tactiles
  const handleTouchStart = useCallback((event) => {
    touchStartX.current = event.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback(
    (event) => {
      if (!isSliderMenuOpen || isIntroNeeded) return;
      touchEndX.current = event.touches[0].clientX;
    },
    [isSliderMenuOpen, isIntroNeeded]
  );

  const handleTouchEnd = useCallback(() => {
    if (
      !isSliderMenuOpen ||
      isIntroNeeded ||
      touchStartX.current === null ||
      touchEndX.current === null
    )
      return;

    const deltaX = touchEndX.current - touchStartX.current;

    if (Math.abs(deltaX) > 50) {
      // Seuil pour détecter un swipe
      if (deltaX > 0) {
        // Swipe vers la droite : index précédent
        setCurrentIndex((prev) => prev - 1);
      } else {
        // Swipe vers la gauche : index suivant
        setCurrentIndex((prev) => prev + 1);
      }
      hasSwiped.current = true;
    }

    // Réinitialiser les références tactiles
    touchStartX.current = null;
    touchEndX.current = null;
  }, [isSliderMenuOpen, isIntroNeeded]);

  // Gestion des flèches du clavier
  const handleKeyDown = useCallback(
    (event) => {
      if (!isSliderMenuOpen || isIntroNeeded) return;

      if (event.key === 'ArrowRight') {
        setCurrentIndex((prev) => prev + 1);
      } else if (event.key === 'ArrowLeft') {
        setCurrentIndex((prev) => prev - 1);
      }
    },
    [isSliderMenuOpen, isIntroNeeded]
  );

  // Ajouter le listener clavier global quand le slider est ouvert
  useEffect(() => {
    if (!isSliderMenuOpen || isIntroNeeded) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, isSliderMenuOpen, isIntroNeeded]);

  return {
    currentIndex,
    setCurrentIndex,
    handleScroll,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown, // éventuellement pour attacher ailleurs
    hasSwiped: hasSwiped.current,
    hasScrolled: hasScrolled.current
  };
};

export default useSliderNavigation;
