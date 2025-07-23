/* 'use client';

import styles from './style.module.scss';
import { useRef, useLayoutEffect, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import HeroScene from './hero-scene';
import InfiniteText from './infinite-text';
import { titleLines, brandImages } from './data';
import { useLenis } from '@/hooks/useLenis';
import CurvedTextSvg from '../curved-text-svg';
import {bricolage_grotesque} from '@/app/fonts';
import CurvedText from './curved-text';

gsap.registerPlugin(ScrollTrigger, SplitText);

const SectionServicesHero = () => {
  const sectionRef = useRef(null);
  const linesRef = useRef([]);
  const sceneRef = useRef(null);
  const cardIntroRef = useRef(null);
  const cardCenterRef = useRef(null);
  const cardsGroupRef = useRef(null);
  const splitTextRef = useRef({ split0: null, split1: null });
  const timelineRef = useRef(null);
  const isInitializedRef = useRef(false);
  const scrollTimelineRef = useRef(null);

  const { lenis, start, stop } = useLenis();

  // 🔧 Fonction pour forcer le scroll
  const forceEnableScroll = useCallback(() => {
    if (!lenis) return;
    
    console.log('🔧 Force enabling scroll...');
    
    // Méthode plus simple et directe
    start();
    
    // Vérification après délai
    setTimeout(() => {
      if (lenis && !lenis.isScrolling) {
        console.log('🔧 Second attempt to enable scroll');
        start();
      }
    }, 100);
  }, [lenis, start]);

  // 🔧 Fonction pour nettoyer les SplitText
  const cleanupSplitText = useCallback(() => {
    if (splitTextRef.current.split0) {
      try {
        splitTextRef.current.split0.revert();
      } catch (e) {
        console.warn('Error reverting split0:', e);
      }
      splitTextRef.current.split0 = null;
    }
    if (splitTextRef.current.split1) {
      try {
        splitTextRef.current.split1.revert();
      } catch (e) {
        console.warn('Error reverting split1:', e);
      }
      splitTextRef.current.split1 = null;
    }
  }, []);

  // 🔧 Fonction pour nettoyer les timelines
  const cleanupTimelines = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    if (scrollTimelineRef.current) {
      scrollTimelineRef.current.kill();
      scrollTimelineRef.current = null;
    }
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const lines = linesRef.current;
    const scene = sceneRef.current;
    const cardIntro = cardIntroRef.current;
    const cardCenter = cardCenterRef.current;
    const cardsGroup = cardsGroupRef.current;
    
    if (!lenis || !section || !lines[0] || !lines[1] || !scene || !cardIntro || !cardCenter || !cardsGroup) {
      console.warn('Missing refs, retrying...');
      return;
    }

    // 🔧 Éviter les doubles initialisations pendant le hot reload
    if (isInitializedRef.current) {
      console.log('🔄 Already initialized, skipping...');
      return;
    }
    isInitializedRef.current = true;

    console.log('🚀 Initializing SectionServicesHero...');

    // 🔧 Nettoyage préventif
    cleanupTimelines();
    cleanupSplitText();
    ScrollTrigger.killAll();

    // 🔧 Setup initial
    lenis.scrollTo(0, { immediate: true });
    stop();

    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 767px)",
      isTablet: "(min-width: 768px) and (max-width: 1024px)",
      isDesktop: "(min-width: 1025px)",
    }, (context) => {
      const { isMobile, isTablet, isDesktop } = context.conditions;

      const ctx = gsap.context(() => {
        
        const createScrollTimeline = () => {
          if (!splitTextRef.current.split0 || !splitTextRef.current.split1) {
            console.warn('⚠️ SplitText not ready for scroll timeline');
            return;
          }
          
          console.log('📜 Creating scroll timeline...');
          
          // 🔧 Nettoyer l'ancienne timeline
          if (scrollTimelineRef.current) {
            scrollTimelineRef.current.kill();
          }
          
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: isMobile ? "+=100%" : isTablet ? "+=75%" : "+=300%",
              scrub: true,
              pin: true,
              pinSpacing: true,
              onUpdate: (self) => {
                // 🔧 Debug du scroll
                if (self.progress === 0) {
                  console.log('📍 Scroll at start');
                }
              }
            },
          });

          scrollTl.to(splitTextRef.current.split0.chars, {
            autoAlpha: 0,
            yPercent: "random([-100, 100])",
            stagger: {
              amount: 0.5,
              from: "random",
            },
          });

          scrollTl.to(cardCenter, {
            scale: 0,
            transformOrigin: "center center",
            duration: 1,
            ease: 'power2.inOut'
          });

          scrollTl.to(scene, {
            autoAlpha: 0,
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
            splitTextRef.current.split1.chars,
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
              },
            },
            "split0-midpoint"
          );
          
          scrollTimelineRef.current = scrollTl;
          return scrollTl;
        };

        const startIntroAnimation = () => {
          console.log('🎬 Starting intro animation...');
          
          // 🔧 Nettoyer l'ancienne timeline
          if (timelineRef.current) {
            timelineRef.current.kill();
          }
          
          const introTl = gsap.timeline({
            onComplete: () => {
              console.log('✅ Intro animation complete');
              
              // 🔧 S'assurer que les éléments sont visibles
              gsap.set([scene, cardCenter], { autoAlpha: 1 });
              gsap.set(splitTextRef.current.split0.chars, { autoAlpha: 1 });
              
              // Cacher seulement la carte d'intro
              cardIntro.classList.add(`${styles.hidden}`);
              
              // 🔧 Réactiver le scroll de manière plus douce
              setTimeout(() => {
                forceEnableScroll();
                
                // Créer le scroll timeline après un délai plus long
                setTimeout(() => {
                  try {
                    createScrollTimeline();
                    ScrollTrigger.refresh();
                    console.log('🎯 Scroll timeline created and refreshed');
                  } catch (error) {
                    console.error('❌ Error creating scroll timeline:', error);
                  }
                }, 300);
              }, 100);
            },
          });

          // 🔧 États initiaux plus explicites
          introTl.set(cardsGroup, { autoAlpha: 0 });
          introTl.set(splitTextRef.current.split0.chars, { autoAlpha: 0 });
          introTl.set(splitTextRef.current.split1.chars, { autoAlpha: 0 });
          
          // 🔧 S'assurer que les éléments principaux sont visibles
          introTl.set([scene, cardCenter], { autoAlpha: 1 });

          // Card intro animation
          introTl.fromTo(
            cardIntro,
            {
              width: "110vw",
              height: "110vh",
            },
            {
              width: isDesktop ? "700px" : isTablet ? "500px" : "300px",
              height: isDesktop ? "500px" : isTablet ? "700px" : "450px",
              delay: 0.5,
              duration: 1,
              ease: "power2.inOut",
            }
          );

          // Text reveal animation
          introTl.fromTo(
            splitTextRef.current.split0.chars,
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

          timelineRef.current = introTl;
        };

        // 🔧 Fonction simplifiée pour initialiser
        const initializeAnimation = () => {
          try {
            console.log('🔧 Initializing animation...');
            
            // Nettoyer les anciens splits
            cleanupSplitText();
            
            // 🔧 Vérifier que les lignes existent encore
            if (!lines[0] || !lines[1]) {
              console.error('❌ Lines not found during initialization');
              return;
            }
            
            // Créer les nouveaux splits
            splitTextRef.current.split0 = new SplitText(lines[0], { type: "chars", smartWrap: true });
            splitTextRef.current.split1 = new SplitText(lines[1], { type: "chars", smartWrap: true });
            
            console.log('📝 SplitText created successfully');
            
            // 🔧 Vérifier que les splits ont bien été créés
            if (!splitTextRef.current.split0.chars || !splitTextRef.current.split1.chars) {
              console.error('❌ SplitText chars not created');
              return;
            }
            
            // Démarrer l'animation
            startIntroAnimation();
            
          } catch (error) {
            console.error('❌ Error initializing animation:', error);
            // Fallback: activer le scroll directement
            forceEnableScroll();
          }
        };

        // 🔧 Attendre un peu plus longtemps pour éviter les problèmes de timing
        setTimeout(initializeAnimation, 200);

      }, section);
      
      return () => {
        console.log('🧹 Cleaning up context...');
        cleanupTimelines();
        cleanupSplitText();
        ctx.revert();
      };
    });

    return () => {
      console.log('🧹 Component cleanup...');
      isInitializedRef.current = false;
      mm.revert();
      cleanupTimelines();
      cleanupSplitText();
      ScrollTrigger.killAll();
    };
  }, [lenis, start, stop, forceEnableScroll, cleanupSplitText, cleanupTimelines]);

  return (
    <section ref={sectionRef} className={styles.section_services_hero}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <div className={`${styles.layer} ${styles.layer_title}`}>
            <h1 className={styles.title} aria-label='Un écosystème dédié à votre image.'>
              {titleLines.map((line, index) => (
                <span 
                  key={`hero-title-line-${index}`} 
                  className={styles.line} 
                  ref={(el) => {
                    if (el) linesRef.current[index] = el;
                  }} 
                  aria-hidden="true"
                >
                  {line}
                </span>
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
                    sizes={"60vh"}
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
        <div className={styles.body}>
          <p className={styles.text}>
            Avec une expertise complète et une approche à 360 degrés du
            design, je vous offre une gamme complète de services pour
            répondre à tous vos besoins créatifs.
          </p>
          <p className={styles.text}>
            Que vous cherchiez à renforcer votre identité de marque, à
            captiver vos utilisateurs en ligne, ou à donner vie à des
            supports imprimés percutants, je vous accompagne à chaque
            étape du processus.
          </p>
        </div>
        <aside className={styles.aside}>
          <CurvedText />
        </aside>
      </div>
    </section>
  )
}

export default SectionServicesHero; */




/* Version modifiée avec Claude ai */

/* 'use client';

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
import CurvedTextSvg from '../curved-text-svg';
import {bricolage_grotesque} from '@/app/fonts';
import CurvedText from './curved-text';

gsap.registerPlugin(ScrollTrigger, SplitText);

const SectionServicesHero = () => {
  const sectionRef = useRef(null);
  const linesRef = useRef([]);
  const sceneRef = useRef(null);
  const cardIntroRef = useRef(null);
  const cardCenterRef = useRef(null);
  const cardsGroupRef = useRef(null);
  const isScrollEnabledRef = useRef(false); // 🔧 Track scroll state
  const splitTextRef = useRef({ split0: null, split1: null }); // 🔧 Store SplitText instances

  const { lenis, start, stop } = useLenis();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const lines = linesRef.current;
    const scene = sceneRef.current;
    const cardIntro = cardIntroRef.current;
    const cardCenter = cardCenterRef.current;
    const cardsGroup = cardsGroupRef.current;
    
    if (!lenis || !section || !lines || !scene || !cardIntro || !cardCenter || !cardsGroup) return;

    // 🔧 Ensure clean state on mount
    lenis.scrollTo(0, { immediate: true });
    stop();
    isScrollEnabledRef.current = false;

    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 767px)",
      isTablet: "(min-width: 768px) and (max-width: 1024px)",
      isDesktop: "(min-width: 1025px)",
    }, (context) => {
      const { isMobile, isTablet, isDesktop } = context.conditions;

      const ctx = gsap.context(() => {
        const startIntroAnimation = () => {

        const introTl = gsap.timeline({
          onStart: () => {
            stop();
            isScrollEnabledRef.current = false;
            // 🔧 Disable ScrollTriggers more safely
            ScrollTrigger.getAll().forEach(trigger => {
              if (trigger.disable) trigger.disable();
            });
          },
          onComplete: () => {
            // 🔧 Add a small delay to ensure proper re-enabling
            gsap.delayedCall(0.1, () => {
              if (!isScrollEnabledRef.current) {
                start();
                isScrollEnabledRef.current = true;
                
                // 🔧 Re-enable ScrollTriggers more safely
                ScrollTrigger.getAll().forEach(trigger => {
                  if (trigger.enable) trigger.enable();
                });

                // 🔧 Force refresh after a frame
                gsap.delayedCall(0.1, () => {
                  ScrollTrigger.refresh();
                  createScrollTimeline();
                  cardIntro.classList.add(`${styles.hidden}`);
                });
              }
            });
          },
        });

        introTl.set([splitTextRef.current.split0.chars, splitTextRef.current.split1.chars, cardsGroup], { autoAlpha: 0 });

        introTl.fromTo(
          cardIntro,
          {
            width: "110vw",
            height: "110vh",
          },
          {
            width: isDesktop ? "700px" : isTablet ? "500px" : "300px",
            height: isDesktop ? "500px" : isTablet ? "700px" : "450px",
            delay: 0.5,
            duration: 1,
            ease: "power2.inOut",
          }
        );

        introTl.fromTo(
          splitTextRef.current.split0.chars,
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
        }; // End of startIntroAnimation

        // Attendre que les fonts soient chargées avant de faire le split
        document.fonts.ready.then(() => {
          // Vérifier que les éléments existent toujours
          if (!lines[0] || !lines[1]) return;
          
          // Split les lignes en caractères et stocker dans le ref
          splitTextRef.current.split0 = new SplitText(lines[0], { type: "chars", smartWrap: true });
          splitTextRef.current.split1 = new SplitText(lines[1], { type: "chars", smartWrap: true });

          // Démarrer l'animation une fois les fonts chargées
          startIntroAnimation();
        }).catch((error) => {
          console.warn('Font loading failed:', error);
          // Fallback: créer les splits sans attendre
          if (lines[0] && lines[1]) {
            splitTextRef.current.split0 = new SplitText(lines[0], { type: "chars", smartWrap: true });
            splitTextRef.current.split1 = new SplitText(lines[1], { type: "chars", smartWrap: true });
            startIntroAnimation();
          }
        });

        const createScrollTimeline = () => {
          // 🔧 Kill any existing ScrollTrigger for this section
          ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars && trigger.vars.trigger === section) {
              trigger.kill();
            }
          });

          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: isMobile ? "+=100%" : isTablet ? "+=75%" : "+=300%",
              scrub: true,
              pin: true,
              pinSpacing: true,
              // 🔧 Add callbacks for better control
              onEnter: () => {
                if (!isScrollEnabledRef.current) {
                  start();
                  isScrollEnabledRef.current = true;
                }
              },
              onRefresh: () => {
                if (!isScrollEnabledRef.current) {
                  start();
                  isScrollEnabledRef.current = true;
                }
              }
            },
          });

          scrollTl.to(splitTextRef.current.split0.chars, {
            autoAlpha: 0,
            yPercent: "random([-100, 100])",
            stagger: {
              amount: 0.5,
              from: "random",
            },
          });

          scrollTl.to(cardCenter, {
            scale: 0,
            transformOrigin: "center center",
            duration: 1,
            ease: 'power2.inOut'
          });

          scrollTl.to(scene, {
            autoAlpha: 0,
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
            splitTextRef.current.split1.chars,
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
              },
            },
            "split0-midpoint"
          );
        };
      });
      
      return () => {
        // 🔧 Nettoyage des SplitText - utiliser le ref
        try {
          if (splitTextRef.current.split0 && typeof splitTextRef.current.split0.revert === 'function') {
            splitTextRef.current.split0.revert();
            splitTextRef.current.split0 = null;
          }
          if (splitTextRef.current.split1 && typeof splitTextRef.current.split1.revert === 'function') {
            splitTextRef.current.split1.revert();
            splitTextRef.current.split1 = null;
          }
        } catch (error) {
          console.warn('Error reverting SplitText:', error);
        }
        
        ctx.revert();
        
        // 🔧 Ensure scroll is re-enabled on cleanup
        if (!isScrollEnabledRef.current) {
          start();
          isScrollEnabledRef.current = true;
        }
      };
    });

    return () => {
      mm.revert();
      // 🔧 Final cleanup du SplitText
      if (splitTextRef.current.split0) {
        splitTextRef.current.split0.revert();
        splitTextRef.current.split0 = null;
      }
      if (splitTextRef.current.split1) {
        splitTextRef.current.split1.revert();
        splitTextRef.current.split1 = null;
      }
      // 🔧 Final cleanup du scroll
      if (!isScrollEnabledRef.current) {
        start();
        isScrollEnabledRef.current = true;
      }
    };
  }, [lenis, start, stop]);

  return (
    <section ref={sectionRef} className={styles.section_services_hero}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <div className={`${styles.layer} ${styles.layer_title}`}>
            <h1 className={styles.title} aria-label='Un écosystème dédié à votre image.'>
              {titleLines.map((line, index) => (
                <span key={`hero-title-line-${index}`} className={styles.line} ref={(el) => linesRef.current[index] = el} aria-hidden="true">{line}</span>
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
                    sizes={"60vh"}
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
        <div className={styles.body}>
          <p className={styles.text}>
            Avec une expertise complète et une approche à 360 degrés du
            design, je vous offre une gamme complète de services pour
            répondre à tous vos besoins créatifs.
          </p>
          <p className={styles.text}>
            Que vous cherchiez à renforcer votre identité de marque, à
            captiver vos utilisateurs en ligne, ou à donner vie à des
            supports imprimés percutants, je vous accompagne à chaque
            étape du processus.
          </p>
          <p className={styles.text}>
            Découvrez mes domaines de compétences et la manière dont ils
            peuvent enrichir votre projet.
          </p>
        </div>
        <aside className={styles.aside}>
          <CurvedText />
        </aside>
      </div>
    </section>
  )
}

export default SectionServicesHero; */




/* Version originale qui semblait fonctionnelle */

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
import CurvedTextSvg from '../curved-text-svg';
import {bricolage_grotesque} from '@/app/fonts';
import CurvedText from './curved-text';

gsap.registerPlugin(ScrollTrigger, SplitText);

const SectionServicesHero = () => {
  const sectionRef = useRef(null);
  const linesRef = useRef([]);
  const sceneRef = useRef(null);
  const cardIntroRef = useRef(null);
  const cardCenterRef = useRef(null);
  const cardsGroupRef = useRef(null);

  const { lenis, start, stop } = useLenis();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const lines = linesRef.current;
    const scene = sceneRef.current;
    const cardIntro = cardIntroRef.current;
    const cardCenter = cardCenterRef.current;
    const cardsGroup = cardsGroupRef.current;
    if (!lenis || !section || !lines || !scene || !cardIntro || !cardCenter || !cardsGroup) return;

    // Toujours forcer le scroll en haut et bloquer Lenis au démarrage
    lenis.scrollTo(0, { immediate: true });
    stop();

    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 767px)",
      isTablet: "(min-width: 768px) and (max-width: 1024px)",
      isDesktop: "(min-width: 1025px) and (max-width: 1440px)",
      isWide: "(min-width: 1441px)"
    }, (context) => {
      const { isMobile, isTablet, isDesktop, isWide } = context.conditions;

      const ctx = gsap.context(() => {
        let split0, split1;

        const createScrollTimeline = () => {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: isMobile ? "+=100%" : isTablet ? "+=75%" : "+=300%",
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
            },
          });

          scrollTl.to(cardCenter, {
            scale: 0,
            transformOrigin: "center center",
            duration: 1,
            ease: 'power2.inOut'
          });

          scrollTl.to(scene, {
            autoAlpha: 0,
            ease: 'power3.out'
          }, "<");

          scrollTl.addLabel("split0-midpoint");

          scrollTl.fromTo(cardsGroup, {
            scale: 0.25,
            rotateZ: 0,
          }, {
            scale: 3.5,
            rotateZ: "180deg",
            duration: 4,
          });

          scrollTl.fromTo(cardsGroup, {
            autoAlpha: 0,
          }, {
            autoAlpha: 1,
            duration: 0.5,
          }, "<");

          scrollTl.fromTo(split1.chars, {
            autoAlpha: 0,
            yPercent: "random([-100, 100])",
          }, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 2,
            stagger: {
              amount: 0.5,
              from: "random",
            },
          }, "split0-midpoint");
        };

        // Charger les polices et lancer l’intro après
        document.fonts.ready.then(() => {
          split0 = new SplitText(lines[0], { type: "chars", smartWrap: true });
          split1 = new SplitText(lines[1], { type: "chars", smartWrap: true });

          const introTl = gsap.timeline({
            onStart: () => {
              stop();
              ScrollTrigger.getAll().forEach(t => t.disable());
            },
            onComplete: () => {
              // → D'abord créer la scroll timeline
              createScrollTimeline();

              // → Ensuite on remet tout en marche
              ScrollTrigger.getAll().forEach(t => t.enable());
              ScrollTrigger.refresh();

              start();

              // → Cache la carte intro après que tout soit prêt
              cardIntro.classList.add(`${styles.hidden}`);
            },
          });

          introTl.set([lines[0], lines[1]], {visibility: "visible"});
          introTl.set([split0.chars, split1.chars, cardsGroup], { autoAlpha: 0 });

          introTl.fromTo(cardIntro, {
            width: "110vw",
            height: "110vh",
          }, {
            width: isWide ? "900px" : isDesktop ? "900px" : isTablet ? "650px" : "320px",
            height: isWide ? "675px" : isDesktop ? "506px" : isTablet ? "867px" : "450px",
            delay: 0.5,
            duration: 1,
            ease: "power2.inOut",
          });

          introTl.fromTo(split0.chars, {
            autoAlpha: 0,
            yPercent: "random([-100, 100])",
          }, {
            autoAlpha: 1,
            yPercent: 0,
            delay: 1,
            stagger: {
              amount: 0.5,
              from: "random",
            }
          });
        });
      });

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [lenis, start, stop]);


  return (
    <section ref={sectionRef} className={styles.section_services_hero}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <div className={`${styles.layer} ${styles.layer_title}`}>
            <h1 className={styles.title} aria-label='Un écosystème dédié à votre image.'>
              {titleLines.map((line, index) => (
                <span key={`hero-title-line-${index}`} className={styles.line} ref={(el) => linesRef.current[index] = el} aria-hidden="true">{line}</span>
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
                    sizes={"60vh"}
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
            Avec une expertise complète et une approche à 360 degrés du
            design, je vous offre une gamme complète de services pour
            répondre à tous vos besoins créatifs.
          </p>
          <p className={styles.text}>
            Que vous cherchiez à renforcer votre identité de marque, à
            captiver vos utilisateurs en ligne, ou à donner vie à des
            supports imprimés percutants, je vous accompagne à chaque
            étape du processus.
          </p>
          <p className={styles.text}>
            Découvrez mes domaines de compétences et la manière dont ils
            peuvent enrichir votre projet.
          </p>
        </div>
        <aside className={styles.aside}>
          <CurvedText />
        </aside>
      </div>
    </section>
  )
}

export default SectionServicesHero;


{/* <aside style={{ width: '100%', height: '100vh', backgroundColor: 'pink', textAlign: 'center'}}>
  {/* <span style={{fontSize: '8rem', color: 'blue'}}>SAPERLIPOPETTE</span> *}
  <CurvedTextSvg />
</aside> */}

{/*
<svg
  /* ref={svgRef} *
  className={styles.svg_curved_text}
  viewBox="0 0 500 500"
  xmlns="http://www.w3.org/2000/svg"
>
  <d>
    <path
      /* ref={pathRefs[0]} *
      id="circlePath1"
      d="M 250, 250 m -175, 0 a 175,175 0 1,1 350,0 a 175,175 0 1,1 -350,0"
    />
    <path
      /* ref={pathRefs[1]} *
      id="circlePath2"
      d="M 250, 250 m -125, 0 a 125,125 0 1,1 250,0 a 125,125 0 1,1 -250,0"
    />
    <path
      /* ref={pathRefs[2]} *
      id="circlePath3"
      d="M 250, 250 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
    />
  </d
  <text className={bricolage_grotesque.className}>
    <textPath /* ref={textRefs[0]} * href="#circlePath1" startOffset="50%">
      boucler en beauté
    </textPath>
  </text>
  <text className={bricolage_grotesque.className}>
    <textPath /* ref={textRefs[1]} * href="#circlePath2" startOffset="50%">
      sans tourner
    </textPath>
  </text>
  <text className={bricolage_grotesque.className}>
    <textPath /* ref={textRefs[2]} * href="#circlePath3" startOffset="50%">
      en rond
    </textPath>
  </text>
</svg>
*/}