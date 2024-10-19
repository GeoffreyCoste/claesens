'use client';

import styles from './style.module.scss';
import {useState, useRef, useLayoutEffect} from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import clsx from 'clsx';
import {bricolage_grotesque} from '@/app/fonts';
import {STEPS} from '@/components/circular-list/data';
import NumberDisplay from '../scroll-trigger-wrapper/number-display';

gsap.registerPlugin(ScrollTrigger);

const HorizontalMotion = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const circleRef = useRef(null);
  const itemsRef = useRef([]);
  const imagesRef = useRef([]);
  const textsRef = useRef([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const circle = circleRef.current;
    const items = itemsRef.current;
    const images = imagesRef.current;
    const texts = textsRef.current;

    if (!container || !content || !circle || !items || !images || !texts)
      return;

    const ctx = gsap.context(() => {
      const updateScrollWidth = () => {
        const contentWidth = content.offsetWidth;

        gsap.set(container, {
          height: contentWidth * items.length
        });
      };

      // Init scroll container and recalculate during reinitinalisation
      updateScrollWidth();
      ScrollTrigger.addEventListener('refreshInit', updateScrollWidth);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          pin: content,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const newIndex = Math.round(progress * (items.length - 1));
            setCurrentIndex(newIndex);
          }
        }
      });

      gsap.fromTo(
        circle,
        {
          opacity: 0,
          scale: 0
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: circle,
            start: 'top bottom-=200px',
            end: '+=200px',
            scrub: true
          }
        }
      );

      images.forEach((img, index) => {
        gsap.fromTo(
          img,
          {autoAlpha: 0, y: -100},
          {
            autoAlpha: 1,
            y: 0,
            scrollTrigger: {
              trigger: container,
              start: () => `top+=${index * 600} center`, // Ajustez le départ
              end: () => `top+=${(index + 1) * 600} center`, // Ajustez la fin
              scrub: true,
              invalidateOnRefresh: true,
              toggleClass: {targets: img, className: styles.current},
              onEnter: () => {
                images.forEach((el, i) => {
                  if (el !== img) {
                    gsap.to(el, {autoAlpha: 0}); // Masque les autres items
                  }
                });
              },
              onLeaveBack: () => {
                images.forEach((el, i) => {
                  if (el !== img) {
                    gsap.to(el, {autoAlpha: 0}); // Masque les autres items quand on retourne en arrière
                  }
                });
              }
            }
          }
        );
      });

      texts.forEach((text, index) => {
        gsap.fromTo(
          text,
          {autoAlpha: 0, x: 100},
          {
            autoAlpha: 1,
            x: 0,
            scrollTrigger: {
              trigger: container,
              start: () => `top+=${index * 600} center`, // Ajustez le départ
              end: () => `top+=${(index + 1) * 600} center`, // Ajustez la fin
              scrub: true,
              invalidateOnRefresh: true,
              toggleClass: {targets: text, className: styles.current},
              onEnter: () => {
                texts.forEach((el, i) => {
                  if (el !== text) {
                    gsap.to(el, {autoAlpha: 0}); // Masque les autres items
                  }
                });
              },
              onLeaveBack: () => {
                texts.forEach((el, i) => {
                  if (el !== text) {
                    gsap.to(el, {autoAlpha: 0}); // Masque les autres items quand on retourne en arrière
                  }
                });
              }
            }
          }
        );
      });

      return () => {
        ScrollTrigger.removeEventListener('refreshInit', updateScrollWidth);
      };
    }, container);

    return () => {
      ctx.revert(); // Cleanup animations and ScrollTrigger effects when component unmounts
    };
  }, []);

  return (
    <div className={styles.horizontal_motion}>
      <div ref={containerRef} className={styles.horizontal_motion_container}>
        <div ref={contentRef} className={styles.horizontal_motion_content}>
          <div className={styles.horizontal_motion_index_indicator}>
            <span className={styles.horizontal_motion_index_indicator_label}>
              etape
            </span>
            <NumberDisplay index={currentIndex} />
          </div>
          <div ref={circleRef} className={styles.circle}></div>
          {STEPS.map((step, index) => (
            <div
              key={`step-${index}`}
              className={styles.horizontal_motion_item}
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
                <div
                  className={styles.step_article_text}
                  ref={(el) => (textsRef.current[index] = el)}
                >
                  <div className={styles.shape}></div>
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
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalMotion;
