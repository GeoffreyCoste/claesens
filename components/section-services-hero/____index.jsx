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
        let split0, split1;
        // WIP - Find solution to use it
        /* document.fonts.ready.then(() => {
        }); */

        // Split les lignes en caractères
        split0 = new SplitText(lines[0], { type: "chars", smartWrap: true });
        split1 = new SplitText(lines[1], { type: "chars", smartWrap: true });

        const introTl = gsap.timeline({
          onStart: () => {
            stop();
            ScrollTrigger.getAll().forEach(trigger => trigger.disable()); // 👈 désactive GSAP scroll
          },
          onComplete: () => {
            start();
            ScrollTrigger.getAll().forEach(trigger => trigger.enable());

            ScrollTrigger.refresh(); // 🔧 Recalculate scrollTriggers in particular for 'CurvedTextSvg' component below in the page
            
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
            width: isDesktop ? "700px" : isTablet ? "500px" : "300px",
            height: isDesktop ? "500px" : isTablet ? "700px" : "450px", // 500px
            delay: 0.5,
            duration: 1,
            ease: "power2.inOut",
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
              },
            },
            "split0-midpoint"
          );
        };
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
          {/* <CurvedText /> */}
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