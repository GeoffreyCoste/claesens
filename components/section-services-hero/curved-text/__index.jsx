'use client';

import styles from './style.module.scss';
import {useLayoutEffect, useRef} from 'react';
import {bricolage_grotesque} from '@/app/fonts';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CurvedText = () => {
    const svgRef = useRef(null);
    
    const textRefs = [useRef(null), useRef(null), useRef(null)];
    const pathRefs = [useRef(null), useRef(null), useRef(null)];

    useLayoutEffect(() => {
      const svg = svgRef.current;
      if (!svg) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: '(max-width: 767px)'
        },
        (context) => {
          const {isMobile} = context.conditions;

          console.log('Media match fired', { isMobile, isDesktop });

          const ctx = gsap.context(() => {
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: svg,
                  // start: isMobile ? 'top+=400% bottom' : 'top+=300% bottom',
                  // end: '+=70%',
                  start: 'top bottom',
                  end: '+=150px',
                  scrub: true,
                  markers: true
                }
              });
    
              const from = {
                transformOrigin: 'center center',
                rotation: 0
              };
    
              const to = {
                rotation: 180,
                ease: 'circ.out'
              };
    
              textRefs.forEach((textRef, index) => {
                const text = textRef.current;
                const path = pathRefs[index].current;
                if (!text || !path) return;

                console.log('Path: ', path);
                console.log('Text: ', text);
    
                const delay = index * 0.2; // Delay each element animation
    
                tl.fromTo(
                  [text, path],
                  {...from, delay},
                  {
                    ...to,
                    rotation: to.rotation * (index % 2 === 0 ? -1 : 1) // Alternating rotation direction
                  },
                  0
                );
              });
    
              ScrollTrigger.refresh();
          })

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
        <path
          ref={pathRefs[0]}
          id="circlePath1"
          d="M 250, 250 m -175, 0 a 175,175 0 1,1 350,0 a 175,175 0 1,1 -350,0"
        />
        <path
          ref={pathRefs[1]}
          id="circlePath2"
          d="M 250, 250 m -125, 0 a 125,125 0 1,1 250,0 a 125,125 0 1,1 -250,0"
        />
        <path
          ref={pathRefs[2]}
          id="circlePath3"
          d="M 250, 250 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
        />
      </defs>
      <text className={bricolage_grotesque.className}>
        <textPath ref={textRefs[0]} href="#circlePath1" startOffset="50%">
          boucler en beauté
        </textPath>
      </text>
      <text className={bricolage_grotesque.className}>
        <textPath ref={textRefs[1]} href="#circlePath2" startOffset="50%">
          sans tourner
        </textPath>
      </text>
      <text className={bricolage_grotesque.className}>
        <textPath ref={textRefs[2]} href="#circlePath3" startOffset="50%">
          en rond
        </textPath>
      </text>
    </svg>
  )
}

export default CurvedText;