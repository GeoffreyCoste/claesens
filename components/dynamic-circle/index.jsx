'use client';

import styles from './style.module.scss';
import {useState, useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/all';
import useMediaQueries from '@/hooks/useMediaQueries';

const DynamicCircle = ({sectionRef}) => {
  const {desktop} = useMediaQueries();

  const circleRef = useRef(null);

  useEffect(() => {
    if (desktop) return;

    gsap.registerPlugin(ScrollTrigger);

    const circle = circleRef.current;
    const section = sectionRef.current;

    const animateCircle = gsap.fromTo(
      circle,
      {
        width: '7rem',
        height: '7rem',
        top: 'calc(100% - 3.5rem)',
        left: 'calc(50% - 3.5rem)',
        visibility: 'hidden'
      },
      {
        width: '70rem',
        height: '70rem',
        top: 'calc(50% - 35rem)',
        left: 'calc(50% - 35rem)',
        visibility: 'visible',
        scrollTrigger: {
          trigger: section,
          start: '10% bottom',
          end: '20% 50%',
          scrub: true,
          markers: true
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
          scrub: true,
          markers: true
        }
      }
    );

    return () => {
      if (animateCircle.scrollTrigger) animateCircle.scrollTrigger.kill();
      animateCircle.kill();

      if (animateSection.scrollTrigger) animateSection.scrollTrigger.kill();
      animateSection.kill();
    };
  }, [desktop, sectionRef]);

  return (
    <div
      ref={circleRef}
      className={styles.dynamic_circle}
      /* style={circleStyle} */
    ></div>
  );
};

export default DynamicCircle;
