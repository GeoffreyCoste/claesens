'use client';

import styles from '../style.module.scss';
import {bricolage_grotesque} from '@/app/fonts';
import { useRef, useLayoutEffect } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextScrollRepetition = ({text, color}) => {
    const containerRef = useRef(null);
    const repetitionsRef = useRef([]);

    const repeats = 9;
    const spacing = 25;
    const middleIndex = Math.floor(repeats / 2);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const repetitions = repetitionsRef.current;

        if (!container || repetitions.length === 0) return;

        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                defaults: {
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: repetitions[middleIndex],
                        start: 'top 65%',
                        end: 'top 35%',
                        scrub: true,
                    },
                }
            });

            repetitions.forEach((rep, i) => {
                let zIndex = i <= middleIndex ? i + 1 : repeats - i;
                let offset = i < middleIndex 
                    ? (middleIndex - i) * spacing 
                    : i === middleIndex 
                        ? 0 
                        : (i - middleIndex) * - spacing;

                tl.set(rep, {
                    y: 0,
                    zIndex: zIndex,
                });

                tl.to(rep, {
                    y: offset,
                    stagger: 0.1,
                });
            });
        }, repetitions[middleIndex]);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={clsx(bricolage_grotesque.className, styles.text_repetition)}>
            {[...Array(repeats)].map((_, i) => (
                    <div 
                        key={`text-layer-${i}`} 
                        className={styles.repetition}
                        style={{color: color}}
                        ref={(el) => repetitionsRef.current[i] = el}
                    >
                        {text}
                    </div>
                )
            )}
        </div>
    )
}

export default TextScrollRepetition;
