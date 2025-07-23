'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const baseEllipses = [
  { cx: 15.2, cy: 28.1, rx: 20, ry: 10, translateX: -16.6, translateY: 24.4, rotate: -55 },
  { cx: 36.6, cy: 43.1, rx: 40, ry: 20, translateX: -19.7, translateY: 48.4, rotate: -55 },
  { cx: 75,   cy: 70,   rx: 80, ry: 40, translateX: -25.4, translateY: 91.3, rotate: -55 },
  { cx: 113.5, cy: 96.9, rx: 40, ry: 20, translateX: -31, translateY: 134.3, rotate: -55 },
  { cx: 134.8, cy: 111.9, rx: 20, ry: 10, translateX: -34.1, translateY: 158.2, rotate: -55 },
];

const EllipseSwirl = ({ activeIndex }) => {
  const ellipsesRef = useRef([]);
  const prevIndex = useRef(activeIndex ?? 0);

  useEffect(() => {
  if (activeIndex == null || activeIndex === prevIndex.current) return;

  const direction = activeIndex > prevIndex.current ? 'right' : 'left';
  const indexes = direction === 'right'
    ? [...ellipsesRef.current.keys()]
    : [...ellipsesRef.current.keys()].reverse();

  const tl = gsap.timeline();

  indexes.forEach((i, idx) => {
    const el = ellipsesRef.current[i];
    const base = baseEllipses[i];

    // Séquence pour une seule ellipse : gonfle puis rétrécit
    tl.to(el, {
      attr: { rx: base.rx * 1.2 },
      duration: 0.3,
      ease: 'power1.out',
    }, idx * 0.1); // decalage par index

    tl.to(el, {
      attr: { rx: base.rx },
      duration: 0.3,
      ease: 'power1.in',
    }, idx * 0.1 + 0.3); // retour juste après
  });

  prevIndex.current = activeIndex;
}, [activeIndex]);


  return (
    <svg viewBox="-20 -20 190 180" preserveAspectRatio="xMidYMid meet">
      {baseEllipses.map((e, index) => (
        <ellipse
          key={index}
          ref={(el) => (ellipsesRef.current[index] = el)}
          cx={e.cx}
          cy={e.cy}
          rx={e.rx}
          ry={e.ry}
          transform={`translate(${e.translateX} ${e.translateY}) rotate(${e.rotate})`}
          fill="#1e1e1e"
        />
      ))}
    </svg>
  );
};

export default EllipseSwirl;
