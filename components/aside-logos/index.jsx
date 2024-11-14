'use client';

import styles from './style.module.scss';
import {Fragment, useRef, useEffect} from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {logos} from './data';

gsap.registerPlugin(ScrollTrigger);

const AsideLogos = () => {
  const sliderRef = useRef(null);
  const firstListRef = useRef(null);
  const secondListRef = useRef(null);

  useEffect(() => {
    let xPercent = 0;
    let direction = -1;
    let speed = 0.02;

    const ctx = gsap.context(() => {
      if (sliderRef.current && firstListRef.current && secondListRef.current) {
        gsap.to(sliderRef.current, {
          x: '-300px'
        });

        const animate = () => {
          if (xPercent < -100) {
            xPercent = 0;
          } else if (xPercent > 0) {
            xPercent = -100;
          }
          if (firstListRef.current && secondListRef.current) {
            gsap.set(firstListRef.current, {xPercent: xPercent});
            gsap.set(secondListRef.current, {xPercent: xPercent});
          }
          requestAnimationFrame(animate);
          xPercent += speed * direction;
        };

        requestAnimationFrame(animate);
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  /* const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    if (firstListRef.current && secondListRef.current) {
      gsap.set(firstListRef.current, {xPercent: xPercent});
      gsap.set(secondListRef.current, {xPercent: xPercent});
    }
    requestAnimationFrame(animate);
    xPercent += speed * direction;
  }; */

  return (
    <aside className={styles.aside_logos}>
      <div className={styles.logos_container}>
        <div ref={sliderRef} className={styles.logos_slider}>
          <ul ref={firstListRef} className={styles.logos_list}>
            {logos.map((logo, index) => (
              <Fragment key={`fragment-logo-${index}`}>
                <li className={styles.logos_item}>
                  <Image
                    src={logo.src}
                    fill
                    alt={logo.alt}
                    style={{
                      objectFit: 'cover'
                    }}
                  />
                </li>
                <span className={styles.logos_separator}></span>
                {/* {index !== logos.length - 1 && (
                  <span className={styles.logos_separator}></span>
                )} */}
              </Fragment>
            ))}
          </ul>

          {/* Duplicate list for infinite effect */}
          <ul ref={secondListRef} className={styles.logos_list}>
            {logos.map((logo, index) => (
              <Fragment key={`fragment-logo-duplicate-${index}`}>
                <li className={styles.logos_item}>
                  <Image
                    src={logo.src}
                    fill
                    alt={logo.alt}
                    style={{
                      objectFit: 'cover'
                    }}
                  />
                </li>
                <span className={styles.logos_separator}></span>
                {/* {index !== logos.length - 1 && (
                  <span className={styles.logos_separator}></span>
                )} */}
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default AsideLogos;
