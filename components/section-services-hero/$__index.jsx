'use client';

import styles from './style.module.scss';
import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import HeroScene from './hero-scene';
import InfiniteText from './infinite-text';
import { titleLines, brandImages } from './data';

gsap.registerPlugin(ScrollTrigger, SplitText);

const SectionServicesHero = () => {
  const sectionRef = useRef(null);
  const linesRef = useRef([]);
  const sceneRef = useRef(null);
  const cardIntroRef = useRef(null);
  const cardCenterRef = useRef(null);
  const cardsGroupRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const lines = linesRef.current;
    const scene = sceneRef.current;
    const cardIntro = cardIntroRef.current;
    const cardCenter = cardCenterRef.current;
    const cardsGroup = cardsGroupRef.current;
    if (!section || !lines || !scene || !cardIntro || !cardCenter || !cardsGroup) return;

    document.documentElement.classList.add("no-scroll");

    const ctx = gsap.context(() => {
      // Split les lignes en caractères
      const split0 = new SplitText(lines[0], { type: "chars" });
      const split1 = new SplitText(lines[1], { type: "chars" });

      const introTl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove("no-scroll");
          createScrollTimeline();

          cardIntro.classList.add(`${styles.hidden}`);
        },
      });

      introTl.set([split0.chars, split1.chars, cardsGroup], { autoAlpha: 0 });

      introTl.fromTo(
        cardIntro,
        {
          width: "110vw",
          height: "110vh",
        },
        {
          width: "700px",
          height: "500px",
          delay: 0.5,
          duration: 1,
          ease: "power2.inOut",
          /* onComplete: () => {
            cleanupTilt = initCardTilt(cardCenter); // ← ici, bien plus fiable
          } */
        }
      );

      introTl.fromTo(
        split0.chars,
        {
          autoAlpha: 0,
          yPercent: "random([-100, 100])",
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          delay: 1,
          stagger: {
            amount: 0.5,
            from: "random",
          }
        }
      );

      const createScrollTimeline = () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=300%",
            scrub: true,
            pin: true,
            pinSpacing: true,
          },
        });

        scrollTl.to(split0.chars, {
          autoAlpha: 0,
          yPercent: "random([-100, 100])",
          stagger: {
            amount: 0.5,
            from: "random",
          }
        });

        scrollTl.to(cardCenter, {
          scale: 0,
          transformOrigin: "center center",
          ease: 'power2.inOut'
        });

        scrollTl.to(scene, {
          // yPercent: 80,
          autoAlpha: 0,
          // filter: "blur(300px)",
          // scale: 1.1,       // Légère expansion pendant la disparition
          ease: 'power3.out'
        }, "<");

        scrollTl.addLabel("split0-midpoint");

        scrollTl.fromTo(
          cardsGroup, 
          {
            scale: 0.25,
            rotateZ: 0,
          },
          {
            scale: 3.5,
            rotateZ: "180deg",
            duration: 4,
          }
        );

        scrollTl.fromTo(
          cardsGroup, 
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.5,
          },
          "<"
        );

        scrollTl.fromTo(
          split1.chars,
          {
            autoAlpha: 0,
            yPercent: "random([-100, 100])",
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 2,
            stagger: {
              amount: 0.5,
              from: "random",
            }
          },
          "split0-midpoint"
        );
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={styles.section_services_hero}>
        <div className={styles.content}>
          <div className={styles.heading}>
            <h1 className={styles.title} aria-label='Un écosystème dédié à votre image.'>
              {titleLines.map((line, index) => (
                <span key={`hero-title-line-${index}`} className={styles.line} ref={(el) => linesRef.current[index] = el}>{line}</span>
              ))}
            </h1>
          </div>
          <div ref={sceneRef} className={`${styles.layer} ${styles.layer_scene}`}>
              <HeroScene />
          </div>
          <div className={`${styles.layer} ${styles.layer_cards}`}>
            <div ref={cardIntroRef} className={`${styles.card} ${styles.card_intro}`}></div>
            <div ref={cardCenterRef} className={`${styles.card} ${styles.card_center}`}></div>
          </div>
          <div className={`${styles.layer} ${styles.layer_cards_group}`}>
            <div ref={cardsGroupRef} className={styles.cards_group}>
              {brandImages.map((img, index) => (
                <div key={`card-perspective-${index}`} className={`${styles.card} ${styles.card_perspective}`}>
                  <Image
                    src={img.src}
                    fill
                    alt={img.alt}
                    style={{objectFit: 'cover'}}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={`${styles.layer} ${styles.layer_infinite_text}`}>
            <InfiniteText />
          </div>
        </div>
    </div>
  )
}

export default SectionServicesHero;