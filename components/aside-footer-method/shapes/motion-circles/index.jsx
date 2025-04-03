'use client';

import styles from './style.module.scss';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const CIRCLE_SIZE = 25;
const CLIP_SIZE = 26;
const CENTER_POS = 50;
const RECT_SIZE = 50;
const RECT_POS = 25;

// Positions des quarts de cercle (découpes 2x2 au centre)
const quarterCircles = [
  { id: "motion-clippath-0", x: CENTER_POS - CIRCLE_SIZE, y: CENTER_POS - CIRCLE_SIZE }, // Haut-gauche
  { id: "motion-clippath-1", x: CENTER_POS, y: CENTER_POS - CIRCLE_SIZE }, // Haut-droite
  { id: "motion-clippath-2", x: CENTER_POS - CIRCLE_SIZE, y: CENTER_POS }, // Bas-gauche
  { id: "motion-clippath-3", x: CENTER_POS, y: CENTER_POS }, // Bas-droite
];

// 4 groupes superposés
const groups = Array.from({ length: 9 }).map((_, i) => ({ id: `group-${i}` }));

const MotionCircles = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const circleGroupsRef = useRef([]); // Références des groupes <g> contenant les quarts
  const clippedQuartersRef = useRef(groups.map(() => Array(quarterCircles.length).fill(null))); // Références des cercles individuels

  useEffect(() => {
    const svg = svgRef.current;
    const circles = circleGroupsRef.current;
    const quarters = clippedQuartersRef.current;
    if (!svg || circles.length === 0 || quarters.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 1.5, ease: 'power2.inOut' },
        // paused: true,
        repeat: -1,
      });

      tl.to(circles.slice(4, 8), {
        x: (i) => (i === 0 ? 15 : i === 1 ? -15 : 0),
        y: (i) => (i === 2 ? 15 : i === 3 ? -15 : 0),
      })
      tl.to(circles.slice(0, 4), {
        x: (i) => (i === 0 ? 20 : i === 1 ? -20 : 0),
        y: (i) => (i === 2 ? 20 : i === 3 ? -20 : 0),
      }, '<')
      tl.to(svg, {
        scale: 1.25,
        // rotate: 360,
        // transformOrigin: 'center',
      }, '<')
      tl.to(circles, {
        x: 0,
        y: 0,
      })
      tl.to(svg, {
        scale: 1,
      }, '<')
      tl.to(circles.slice(4, 8), {
        x: (i) => (i === 0 ? 25 : i === 1 ? -25 : 0),
        y: (i) => (i === 2 ? 25 : i === 3 ? -25 : 0),
      })
      tl.to(circles.slice(0, 4), {
        x: (i) => (i % 2 === 0 ? -25 : 25),
        y: (i) => (i < 2 ? -25 : 25),
      }, '<')
      tl.to(circles, {
        x: 0,
        y: 0,
      })
    });

    return () => ctx.revert();

  }, []);

  return (
    <div ref={containerRef} className={styles.motion_circles_container}>
      <svg ref={svgRef} className={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          {/* Clip-paths to cut each quarter */}
          {quarterCircles.map(({ id, x, y }) => (
            <clipPath key={id} id={id}>
              <rect fill="none" x={x} y={y} width={CLIP_SIZE} height={CLIP_SIZE} />
            </clipPath>
          ))}
        </defs>

        {/* Generate 4 stacked groups */}
        {groups.map(({ id }, groupIndex) => (
          <g
            key={id}
            ref={(el) => (circleGroupsRef.current[groupIndex] = el)}
          >
            {groupIndex > 3 && <rect fill="#ffffff" x={RECT_POS} y={RECT_POS} width={RECT_SIZE} height={RECT_SIZE} />}
            {/* Each group contains 4 quarter circles */}
            {quarterCircles.map(({ id: clipId }, quarterIndex) => (
              <g key={`group-${groupIndex}-${quarterIndex}`} clipPath={`url(#${clipId})`}>
                <circle
                  ref={(el) => (clippedQuartersRef.current[groupIndex][quarterIndex] = el)}
                  cx={CENTER_POS}
                  cy={CENTER_POS}
                  r={CIRCLE_SIZE}
                  fill="#1e1e1e"
                />
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default MotionCircles;



