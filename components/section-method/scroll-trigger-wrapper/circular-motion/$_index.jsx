'use client';

import {
  useRef,
  useState,
  useLayoutEffect,
  forwardRef,
  useCallback
} from 'react';
import {bricolage_grotesque} from '@/app/fonts';
import clsx from 'clsx';
import gsap from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './style.module.scss';
import {STEPS} from './data';

const CircularMotion = forwardRef(function CircularMotion(props, ref) {
  const [activeDot, setActiveDot] = useState(null); // Active dot state

  const motionItemsRef = useRef([]);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const dotsListRef = useRef(null); // Reference to the dots list
  const scrollTriggerRef = useRef(null); // Reference to the ScrollTrigger instance

  useLayoutEffect(() => {
    gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

    const parentContainer = ref.containerRef.current;
    const items = motionItemsRef.current || [];
    const numItems = items.length;
    const svg = svgRef.current;
    const path = pathRef.current;

    if (!parentContainer || !svg || !path || numItems === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentContainer,
          start: 'top+=300vh top',
          end: '+=800vh',
          scrub: true,
          onUpdate: (self) => {
            // Synchronize active dot state with scroll position
            const progress = self.progress;

            items.forEach((_, i) => {
              if (progress > i / numItems && progress < (i + 1) / numItems) {
                setActiveDot(i);
              }
            });

            if (progress < 0.1 || progress > 0.9) {
              setActiveDot(null);
            }
          }
        }
      });

      // Save ScrollTrigger instance
      scrollTriggerRef.current = tl.scrollTrigger;

      // Setting initial label
      tl.addLabel('start');

      items.forEach((item, i) => {
        const start = 0;
        const mid = 0.5;
        const end = 1;

        const prevLabel = i === 0 ? 'start' : `item_${i - 1}_done`;
        const currentLabel = `item_${i}_done`;

        // Animate from start to mid
        tl.to(
          item,
          {
            opacity: 1,
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0, 0.5],
              start: start,
              end: mid
            },
            duration: 4
          },
          prevLabel
        );

        // Pause at mid
        tl.to(item, {
          opacity: 1,
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0, 0.5],
            start: mid,
            end: mid
          },
          duration: 2
        });

        // Animate from mid to end
        tl.to(item, {
          opacity: 0,
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0, 0.5],
            start: mid,
            end: end
          },
          duration: 4
        });

        // Add label at the beginning of current item last animation
        tl.addLabel(currentLabel, '<');
      });
    });

    return () => {
      ctx.revert();
    };
  }, [ref]);

  // Function to update ScrollTrigger position subject to progress
  const updateScrollTrigger = useCallback(
    (progress) => {
      if (ref.containerRef.current && scrollTriggerRef.current) {
        const scrollTrigger = scrollTriggerRef.current;

        const startOffset = scrollTrigger.start;
        const endOffset = scrollTrigger.end - 50;

        const newProgress = progress * (endOffset - startOffset) + startOffset;

        window.scrollTo({
          top: newProgress,
          behavior: 'smooth'
        });
      }
    },
    [ref]
  );

  const handleDotClick = (index) => {
    const items = motionItemsRef.current || [];
    const numItems = items.length;

    const targetProgress = (index + 0.5) / numItems;

    if (scrollTriggerRef.current) {
      updateScrollTrigger(targetProgress);
      setActiveDot(index);
    }
  };

  return (
    <div className={styles.motion_container}>
      <ul ref={dotsListRef} className={styles.dots_list}>
        {[0, 1, 2, 3].map((dotIndex) => (
          <li
            key={dotIndex}
            className={`${styles.dots_list_item} ${dotIndex === activeDot ? styles.active : ''}`}
            data-index={dotIndex}
            onClick={() => handleDotClick(dotIndex)}
          />
        ))}
      </ul>
      {STEPS.map((step, index) => (
        <div
          key={`step-${index}`}
          className={styles.motion_item}
          ref={(el) => (motionItemsRef.current[index] = el)}
        >
          <div className={styles.motion_item_content}>
            <article className={styles.step_article}>
              <h2
                className={clsx(
                  bricolage_grotesque.className,
                  styles.step_article_title
                )}
              >
                {step.title}
              </h2>
              <p className={styles.step_article_description}>
                {step.description}
              </p>
            </article>
          </div>
        </div>
      ))}
      <svg viewBox="0 0 200 100" ref={svgRef} className={styles.svg}>
        <path
          id="path"
          ref={pathRef}
          d="M 50,0 A 50,50 0 0 1 100,50 A 50,50 0 0 1 50,100"
          fill="none"
          stroke="none"
          strokeWidth="0.25"
          preserveAspectRatio="none"
        />
      </svg>
    </div>
  );
});

export default CircularMotion;
