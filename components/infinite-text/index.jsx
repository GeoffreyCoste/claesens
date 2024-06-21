'use client';

import styles from './style.module.scss';
import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/all';

const InfiniteText = () => {
  const slider = useRef(null);
  const firstParagraph = useRef(null);
  const secondParagraph = useRef(null);

  let xPercent = 0;
  let direction = -1;
  let speed = 0.02;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: slider.current,
        scrub: 0.25,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (e) => (direction = e.direction * -1)
      },
      x: '-500px'
    });
    requestAnimationFrame(animate);
  }, [direction]);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstParagraph.current, {xPercent: xPercent});
    gsap.set(secondParagraph.current, {xPercent: xPercent});
    requestAnimationFrame(animate);
    xPercent += speed * direction;
  };

  return (
    <div className={styles.infinite_text}>
      <div ref={slider} className={styles.infinite_text_slider}>
        <p ref={firstParagraph}>
          Branding &bull; Digital &bull; Print &bull; Illustration &bull; Motion
          design &bull; &nbsp;{' '}
        </p>
        <p ref={secondParagraph}>
          Branding &bull; Digital &bull; Print &bull; Illustration &bull; Motion
          design &bull; &nbsp;{' '}
        </p>
      </div>
    </div>
  );
};

export default InfiniteText;
