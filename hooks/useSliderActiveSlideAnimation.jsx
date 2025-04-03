'use client';

import {useCallback} from 'react';
import gsap from 'gsap';

/**
 * Hook d'animation pour le slider.
 *
 * @param {Object} params
 * @param {Object} params.slidesRef - Une ref contenant les éléments DOM des slides.
 * @param {number} params.activeIndex - L'index du slide actif.
 * @param {string} params.clipPath - La valeur de clipPath à appliquer pour l'animation.
 * @param {boolean} params.isAnimating - État indiquant si une animation est en cours.
 * @param {function} params.setIsAnimating - Setter pour modifier l'état d'animation.
 * @param {Object} params.styles - Les classes CSS à utiliser (exemple pour sélectionner des éléments enfants).
 * @returns {Object} Un objet contenant les fonctions showSlider et showPreview.
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
    // if (!slidesRef.current[activeIndex] || isAnimating) return;

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
      // Animation du slide actif
      .to(slidesRef.current[activeIndex], {clipPath: clipPath}, 'start')
      // Animation du background des slides
      .to(
        slidesRef.current.map((slide) =>
          slide.querySelector(`.${styles.slide_bg}`)
        ),
        {scale: 0.8},
        'start'
      )
      // Animation de l'overlay (titre, par exemple)
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
    /* isAnimating, */ setIsAnimating,
    slidesRef,
    styles
  ]);

  const showPreview = useCallback(() => {
    // if (!slidesRef.current[activeIndex] || isAnimating) return;

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
    /* isAnimating, */ setIsAnimating,
    slidesRef,
    styles
  ]);

  return {showSlider, showPreview};
};

export default useSliderActiveSlideAnimation;
