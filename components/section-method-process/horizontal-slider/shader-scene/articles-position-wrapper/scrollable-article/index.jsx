'use client'

import styles from './style.module.scss';
import {useRef, useEffect} from 'react';
import useMediaQueries from '@/hooks/useMediaQueries';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollableArticle = ({
  datas,
  activeIndex,
  isDotNavigationScrolling,
  shouldFadeOut
}) => {
  const titleRef = useRef([]);
  const bodyRef = useRef(null);

  const {tablet} = useMediaQueries();

  useEffect(() => {
    const title = titleRef.current;
    const body = bodyRef.current;
    if (isDotNavigationScrolling || !title || !body) return;

    // Animate title out
    const animateTitleOut = (callback) => {
      const currentSpans = title.querySelectorAll('span');
      if (currentSpans.length === 0) {
        callback?.();
        return;
      }

      gsap.to(currentSpans, {
        y: '100%',
        opacity: 0,
        stagger: 0.02,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: callback
      });
    };

    // Animate title in
    const animateTitleIn = (text) => {
      // Nettoyer sans innerHTML
      while (title.firstChild) {
        title.removeChild(title.firstChild);
      }

      const letters = text.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.transform = 'translateY(-100%)';
        span.style.opacity = '0';
        title.appendChild(span);
        return span;
      });

      gsap.to(letters, {
        y: '0%',
        opacity: 1,
        stagger: 0.03,
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    const animateBodyIn = () => {
      gsap.fromTo(
        body,
        {opacity: 0, y: 30},
        {opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.2}
      );
    };

    const animateBodyOut = (callback) => {
      gsap.to(body, {
        opacity: 0,
        y: 30,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: callback
      });
    };

    // Séparer la logique
    if (
      !datas ||
      activeIndex === null ||
      activeIndex === undefined ||
      !datas[activeIndex]
    ) {
      animateTitleOut(); // plus de innerHTML
      animateBodyOut();
    } else if (shouldFadeOut) {
      animateTitleOut();
      animateBodyOut();
    } else {
      const newTitle = datas[activeIndex].title.replace(/ /g, '\u00A0');
      animateTitleOut(() => animateTitleIn(newTitle));
      animateBodyOut(() => animateBodyIn());
    }
  }, [datas, activeIndex, isDotNavigationScrolling, shouldFadeOut]);

  /* useEffect(() => {
    console.log('Active index: ', activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    console.log('🧪 activeIndex:', activeIndex);
    console.log('🧪 shouldFadeOut:', shouldFadeOut);
    console.log('🧪 datas[activeIndex]:', datas?.[activeIndex]);
    console.log('🧪 isTablet:', tablet);
  }, [datas, activeIndex, shouldFadeOut, tablet]); */

  return (
    <article className={styles.article}>
      <h4
        ref={titleRef}
        className={`${styles.title} ${
          tablet && activeIndex === 1 ? styles.title_adjust : ''
        }`}
      />
      <div ref={bodyRef} className={styles.body}>
        {!shouldFadeOut &&
          activeIndex !== null &&
          activeIndex !== undefined &&
          datas[activeIndex].description.map((p, i) => (
            <p key={`article-description-${i}`} className={styles.text}>
              {p}
            </p>
          ))}
      </div>
    </article>
  );
};

export default ScrollableArticle;