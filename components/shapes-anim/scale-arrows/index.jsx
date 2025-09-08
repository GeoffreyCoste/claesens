'use client';

import styles from './style.module.scss';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScaleArrows = () => {
  const containerRef = useRef(null);
  const arrow1Ref = useRef(null);
  const arrow2Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const arrow1 = arrow1Ref.current;
    const arrow2 = arrow2Ref.current;
    if (!container || !arrow1 || !arrow2) return;

    const ctx = gsap.context(() => {
      let animations = [],
        targets = gsap.utils.toArray([arrow1, arrow2]),
        duration = 2,
        stagger = 4,
        curIndex = -1,
        paused = true;

      const next = () => {
        autoAdvance.restart(true);
        curIndex = (curIndex + 1) % targets.length; // Move index and go back to start at the end
        let tween = gsap.to(targets[curIndex], {
          keyframes: [
            {
              transform: 'translate(-50%, -50%) scale(0)',
              transformOrigin: '0 100%'
            },
            {
              transform: 'translate(-50%, -50%) scale(1)',
              transformOrigin: '0 100%'
            },
            {
              transform: 'translate(-50%, -50%) scale(1)',
              transformOrigin: '100% 0'
            },
            {
              transform: 'translate(-50%, -50%) scale(0)',
              transformOrigin: '100% 0'
            }
          ],
          duration: duration * 4,
          onComplete: () => {
            animations.splice(animations.indexOf(tween), 1); // Remove animation from array
          }
        });
        animations.push(tween);
      };

      // Initialize animation
      const init = () => {
        gsap.set(targets, {scale: 0, transformOrigin: '0% 100%'});
        next();
      };

      let autoAdvance = gsap.delayedCall(stagger, next).pause();

      init();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.scale_arrows_container}>
      <svg ref={arrow1Ref} className={styles.svg} viewBox="0 0 200 200">
        <g>
          <path d="M50 0H200V50V150L150 200L150 50H0L50 0ZM0 165.067V100L65.067 100L0 165.067ZM100 200H35.7777L100 135.778L100 200Z" />
        </g>
      </svg>
      <svg ref={arrow2Ref} className={styles.svg} viewBox="0 0 200 200">
        <g>
          <path d="M50 0H200V50V150L150 200L150 50H0L50 0ZM0 165.067V100L65.067 100L0 165.067ZM100 200H35.7777L100 135.778L100 200Z" />
        </g>
      </svg>
    </div>
  );
};

export default ScaleArrows;