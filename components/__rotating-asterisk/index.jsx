'use client';

import {useRef, useEffect} from 'react';
import gsap from 'gsap';

const RotatingAsterisk = () => {
  const asteriskRef = useRef(null);

  useEffect(() => {
    const asterisk = asteriskRef.current;

    if (!asterisk) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1, // Repeat indefinitely
        repeatDelay: 1 // Delay between each repetition (1s)
      });

      // Resets rotation to 0 before starting
      tl.set(asterisk, {rotation: 0});

      // Initial rotation with deceleration
      tl.to(asterisk, {
        rotation: 360,
        duration: 1.5, // Duration of rotation animation
        ease: 'power4.out' // Starts fast and slows down
      });

      // Pause before next animation
      tl.to(
        asterisk,
        {
          rotation: 720, // Perform a second 360 degree rotation (cumulative with the first)
          duration: 1.5, // Duration of the rotation animation
          ease: 'power4.out', // Same easing
          delay: 0.2 // Small break between the two rotations
        },
        '+=0.2' // Ensure delay after the first rotation
      );

      // Magnification with rebound
      tl.to(asterisk, {
        scale: 1.5, // Enlarge up to 1.5 times its original size
        duration: 0.8, // Magnification duration
        ease: 'bounce.out' // Rebound effect
      });

      // Shrink to original size
      tl.to(asterisk, {
        scale: 1, // Return to initial size
        duration: 0.6, // Shrking duration
        ease: 'power2.inOut' // Soft easing
      });
    });

    return () => {
      ctx.revert(); // Cleanup when component unmounts
    };
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 124 124"
      className={styles.svg_asterisk}
      ref={asteriskRef}
    >
      <path
        fill="#fce300"
        d="m43.184 54.206-35.557.137a7.656 7.656 0 0 0 0 15.313l35.557.138-25.045 25.24a7.657 7.657 0 0 0 10.828 10.827l25.24-25.045.136 35.557a7.657 7.657 0 0 0 15.313 0l.138-35.557 25.24 25.045a7.656 7.656 0 0 0 10.827-10.828l-25.045-25.24 35.557-.137a7.657 7.657 0 0 0 0-15.313l-35.557-.137 25.045-25.24a7.657 7.657 0 0 0-10.828-10.828l-25.24 25.046-.137-35.557a7.657 7.657 0 0 0-15.313 0l-.137 35.557-25.24-25.045a7.657 7.657 0 0 0-10.828 10.828l25.046 25.24Z"
      ></path>
    </svg>
  );
};

export default RotatingAsterisk;
