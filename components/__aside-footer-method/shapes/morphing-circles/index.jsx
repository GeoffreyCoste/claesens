'use client';

import styles from './style.module.scss';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MorphingCircles = () => {

    const svgRef = useRef(null);
    const circle1Ref = useRef(null);
    const circle2Ref = useRef(null);
    const circle3Ref = useRef(null);
    const circle4Ref = useRef(null);

    useEffect(() => {
        const svg = svgRef.current;
        const c1 = circle1Ref.current;
        const c2 = circle2Ref.current;
        const c3 = circle3Ref.current;
        const c4 = circle4Ref.current;

        if (!svg || !c1 || !c2 || !c3 || !c4) return;

        const mm = gsap.matchMedia();

        mm.add(
          {
            isDesktop: '(min-width: 1024px)',
            isMobile: '(max-width: 1023px)'
          },
          (context) => {
            let {isDesktop, isMobile} = context.conditions;

            const ctx = gsap.context(() => {
              const tl = gsap.timeline({
                defaults: {duration: 5, ease: 'none'},
                // paused: true, // On ne démarre pas tout de suite
                repeat: -1, // Répétition infinie
                repeatDelay: 2 // Délai avant répétition
              });

              tl.to(c1, {y: -50, duration: 1, ease: 'power1.inOut', delay: 1})
                .to(c2, {y: -50, duration: 1, ease: 'power1.inOut'}, '<')
                .to(c3, {y: 50, duration: 1, ease: 'power1.inOut'})
                .to(c4, {y: 50, duration: 1, ease: 'power1.inOut'}, '<')
                .to(svg, {
                  rotate: 90,
                  transformOrigin: 'center',
                  duration: 1,
                  ease: 'power1.inOut'
                })
                .to(c2, {x: 50, y: 0, duration: 1, ease: 'power1.inOut'})
                .to(c3, {x: -50, y: 0, duration: 1, ease: 'power1.inOut'}, '<')
                .to(svg, {
                  rotate: 270,
                  transformOrigin: 'center',
                  duration: 1,
                  ease: 'power1.inOut'
                })
                .to(c1, {y: 0, duration: 1, ease: 'power1.inOut'})
                .to(c2, {x: 0, duration: 1, ease: 'power1.inOut'}, '<')
                .to(c3, {x: 0, duration: 1, ease: 'power1.inOut'}, '<')
                .to(c4, {y: 0, duration: 1, ease: 'power1.inOut'}, '<');

              if (isDesktop) {
                // Footer fixed → animation starts immediately
                tl.play();
              }

              if (isMobile) {
                ScrollTrigger.create({
                  trigger: svg, // L'élément à déclencher est le groupe de cercles
                  start: 'top+=50px bottom', // Lorsque le haut de l'élément touche le bas du viewport
                  end: 'top+=50px top', // Quand le bas de l'élément touche le haut du viewport
                  // scrub: true, // L'animation suit le défilement
                  animation: tl, // L'animation à lier avec le ScrollTrigger
                  toggleActions: 'play reset play reset' // Démarre l'animation quand l'élément entre dans le viewport
                  // markers: true // Affiche les marqueurs pour déboguer
                });
              }
            });

            return () => ctx.revert();
          }
        );

        return () => mm.revert();
    }, []);

    return (
        <div className={styles.morphing_circles_container}>
            <svg ref={svgRef} className={styles.svg} xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
              <defs>
                <clipPath id="morphing-clippath-1">
                  <rect fill='none' width="51" height="51"/>
                </clipPath>
                <clipPath id="morphing-clippath-2">
                  <rect fill='none' x="50" width="51" height="51"/>
                </clipPath>
                <clipPath id="morphing-clippath-3">
                  <rect fill='none' y="50" width="51" height="51"/>
                </clipPath>
                <clipPath id="morphing-clippath-4">
                  <rect fill='none' x="50" y="50" width="51" height="51"/>
                </clipPath>
              </defs>

              <g clipPath='url(#morphing-clippath-1)'>
                <circle ref={circle1Ref} cx="50" cy="50" r="50" fill='#1e1e1e'/>
              </g>
              <g clipPath='url(#morphing-clippath-2)'>
                <circle ref={circle2Ref} cx="50" cy="50" r="50" fill='#1e1e1e'/>
              </g>
              <g clipPath='url(#morphing-clippath-3)'>
                <circle ref={circle3Ref} cx="50" cy="50" r="50" fill='#1e1e1e'/>
              </g>
              <g clipPath='url(#morphing-clippath-4)'>
                <circle ref={circle4Ref} cx="50" cy="50" r="50" fill='#1e1e1e' />
              </g>
            </svg>
        </div>
    )
}

export default MorphingCircles;