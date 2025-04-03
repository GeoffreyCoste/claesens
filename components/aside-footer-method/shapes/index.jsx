'use client';

import styles from './style.module.scss';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScaleCircles from './scale-circles';
import MorphingCircles from './morphing-circles';
import MotionCircles from './motion-circles';
import ScaleArrows from './scale-arrows';

gsap.registerPlugin(ScrollTrigger);

const components = [ScaleCircles, MorphingCircles, MotionCircles, ScaleArrows];

const Shapes = () => {
    const shapesRef = useRef(null);

    useEffect(() => {
        const shapes = shapesRef.current;

        if (!shapes) return;

        let mm = gsap.matchMedia();

        mm.add("(max-width: 767px)", () => {
            const ctx = gsap.context(() => {
    
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: shapes,
                        start: 'top 70%',
                        end: 'bottom 70%',
                        scrub: true,
                        onEnter: () => {
                            tl.to(shapes, {
                                opacity: 1,
                                duration: 1,
                                ease: 'power2.inOut',
                            });
                        },
                        // markers: true
                    },
                })
            });

            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    return (
        <div ref={shapesRef} className={styles.shapes}>
            {components.map((Component, index) => (
                <div key={`shape-${index}`} className={styles.shape}>
                    <Component />
                </div>
            ))}
        </div>
    )
};

export default Shapes;