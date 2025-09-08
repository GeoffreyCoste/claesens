'use client';

import styles from './style.module.scss';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScaleCircles = () => {
    const svgRef = useRef(null);
    const group1Ref = useRef(null);
    const group2Ref = useRef(null);

    const positions = [
        { cx: 25, cy: 25 },
        { cx: 75, cy: 25 },
        { cx: 25, cy: 75 },
        { cx: 75, cy: 75 }
    ];

    useEffect(() => {
        const svg = svgRef.current;
        const group1 = group1Ref.current;
        const group2 = group2Ref.current;
        if (!svg || !group1 || !group2) return;

        const ctx = gsap.context(() => {
          let animations = [],
            targets = gsap.utils.toArray([group1, group2]),
            duration = 2,
            stagger = 4,
            curIndex = -1,
            paused = true;

          // Define 'next' function before using it
          const next = () => {
            autoAdvance.restart(true);
            curIndex = (curIndex + 1) % targets.length; // Move index and go back to start at the end
            let tween = gsap.to(targets[curIndex], {
              keyframes: {
                scale: [0, 0.8, 2, 8]
              },
              duration: duration * 3,
              onComplete: () => {
                animations.splice(animations.indexOf(tween), 1); // Remove animation from array
              }
            });
            animations.push(tween);
          };

          // Initialize animation
          const init = () => {
            gsap.set(targets, {scale: 0, transformOrigin: 'center'});
            next();
          };

          let autoAdvance = gsap.delayedCall(stagger, next).pause();

          init();
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className={styles.scale_circles_container}>
            <svg ref={svgRef} className={styles.svg} viewBox="0 0 100 100">
                <g ref={group1Ref} className={styles.group}>
                    {positions.map((pos, index) => (
                        <circle
                            key={`group1-circle-${index}`}
                            className={styles.circle}
                            cx={pos.cx}
                            cy={pos.cy}
                            r="25"
                        />
                    ))}
                </g>
                <g ref={group2Ref} className={styles.group}>
                    {positions.map((pos, index) => (
                        <circle
                            key={`group2-circle-${index}`}
                            className={styles.circle}
                            cx={pos.cx}
                            cy={pos.cy}
                            r="25"
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default ScaleCircles;
