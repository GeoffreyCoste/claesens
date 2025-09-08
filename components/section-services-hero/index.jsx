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
import { useLenis } from '@/hooks/useLenis';
import CurvedText from './curved-text';

gsap.registerPlugin(ScrollTrigger, SplitText);

const SectionServicesHero = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const headingRef = useRef(null);
  const linesRef = useRef([]);
  const sceneRef = useRef(null);
  const cardIntroRef = useRef(null);
  const cardsGroupRef = useRef(null);

  const {lenis, start, stop} = useLenis();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;
    const heading = headingRef.current;
    const lines = linesRef.current;
    const scene = sceneRef.current;
    const cardIntro = cardIntroRef.current;
    const cardsGroup = cardsGroupRef.current;
    if (
      !lenis ||
      !section ||
      !scrollContainer ||
      !heading ||
      !lines ||
      !scene ||
      !cardIntro ||
      !cardsGroup
    )
      return;

    // Always force scroll to top and block lenis at start
    lenis.scrollTo(0, {immediate: true});
    stop();

    const mm = gsap.matchMedia();

    let introCtx, scrollCtx, introTl, scrollTl, split0, split1;
    let hasPlayedIntro = false;

    const createSplit = () => {
      split0?.revert();
      split1?.revert();

      // Cleanup lines to remove generated div.span
      linesRef.current[0].innerHTML = linesRef.current[0].textContent;
      linesRef.current[1].innerHTML = linesRef.current[1].textContent;

      split0 = new SplitText(linesRef.current[0], {
        type: 'chars',
        smartWrap: true
      });
      split1 = new SplitText(linesRef.current[1], {
        type: 'chars',
        smartWrap: true
      });
    };

    mm.add(
      {
        xs: '(max-width: 359px)',
        sm: '(min-width: 360px) and (max-width: 767px)',
        md: '(min-width: 768px) and (max-width: 1023px)',
        lg: '(min-width: 1024px) and (max-width: 1199px)',
        xl: '(min-width: 1200px) and (max-width: 1439px)',
        xxl: '(min-width: 1440px)'
      },
      (context) => {
        const {xs, sm, md, lg, xl, xxl} = context.conditions;

        introCtx = gsap.context(() => {
          const createScrollTimeline = () => {
            scrollCtx?.revert();
            scrollCtx = gsap.context(() => {
              gsap.set(split0.chars, {
                autoAlpha: 1,
                yPercent: 0
              });

              if (scrollTl) scrollTl.kill();
              scrollTl = gsap.timeline({
                scrollTrigger: {
                  trigger: scrollContainer,
                  start: 'top top',
                  end: 'bottom bottom',
                  scrub: true
                  // markers: true,
                }
              });

              scrollTl.to(split0.chars, {
                autoAlpha: 0,
                yPercent: 'random([-100, 100])',
                stagger: {
                  amount: 0.5,
                  from: 'random'
                }
              });

              scrollTl.to(cardIntro, {
                scale: 0,
                transformOrigin: 'center center',
                duration: 1,
                ease: 'power2.inOut'
              });

              scrollTl.to(
                scene,
                {
                  autoAlpha: 0,
                  ease: 'power3.out'
                },
                '<'
              );

              scrollTl.addLabel('split0-midpoint');

              scrollTl.fromTo(
                cardsGroup,
                {
                  scale: 0.25,
                  rotateZ: 0
                },
                {
                  scale: 3.5,
                  rotateZ: '180deg',
                  duration: 4
                }
              );

              scrollTl.fromTo(
                cardsGroup,
                {
                  autoAlpha: 0
                },
                {
                  autoAlpha: 1,
                  duration: 0.5
                },
                '<'
              );

              scrollTl.fromTo(
                split1.chars,
                {
                  autoAlpha: 0,
                  yPercent: 'random([-100, 100])'
                },
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  duration: 2,
                  stagger: {
                    amount: 0.5,
                    from: 'random'
                  }
                },
                'split0-midpoint'
              );
            });
          };

          // Load fonts first and then start intro
          document.fonts.ready.then(() => {
            createSplit();

            // if (introTl) introTl.kill();
            if (!hasPlayedIntro && window.scrollY === 0) {
              introTl = gsap.timeline({
                onStart: () => {
                  stop();
                  ScrollTrigger.getAll().forEach((t) => t.disable());
                },
                onComplete: () => {
                  // Create scroll timeline first
                  createScrollTimeline();

                  // Then put everything back to operation
                  ScrollTrigger.getAll().forEach((t) => t.enable());
                  ScrollTrigger.refresh();

                  start();
                  hasPlayedIntro = true;
                }
              });

              introTl.set([lines[0], lines[1]], {visibility: 'visible'});
              introTl.set([split0.chars, split1.chars, cardsGroup], {
                autoAlpha: 0
              });

              introTl.fromTo(
                cardIntro,
                {
                  width: '110vw',
                  height: '110vh'
                },
                {
                  width: xxl
                    ? '900px'
                    : xl
                      ? '900px'
                      : lg
                        ? '800px'
                        : md
                          ? '650px'
                          : sm
                            ? '320px'
                            : '320px',
                  height: xxl
                    ? '675px'
                    : xl
                      ? '506px'
                      : lg
                        ? '450px'
                        : md
                          ? '867px'
                          : sm
                            ? '450px'
                            : '280px',
                  delay: 0.5,
                  duration: 1,
                  ease: 'power2.inOut'
                }
              );

              introTl.fromTo(
                split0.chars,
                {
                  autoAlpha: 0,
                  yPercent: 'random([-100, 100])'
                },
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  delay: 1,
                  stagger: {
                    amount: 0.5,
                    from: 'random'
                  }
                }
              );
            } else {
              createScrollTimeline();
            }
          });
        });

        return () => {
          introCtx.revert();
          scrollCtx?.revert();
        };
      }
    );

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mm.revert();
    };
  }, [lenis, start, stop]);

  return (
    <section ref={sectionRef} className={styles.section_services_hero}>
      <div className={styles.content}>
        <div ref={scrollContainerRef} className={styles.scroll_container}></div>
        <div ref={headingRef} className={styles.heading}>
          <div className={`${styles.layer} ${styles.layer_title}`}>
            <h1
              className={styles.title}
              aria-label="Un écosystème dédié à votre image."
            >
              {titleLines.map((line, index) => (
                <span
                  key={`hero-title-line-${index}`}
                  className={styles.line}
                  ref={(el) => (linesRef.current[index] = el)}
                  aria-hidden="true"
                >
                  {line}
                </span>
              ))}
            </h1>
          </div>
          <div
            ref={sceneRef}
            className={`${styles.layer} ${styles.layer_scene}`}
          >
            <HeroScene />
          </div>
          <div className={`${styles.layer} ${styles.layer_card}`}>
            <div
              ref={cardIntroRef}
              className={`${styles.card} ${styles.card_intro}`}
            ></div>
          </div>
          <div className={`${styles.layer} ${styles.layer_cards_group}`}>
            <div ref={cardsGroupRef} className={styles.cards_group}>
              {brandImages.map((img, index) => (
                <div
                  key={`card-perspective-${index}`}
                  className={`${styles.card} ${styles.card_perspective}`}
                >
                  <Image
                    src={img.src}
                    sizes={'60vh'}
                    fill
                    alt={img.alt}
                    style={{objectFit: 'cover'}}
                    // loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={`${styles.layer} ${styles.layer_infinite_text}`}>
            <InfiniteText />
          </div>
        </div>
        <div className={styles.body}>
          <p className={styles.text}>
            Avec une expertise complète et une approche à 360° du design, je
            vous offre une gamme complète de services pour répondre à tous vos
            besoins créatifs.
          </p>
          <p className={styles.text}>
            Que vous cherchiez à renforcer votre identité de marque, à captiver
            vos utilisateurs en ligne, ou à donner vie à des supports imprimés
            percutants, je vous accompagne à chaque étape du processus.
          </p>
        </div>
        <aside className={styles.aside}>
          <CurvedText />
        </aside>
      </div>
    </section>
  );
};

export default SectionServicesHero;