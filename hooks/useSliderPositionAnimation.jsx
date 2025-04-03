import { useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';

const useSliderPositionAnimation = ({
  slidesRef,
  slidesData,
  slideWidth,
  isIntroNeeded,
  mobile,
  desktop,
  activeIndex,
  styles,
  setIsIntroNeeded, // Optionnel, pour mettre fin à l'intro
  togglerRef,
  activeLabelRef,
  headingRef
}) => {
    useLayoutEffect(() => {
        if (
          !isIntroNeeded ||
          !headingRef.current ||
          !togglerRef.current ||
          !activeLabelRef.current ||
          slidesRef.current.length === 0 ||
          slidesData.length === 0
        )
          return;
    
        const centerIndex = Math.floor(slidesData.length / 2);
    
        if (mobile) {
          const tl = gsap.timeline({
            defaults: {duration: 1, ease: 'power2.out'},
            onComplete: () => setIsIntroNeeded(false)
          });
    
          tl.set(slidesRef.current, {
            opacity: 0,
            x: (i) => {
              const distFromCenter = Math.abs(i - centerIndex);
              const adjustedOffset =
                distFromCenter === 1 ? (i < centerIndex ? -30 : 30) : 0;
              return (i - centerIndex) * slideWidth + adjustedOffset;
            },
            scale: (i) => 1 - Math.abs(i - centerIndex) * 0.2
          });
    
          tl.fromTo(
            slidesRef.current[centerIndex],
            {
              opacity: 0,
              scale: 0.5
            },
            {
              opacity: 1,
              scale: 1
            }
          );
    
          tl.fromTo(
            headingRef.current,
            {
              autoAlpha: 0,
              y: -500,
              scale: 10
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1
            },
            '<'
          );
    
          tl.fromTo(
            togglerRef.current,
            {
              autoAlpha: 0,
              y: 300
            },
            {
              autoAlpha: 1,
              y: 0
            }
          );
    
          tl.fromTo(
            activeLabelRef.current,
            {
              autoAlpha: 0,
              y: -300,
              scale: 2
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1
            },
            '<'
          );
    
          tl.set(slidesRef.current, {
            opacity: 1
          });
        }
    
        if (!mobile) {
          const tl = gsap.timeline({
            defaults: {duration: 1, ease: 'power2.out'},
            onComplete: () => setIsIntroNeeded(false)
          });
    
          tl.set(slidesRef.current, {
            opacity: 0,
            x: 0 // Empilées au centre
          });
    
          tl.fromTo(
            slidesRef.current[centerIndex],
            {
              opacity: 0,
              scale: 0.5
            },
            {
              opacity: 1,
              scale: 1
            }
          );
    
          tl.fromTo(
            headingRef.current,
            {
              autoAlpha: 0,
              y: -500,
              scale: 10
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1
            },
            '<'
          );
    
          tl.to(slidesRef.current, {
            x: (i) => {
              const distFromCenter = Math.abs(i - centerIndex);
              const adjustedOffset =
                distFromCenter === 1 ? (i < centerIndex ? -30 : 30) : 0;
              return (i - centerIndex) * slideWidth + adjustedOffset;
            },
            scale: (i) => 1 - Math.abs(i - centerIndex) * 0.2,
            opacity: 1
          });
    
          tl.fromTo(
            togglerRef.current,
            {
              autoAlpha: 0,
              y: 300
            },
            {
              autoAlpha: 1,
              y: 0
            }
          );
    
          tl.fromTo(
            activeLabelRef.current,
            {
              autoAlpha: 0,
              y: -300,
              scale: 2
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1
            },
            '<'
          );
        }
      }, [isIntroNeeded, setIsIntroNeeded, slidesData, slidesRef, togglerRef, slideWidth, mobile, desktop]);
    
      useEffect(() => {
        if (!isIntroNeeded && slidesRef.current.length && slidesData.length) {
          const centerIndex = Math.floor(slidesData.length / 2);
    
          slidesRef.current.forEach((el, index) => {
            if (!el) return; // Skip if ref is null
    
            const distFromCenter = Math.abs(index - centerIndex);
            const adjustedOffset =
              distFromCenter === 1 ? (index < centerIndex ? -30 : 30) : 0;
            const offset = (index - centerIndex) * slideWidth + adjustedOffset;
            const scale = 1 - distFromCenter * 0.2;
            const opacity = distFromCenter <= 2 ? 1 : 0;
    
            // Apply GSAP animation
            gsap.to(el, {
              x: offset,
              scale: scale,
              opacity: opacity,
              duration: 0.5,
              ease: 'power3.out'
            });
          });
        }
      }, [isIntroNeeded, slidesData, slidesRef, slideWidth]);
}

export default useSliderPositionAnimation;