'use client';

import styles from './style.module.scss';
import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/all';
import useMediaQueries from '@/hooks/useMediaQueries';

const DynamicCircle = ({sectionRef}) => {
  const {tablet, desktop} = useMediaQueries();

  const circleRef = useRef(null);

  useEffect(() => {
    if (desktop) return;

    gsap.registerPlugin(ScrollTrigger);

    const circle = circleRef.current;
    const section = sectionRef.current;

    const radius = tablet ? '10rem' : '7rem';

    // Extract numeric value and unit from radius
    const radiusValue = parseFloat(radius);
    const unit = radius.replace(/[0-9.]/g, ''); // i.e.: 'rem'

    const animateCircle = gsap.fromTo(
      circle,
      {
        width: radius,
        height: radius,
        top: `calc(100% - ${radiusValue / 2}${unit})`,
        left: `calc(50% - ${radiusValue / 2}${unit})`,
        visibility: 'hidden'
      },
      {
        width: `calc(${radiusValue * 10}${unit})`,
        height: `calc(${radiusValue * 10}${unit})`,
        top: `calc(50% - ${radiusValue * 5}${unit})`,
        left: `calc(50% - ${radiusValue * 5}${unit})`,
        visibility: 'visible',
        scrollTrigger: {
          trigger: section,
          start: '10% bottom',
          end: '20% 50%',
          scrub: true
        }
      }
    );

    const animateSection = gsap.fromTo(
      section,
      {
        paddingTop: '10rem'
      },
      {
        paddingTop: '2rem',
        scrollTrigger: {
          trigger: section,
          start: '10% bottom',
          end: '20% 50%',
          scrub: true
        }
      }
    );

    return () => {
      if (animateCircle.scrollTrigger) animateCircle.scrollTrigger.kill();
      animateCircle.kill();

      if (animateSection.scrollTrigger) animateSection.scrollTrigger.kill();
      animateSection.kill();
    };
  }, [tablet, desktop, sectionRef]);

  return (
    <div
      ref={circleRef}
      className={styles.dynamic_circle}
      /* style={circleStyle} */
    ></div>
  );
};

export default DynamicCircle;
