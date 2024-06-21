'use client';

import styles from './style.module.scss';
import {useState, useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/all';
import useMediaQueries from '@/hooks/useMediaQueries';

const AnimateCirclePath = ({
  initialX = '50%',
  initialY = '80%',
  initialR = 50,
  children
}) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const containerRef = useRef(null);
  const circleRef = useRef(null);

  const {desktop} = useMediaQueries();

  useEffect(() => {
    const handleResize = () => {
      setDimensions({width: window.innerWidth, height: window.innerHeight});
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!desktop) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const circle = circleRef.current;

    const {width, height} = dimensions;

    const animation = gsap.fromTo(
      circle,
      {attr: {r: initialR, cx: initialX, cy: initialY}},
      {
        attr: {r: Math.max(width, height)}, // Circle size to cover entirely the container
        scrollTrigger: {
          trigger: container,
          start: '35% bottom',
          end: 'bottom 80%',
          scrub: true,
          markers: true
        }
      }
    );

    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [desktop, dimensions, initialX, initialY, initialR]);

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
        style={desktop ? {clipPath: 'url(#circleClipPath)'} : {}}
      >
        <div className={styles.animate_content_inner}>{children}</div>
      </div>
    </div>
  );
};

export default AnimateCirclePath;
