'use client';

import {useRef, useLayoutEffect} from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SvgCirclesHalfRight = () => {
  const svgRef = useRef(null);
  const circlesRef = useRef([]);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const circles = circlesRef.current;

    if (!svg || !circles) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true
          // markers: true
        }
      });

      tl.fromTo(
        circles,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.2, // 0.2s delay between each circle
          ease: 'none'
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <clipPath id="rect-right-1">
          <rect x="0" y="0" width="50" height="200" />
        </clipPath>
        <clipPath id="rect-right-2">
          <rect x="40" y="0" width="40" height="200" />
        </clipPath>
        <clipPath id="rect-right-3">
          <rect x="75" y="0" width="20" height="200" />
        </clipPath>
      </defs>
      <circle
        ref={(el) => circlesRef.current.push(el)}
        cx="-50"
        cy="100"
        r="100"
        fill="#010101"
        clipPath="url(#rect-right-1)"
      />
      <circle
        ref={(el) => circlesRef.current.push(el)}
        cx="-20"
        cy="100"
        r="90"
        fill="#010101"
        clipPath="url(#rect-right-2)"
      />
      <circle
        ref={(el) => circlesRef.current.push(el)}
        cx="-15"
        cy="100"
        r="100"
        fill="#010101"
        clipPath="url(#rect-right-3)"
      />
    </svg>
  );
};

export default SvgCirclesHalfRight;
