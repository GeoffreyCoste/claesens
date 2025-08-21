'use client';

import styles from './style.module.scss';
import {useLayoutEffect, useRef} from 'react';
import {bricolage_grotesque} from '@/app/fonts';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CurvedText = () => {
    const svgRef = useRef(null);
    const pathsRef = useRef([]);
    const textsRef = useRef([]);

    const pathsData = [
      "M 250, 250 m -175, 0 a 175,175 0 1,1 350,0 a 175,175 0 1,1 -350,0",
      "M 250, 250 m -125, 0 a 125,125 0 1,1 250,0 a 125,125 0 1,1 -250,0",
      "M 250, 250 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
    ];

    const textsData = [
      "boucler en beauté",
      "sans tourner",
      "en rond"
    ];

    useLayoutEffect(() => {
      const svg = svgRef.current;
      const paths = pathsRef.current;
      const texts = textsRef.current;
      if (!svg || paths.length === 0 || texts.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: '(max-width: 767px)',
          isTablet: '(min-width: 768px) and (max-width: 1023px)',
          isDesktop: '(min-width: 1024px)'
        },
        (context) => {
          const {isMobile, isTablet, isDesktop} = context.conditions;

          console.log('Media match fired', {isMobile, isTablet, isDesktop});

          // ScrollTrigger.refresh();

          const ctx = gsap.context(() => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: svg,
                start: 'top bottom',
                // start: isMobile ? 'top+=200% bottom' : isTablet ? 'top+=200% bottom' : 'top+=310% bottom',
                end: '+=70%',
                scrub: true
                // markers: true
              }
            });

            texts.forEach((text, index) => {
              const path = paths[index];

              tl.fromTo(
                [text, path],
                {
                  transformOrigin: 'center center',
                  rotation: 0,
                  delay: index * 0.2
                },
                {
                  rotation: 180 * (index % 2 === 0 ? -1 : 1),
                  ease: 'circ.out'
                },
                0
              );
            });
          });

          return () => ctx.revert();
        }
      );

      return () => mm.revert();
    }, []);

  return (
    <svg
      ref={svgRef}
      className={styles.svg_curved_text}
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {pathsData.map((path, index) => (
          <path
            key={`curved-text-svg-path${index}`}
            ref={(el) => pathsRef.current[index] = el}
            id={`circlePath${index}`}
            d={path}
          />
        ))}
      </defs>
      {textsData.map((text, index) => (
        <text key={`curved-text-svg-text${index}`} className={bricolage_grotesque.className}>
          <textPath 
            ref={(el) => textsRef.current[index] = el} 
            href={`#circlePath${index}`}
            startOffset={`${50 + (index % 2 === 0 ? index * 0.5 : -index * 0.5)}%`}
          >
            {text}
          </textPath>
        </text>
      ))}
    </svg>
  )
}

export default CurvedText;