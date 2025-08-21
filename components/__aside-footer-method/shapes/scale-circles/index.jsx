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

            // Définir la fonction 'next' avant de l'utiliser
            const next = () => {
                autoAdvance.restart(true);
                curIndex = (curIndex + 1) % targets.length; // Avancer l'index et revenir à 0 quand il atteint la fin
                let tween = gsap.to(targets[curIndex], {
                    keyframes: {
                        scale: [0, 0.8, 2, 8],
                    },
                    duration: duration * 3,
                    onComplete: () => {
                        animations.splice(animations.indexOf(tween), 1); // Enlever l'animation de l'array
                    },
                });
                animations.push(tween);
            };

            // Initialiser l'animation
            const init = () => {
                gsap.set(targets, { scale: 0, transformOrigin: 'center' });
                next();
            };

            let autoAdvance = gsap.delayedCall(stagger, next).pause();

            init();

            // autoAdvance.paused(paused);
            // animations.forEach(t => t.paused(paused));

            /* ScrollTrigger.create({
                trigger: svg, // L'élément à déclencher est le groupe de cercles
                start: 'top+=50px bottom', // Lorsque le haut de l'élément touche le bas du viewport
                end: 'top+=50px top', // Quand le bas de l'élément touche le haut du viewport
                // scrub: true, // L'animation suit le défilement
                // animation: tl, // L'animation à lier avec le ScrollTrigger
                // toggleActions: 'play reset play reset', // Démarre l'animation quand l'élément entre dans le viewport
                onEnter: () => autoAdvance.play(), // Joue l'animation lorsque l'élément entre dans le viewport
                onLeave: () => {
                    autoAdvance.pause(); // Met en pause l'animation
                    gsap.set(targets, { scale: 0 }); // Réinitialise les éléments à leur état initial (comme un 'reset')
                },
                onEnterBack: () => autoAdvance.play(), // Re-joue l'animation lorsque l'élément revient dans le viewport
                onLeaveBack: () => {
                    autoAdvance.pause(); // Met en pause l'animation
                    gsap.set(targets, { scale: 0 }); // Réinitialise les éléments à leur état initial
                },
                // markers: true, // Affiche les marqueurs pour déboguer
            }); */
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
