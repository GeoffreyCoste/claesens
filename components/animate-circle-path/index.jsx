'use client';

import styles from './style.module.scss';
import {useState, useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/all';
import {useMedia} from '@/hooks/useMedia';

const AnimateCirclePath = ({
  initialX = '50%',
  initialY = '80%',
  initialR = 50,
  children
}) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0
  });

  const containerRef = useRef(null);
  const circleRef = useRef(null);

  const {isHydrated, matches} = useMedia();
  const {desktop} = matches;

  useEffect(() => {
    if (!isHydrated || !desktop) return;

    const handleResize = () => {
      setDimensions({width: window.innerWidth, height: window.innerHeight});
    };

    // Initial dimensions
    handleResize();

    window.addEventListener('resize', handleResize);

    // GSAP animation
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const container = containerRef.current;
    const circle = circleRef.current;

    const {width, height} = dimensions;

    mm.add('(min-width: 1024px)', () => {
      const animation = gsap.fromTo(
        circle,
        {attr: {r: initialR, cx: initialX, cy: initialY}},
        {
          attr: {r: Math.max(width, height)},
          scrollTrigger: {
            trigger: container,
            start: '35% bottom',
            end: 'bottom 80%',
            scrub: true
          }
        }
      );

      return () => {
        animation.kill();
      };
    });

    // Cleanup
    return () => {
      mm.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [isHydrated, desktop, dimensions, initialX, initialY, initialR]);

  return (
    <div ref={containerRef} className={styles.animate_container}>
      <svg
        className={styles.animate_svg}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <defs>
          <clipPath id="circleClipPath">
            <circle ref={circleRef} cx={initialX} cy={initialY} r={initialR} />
          </clipPath>
        </defs>
      </svg>
      <div
        className={styles.animate_content}
        style={isHydrated && desktop ? {clipPath: 'url(#circleClipPath)'} : {}}
      >
        <div className={styles.animate_content_inner}>{children}</div>
      </div>
    </div>
  );
};

export default AnimateCirclePath;
