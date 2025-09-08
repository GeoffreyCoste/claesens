'use client';

import {useCallback} from 'react';
import gsap from 'gsap';

/**
 * Hook animating slider.
 *
 * @param {Object} params
 * @param {Object} params.slidesRef - Ref including slides  DOM elements.
 * @param {number} params.activeIndex - Active slide index.
 * @param {string} params.clipPath - ClipPath value to apply for animation.
 * @param {boolean} params.isAnimating - State indicating if an animation is in progress.
 * @param {function} params.setIsAnimating - Setter tyo modify animation state.
 * @param {Object} params.styles - CSS classes to use (for exemple, to select child elements).
 * @returns {Object} - Object containing functions showSlider and showPreview.
 */
const useSliderActiveSlideAnimation = ({
  slidesRef,
  activeIndex,
  clipPath,
  isAnimating,
  setIsAnimating,
  styles
}) => {
  const showSlider = useCallback(() => {
    setIsAnimating(true);

    gsap
      .timeline({
        defaults: {
          duration: 1.2,
          ease: 'power4.inOut'
        },
        onComplete: () => setIsAnimating(false)
      })
      .addLabel('start', 0)
      // Active slide animation
      .to(slidesRef.current[activeIndex], {clipPath: clipPath}, 'start')
      // Slides background animation
      .to(
        slidesRef.current.map((slide) =>
          slide.querySelector(`.${styles.slide_bg}`)
        ),
        {scale: 0.8},
        'start'
      )
      // Overlay animation (title, for exemple)
      .to(
        slidesRef.current.map((slide) =>
          slide.querySelector(`.${styles.slide_overlay}`)
        ),
        {duration: 1, scaleY: 0},
        'start'
      );
  }, [
    activeIndex,
    clipPath,
    setIsAnimating,
    slidesRef,
    styles
  ]);

  const showPreview = useCallback(() => {
    setIsAnimating(true);

    gsap
      .timeline({
        defaults: {
          duration: 1.2,
          ease: 'expo.inOut'
        },
        onComplete: () => setIsAnimating(false)
      })
      .addLabel('start', 0)
      .fromTo(
        slidesRef.current[activeIndex],
        {clipPath: clipPath},
        {clipPath: 'inset(0% 0% round 0vw)'}
      )
      .addLabel('clip', 'start+=0.15')
      .to(
        slidesRef.current[activeIndex].querySelector(`.${styles.slide_bg}`),
        {scale: 1},
        'clip'
      )
      .fromTo(
        slidesRef.current[activeIndex].querySelector(`.${styles.slide_bg}`),
        {filter: 'brightness(100%) saturate(100%)'},
        {
          duration: 0.4,
          ease: 'power1.in',
          filter: 'brightness(200%) saturate(200%)'
        },
        'clip+=0.1'
      )
      .to(
        slidesRef.current[activeIndex].querySelector(`.${styles.slide_bg}`),
        {
          duration: 0.8,
          ease: 'power1',
          filter: 'brightness(100%) saturate(100%)'
        },
        'clip+=0.4'
      )
      .to(
        slidesRef.current[activeIndex].querySelector(
          `.${styles.slide_overlay}`
        ),
        {duration: 1, scaleY: 1},
        'clip'
      );
  }, [
    activeIndex,
    clipPath,
    setIsAnimating,
    slidesRef,
    styles
  ]);

  return {showSlider, showPreview};
};

export default useSliderActiveSlideAnimation;
