'use client';

import styles from './style.module.scss';
import {useState, useRef, useLayoutEffect} from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
/* import ScrollToPlugin from 'gsap/ScrollToPlugin'; */
import clsx from 'clsx';
import {bricolage_grotesque} from '@/app/fonts';
import {STEPS} from '@/components/circular-list/data';
import NumberDisplay from '../scroll-trigger-wrapper/number-display';

gsap.registerPlugin(ScrollTrigger /* , ScrollToPlugin */);

const HorizontalScroll = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const itemsRef = useRef([]);
  const indicatorRef = useRef(null);
  const imagesRef = useRef([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const items = itemsRef.current;
    const indicator = indicatorRef.current;
    const images = imagesRef.current;

    if (!container || !content || !items || !images || !indicator) return;

    const ctx = gsap.context(() => {
      const updateScrollWidth = () => {
        const contentWidth = content.offsetWidth;

        gsap.set(container, {
          height: contentWidth
        });
      };

      // Init scroll container and recalculate during reinitinalisation
      updateScrollWidth();
      ScrollTrigger.addEventListener('refreshInit', updateScrollWidth);

      const scroll_tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          pin: content,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress; // Get scroll progress
            const newIndex = Math.round(progress * (items.length - 1)); // Calculate index based on progress
            setCurrentIndex(newIndex); // Update current index state

            // Check if we are at the end or beginning of the scroll
            if (progress === 0 || progress === 1) {
              self.scroll(self.start + (progress === 1 ? self.end : 0)); // Ensure the scroll matches the end state
            }
          }
        }
      });

      scroll_tl.to(content, {
        x: `-${content.offsetWidth - container.offsetWidth}`,
        ease: 'none'
      });

      // Pin the indicator
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: indicator,
        pinSpacing: false,
        scrub: true
      });

      // Animate images' opacity subject to timeline progress
      images.forEach((image, index) => {
        if (index !== 0) {
          gsap.fromTo(
            image,
            {
              opacity: 0
            },
            {
              opacity: 1,
              duration: 2,
              ease: 'slow(0.7,0.7,false)',
              scrollTrigger: {
                trigger: image,
                containerAnimation: scroll_tl,
                start: 'left center',
                end: 'left left',
                scrub: true
              }
            }
          );
        }
      });

      return () => {
        ScrollTrigger.removeEventListener('refreshInit', updateScrollWidth);
      };
    }, container); // Associate context to container

    return () => {
      ctx.revert(); // Cleanup animations and ScrollTrigger effects when component unmounts
    };
  }, []);

  return (
    <div className={styles.horizontal_scroll}>
      <div ref={containerRef} className={styles.horizontal_scroll_container}>
        <div ref={contentRef} className={styles.horizontal_scroll_content}>
          {STEPS.map((step, index) => (
            <div
              key={`step-${index}`}
              className={styles.horizontal_scroll_item}
              ref={(el) => (itemsRef.current[index] = el)}
            >
              <article className={styles.step_article}>
                <div
                  className={styles.step_article_img}
                  ref={(el) => (imagesRef.current[index] = el)}
                >
                  <Image
                    src={`/images/sphere_${index}.png`}
                    alt={step.mobileImgAlt}
                    fill
                    loading="lazy"
                    style={{objectFit: 'cover'}}
                  />
                </div>
                <h3
                  className={clsx(
                    bricolage_grotesque.className,
                    styles.step_article_title
                  )}
                >
                  {step.title}
                </h3>
                {step.description.match(/[^.!?]+[.!?]/g).map((p, i) => (
                  <p
                    key={`p-${index}-${i}`}
                    className={styles.step_article_description}
                  >
                    {p.trim()}
                  </p>
                ))}
              </article>
            </div>
          ))}
        </div>
        <div ref={indicatorRef} className={styles.steps_indicator}>
          <span className={styles.steps_indicator_label}>Etape</span>
          <NumberDisplay index={currentIndex} />
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
