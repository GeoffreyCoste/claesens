'use client';

import styles from './style.module.scss';
import { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';

const GoeyCircles = () => {
    const svgRef = useRef(null);

    // Circles positions memorization
    const circlesData = useMemo(() => [
        { cx: 100, cy: 100, r: 25 },
        { cx: 100, cy: 32.5, r: 10 },
        { cx: 147.7, cy: 52.3, r: 10 },
        { cx: 167.5, cy: 100, r: 10 },
        { cx: 147.7, cy: 147.7, r: 10 },
        { cx: 100, cy: 167.5, r: 10 },
        { cx: 52.3, cy: 147.7, r: 10 },
        { cx: 32.5, cy: 100, r: 10 },
        { cx: 52.3, cy: 52.3, r: 10 }
    ], []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const circles = gsap.utils.toArray(svgRef.current.querySelectorAll('circle'));
            const centerCircle = circles[0];
            const otherCircles = circles.slice(1);
            const centerX = 100;
            const centerY = 100;
            
            // Save initial positions
            const initialPositions = circlesData.slice(1).map(circle => ({ x: circle.cx, y: circle.cy }));

            const tl = gsap.timeline({ repeat: -1 });

            // Initial position: all centered
            tl.set(otherCircles, { cx: centerX, cy: centerY });

            // Animate to final position
            tl.to(otherCircles, {
                cx: i => initialPositions[i].x,
                cy: i => initialPositions[i].y,
                stagger: { amount: 1, from: "start" }, // Animation progressive
                duration: 1,
                ease: "power2.out",
                delay: 0.5,
                onStart: () => gsap.to(centerCircle, { r: 15, duration: 4, ease: "elastic.out" })
            });

            // Return to center after delay
            tl.to(otherCircles, {
                cx: centerX,
                cy: centerY,
                stagger: { amount: 1, from: "start" }, // Gradual return
                duration: 1,
                ease: "back.out",
                delay: 3,
                onStart: () => gsap.to(centerCircle, { r: 25, duration: 1.75, ease: "power2.inOut", delay: 0.5 })
            });

        }, svgRef);

        return () => ctx.revert();
    }, [circlesData]);

    return (
        <div className={styles.goey_circles_container}>
            <svg ref={svgRef} className={styles.svg} viewBox="0 0 200 200">
                {/* <defs>
                    <filter id="goey" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blurred" />
                        <feComponentTransfer in="blurred">
                            <feFuncA type="table" tableValues="0 1" />
                        </feComponentTransfer>
                        <feGaussianBlur in="blurred" stdDeviation="3" result="glow" />
                        <feBlend in="SourceGraphic" in2="glow" mode="screen" />
                    </filter>
                </defs> */}
                {/* <defs>
                  <filter id="goey">
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="10"
                      result="blur"
                    />
                    <feColorMatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                      result="goo"
                    />
                    <feBlend in="SourceGraphic" in2="goo" />
                  </filter>
                </defs> */}
                <defs>
                  <filter id="goey">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" result="goo" />
                    <feBlend in="SourceGraphic" in2="goo" />
                	</filter>
                </defs>
                {circlesData.map((circle, index) => (
                    <circle key={index} cx={circle.cx} cy={circle.cy} r={circle.r} fill="#fce300" filter="url(#goey)" />
                ))}
            </svg>
        </div>
    );
}

export default GoeyCircles;