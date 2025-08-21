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

    /* useEffect(() => {
        const container = containerRef.current;
        const arrow1 = arrow1Ref.current;
        const arrow2 = arrow2Ref.current;
        if (!container || !arrow1 || !arrow2) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { duration: 2, ease: 'none'},
                paused: true,
                repeat: -1,
            });

            // tl.to(arrow1, { transform: 'translate(-50%, -50%) scale(0)',  transformOrigin: '100% 0%'});

            tl.set([arrow1, arrow2], {
                transform: 'translate(-50%, -50%) scale(0)'
            });

            tl.addLabel('arrow1_start');

            tl.fromTo(
                arrow1, 
                { transform: 'translate(-50%, -50%) scale(0)', transformOrigin: '0 100%' }, 
                { transform: 'translate(-50%, -50%) scale(1)', transformOrigin: '0 100%'}
            );
            tl.fromTo(
                arrow1, 
                { transform: 'translate(-50%, -50%) scale(1)', transformOrigin: '100% 0' }, 
                { transform: 'translate(-50%, -50%) scale(0)', transformOrigin: '100% 0'}
            );

            tl.fromTo(
                arrow2, 
                { transform: 'translate(-50%, -50%) scale(0)', transformOrigin: '0 100%' }, 
                { transform: 'translate(-50%, -50%) scale(1)', transformOrigin: '0 100%'},
                'arrow1_start+=1.95'
            );
            tl.fromTo(
                arrow2, 
                { transform: 'translate(-50%, -50%) scale(1)', transformOrigin: '100% 0' }, 
                { transform: 'translate(-50%, -50%) scale(0)', transformOrigin: '100% 0'}
            );

            ScrollTrigger.create({
                trigger: container,
                start: "top 70%",
                end: 'bottom 70%',
                onEnter: () => {
                    tl.play();
                },
            })
        });

        return () => ctx.revert();
    }, []); */

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

            // Définir la fonction 'next' avant de l'utiliser
            const next = () => {
                autoAdvance.restart(true);
                curIndex = (curIndex + 1) % targets.length; // Avancer l'index et revenir à 0 quand il atteint la fin
                let tween = gsap.to(targets[curIndex], {
                    keyframes: [
                        { transform: 'translate(-50%, -50%) scale(0)', transformOrigin: '0 100%' },
                        { transform: 'translate(-50%, -50%) scale(1)', transformOrigin: '0 100%' },
                        { transform: 'translate(-50%, -50%) scale(1)', transformOrigin: '100% 0' },
                        { transform: 'translate(-50%, -50%) scale(0)', transformOrigin: '100% 0' }
                    ],
                    duration: duration * 4,
                    onComplete: () => {
                        animations.splice(animations.indexOf(tween), 1); // Enlever l'animation de l'array
                    },
                });
                animations.push(tween);
            };

            // Initialiser l'animation
            const init = () => {
                gsap.set(targets, { scale: 0, transformOrigin: '0% 100%' });
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
                markers: true, // Affiche les marqueurs pour déboguer
            }); */
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


/* useEffect(() => {
        const svg = svgRef.current;
        const arrow1 = arrow1Ref.current;
        const arrow2 = arrow2Ref.current;
        if (!svg || !arrow1 || !arrow2) return;

        const ctx = gsap.context(() => {
            let animations = [],
                targets = gsap.utils.toArray([arrow1, arrow2]),
                duration = 2,
                stagger = 4,
                curIndex = -1,
                paused = true;

            // Définir la fonction 'next' avant de l'utiliser
            const next = () => {
                autoAdvance.restart(true);
                curIndex = (curIndex + 1) % targets.length; // Avancer l'index et revenir à 0 quand il atteint la fin
                let tween = gsap.to(targets[curIndex], {
                    /* keyframes: {
                        scale: [0, 0.5, 1],
                    }, *
                    keyframes: [
                        { scale: 0, transformOrigin: '0% 100%' }, // Phase 1: scale de 0 à 1, origine en bas à gauche
                        { scale: 1, transformOrigin: '0% 100%' }, // Phase 2: scale de 0 à 1, origine en bas à gauche
                        { scale: 0, transformOrigin: '100% 0%' }  // Phase 3: scale de 1 à 0, origine en haut à droite
                    ],
                    duration: duration * 3,
                    onComplete: () => {
                        animations.splice(animations.indexOf(tween), 1); // Enlever l'animation de l'array
                    },
                });
                animations.push(tween);
            };

            // Initialiser l'animation
            const init = () => {
                gsap.set(targets, { scale: 0, transformOrigin: '0% 100%' });
                next();
            };

            let autoAdvance = gsap.delayedCall(stagger, next).pause();

            init();

            // autoAdvance.paused(paused);
            // animations.forEach(t => t.paused(paused));

            ScrollTrigger.create({
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
                markers: true, // Affiche les marqueurs pour déboguer
            });
        });

        return () => ctx.revert();
    }, []); */