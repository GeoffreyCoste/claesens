'use client';

import styles from './style.module.scss';
import {useRef, useEffect} from 'react';
import {useMedia} from '@/hooks/useMedia';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollableArticle = ({
  datas,
  activeIndex,
  isDotNavigationScrolling,
  shouldFadeOut
}) => {
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const spansRef = useRef([]);

  const {matches} = useMedia();
  const {tablet} = matches;

  // Helper to split title into spans if not already done
  const initTitleSpans = (text) => {
    if (!titleRef.current) return;
    const existingSpans = spansRef.current;

    if (existingSpans.length === text.length) return; // Already initialized

    // Clear previous spans
    titleRef.current.innerHTML = '';
    spansRef.current = [];

    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.transform = 'translateY(-100%)';
      span.style.opacity = '0';
      titleRef.current.appendChild(span);
      spansRef.current.push(span);
    });
  };

  // Animate title in
  const animateTitleIn = () => {
    gsap.to(spansRef.current, {
      y: '0%',
      opacity: 1,
      stagger: 0.03,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  // Animate title out
  const animateTitleOut = (callback) => {
    gsap.to(spansRef.current, {
      y: '100%',
      opacity: 0,
      stagger: 0.02,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: callback
    });
  };

  // Animate body in
  const animateBodyIn = () => {
    if (!bodyRef.current) return;
    gsap.fromTo(
      bodyRef.current,
      {opacity: 0, y: 30},
      {opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.2}
    );
  };

  // Animate body out
  const animateBodyOut = (callback) => {
    if (!bodyRef.current) return;
    gsap.to(bodyRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: callback
    });
  };

  useEffect(() => {
    if (isDotNavigationScrolling || !datas || activeIndex == null) return;

    const currentData = datas[activeIndex];

    if (!currentData || shouldFadeOut) {
      // Animate out if no data or should fade
      animateTitleOut();
      animateBodyOut();
      return;
    }

    const newTitle = currentData.title.replace(/ /g, '\u00A0');
    initTitleSpans(newTitle);
    animateTitleOut(() => animateTitleIn());
    animateBodyOut(() => animateBodyIn());
  }, [datas, activeIndex, isDotNavigationScrolling, shouldFadeOut]);

  return (
    <article className={styles.article}>
      <h4
        ref={titleRef}
        className={`${styles.title} ${tablet && activeIndex === 1 ? styles.title_adjust : ''}`}
      />
      <div ref={bodyRef} className={styles.body}>
        {!shouldFadeOut &&
          activeIndex != null &&
          datas?.[activeIndex]?.description?.map((p, i) => (
            <p key={`article-description-${i}`} className={styles.text}>
              {p}
            </p>
          ))}
      </div>
    </article>
  );
};

export default ScrollableArticle;

/* 'use client'

import styles from './style.module.scss';
import {useRef, useEffect} from 'react';
import { useMedia } from '@/hooks/useMedia';
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

  const {isHydrated, matches} = useMedia();
  const {tablet} = matches;

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
      // Cleanup without innerHTML
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

    // Seperate logic
    if (
      !datas ||
      activeIndex === null ||
      activeIndex === undefined ||
      !datas[activeIndex]
    ) {
      animateTitleOut(); // without innerHTML
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

export default ScrollableArticle; */
