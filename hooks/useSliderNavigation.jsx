'use client';

import {useState, useRef, useCallback, useEffect} from 'react';

/**
 * Slider navigation Hook.
 *
 * @param {Object} params
 * @param {boolean} params.isSliderMenuOpen - Indicate if slider is opened.
 * @param {boolean} params.isIntroNeeded - Indicate if intro is still active.
 * @param {number} [params.initialIndex=0] - Slider initial index.
 * @returns {Object} - Event handlers and current state.
 */
const useSliderNavigation = ({isSliderMenuOpen, isIntroNeeded, initialIndex = 0}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const isThrottled = useRef(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const hasSwiped = useRef(false);
  const hasScrolled = useRef(false);

  // Scroll management (mouse wheel)
  const handleScroll = useCallback(
    (event) => {
      if (!isSliderMenuOpen || isIntroNeeded || isThrottled.current) return;

      hasScrolled.current = true;
      isThrottled.current = true;
      setTimeout(() => {
        isThrottled.current = false;
      }, 300); // Throttling delay (300ms)

      if (event.deltaY > 0) {
        // Scroll down: move to next index
        setCurrentIndex((prev) => prev + 1);
      } else if (event.deltaY < 0) {
        // Scroll up: pmove to previous index
        setCurrentIndex((prev) => prev - 1);
      }
    },
    [isSliderMenuOpen, isIntroNeeded]
  );

  // Touch event management
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
      // Threshold to detect swipe
      if (deltaX > 0) {
        // Swipe to right: previous index
        setCurrentIndex((prev) => prev - 1);
      } else {
        // Swipe to left: next index
        setCurrentIndex((prev) => prev + 1);
      }
      hasSwiped.current = true;
    }

    // Reinitialize touch references
    touchStartX.current = null;
    touchEndX.current = null;
  }, [isSliderMenuOpen, isIntroNeeded]);

  // Keyboard arrows management
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

  // Add global keyboard listener when slider is opened
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
    handleKeyDown,
    hasSwiped: hasSwiped.current,
    hasScrolled: hasScrolled.current
  };
};

export default useSliderNavigation;
