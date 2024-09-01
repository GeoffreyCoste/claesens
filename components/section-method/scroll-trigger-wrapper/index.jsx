'use client';

import styles from './style.module.scss';
import {useRef, useLayoutEffect} from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CircularMotion from './circular-motion';
/* import CanvasMethod from '@/components/canvas-method'; */
import CanvasMethod from './canvas-method';

const ScrollTriggerWrapper = () => {
  const containerRef = useRef(null);
  const pinnedElementRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  useLayoutEffect(() => {
    let container;
    let pinnedElement;

    if (containerRef.current) {
      container = containerRef.current;
    }

    if (pinnedElementRef.current) {
      pinnedElement = pinnedElementRef.current;
    }

    gsap.registerPlugin(ScrollTrigger);

    const totalScroll = 1100; // Total scroll distance (800vh)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${totalScroll + 100}vh`,
          scrub: true,
          pin: pinnedElement,
          pinSpacing: true,
          // markers: true
          onUpdate: (self) => {
            scrollTriggerRef.current = self;
          }
        }
      });
    });

    return () => {
      ctx.revert(); // Cleanup animations and ScrollTrigger effects when component unmounts
    };
  }, [containerRef, pinnedElementRef]);

  return (
    <div ref={containerRef} className={styles.container_triggered}>
      <div ref={pinnedElementRef} className={styles.pinned_element}>
        <CircularMotion ref={{containerRef, scrollTriggerRef}} />
        {/* <CanvasMethod ref={containerRef} /> */}
      </div>
    </div>
  );
};

export default ScrollTriggerWrapper;
