'use client';

import styles from './style.module.scss';
import {useRef, useEffect} from 'react';
import Image from 'next/image';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import {h2SectionAboutOrigin} from '../animate-heading/data';
import AnimateFade from '../animate-fade';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SvgCirclesHalfLeft from './svg-circles-half-left';
import SvgCirclesHalfRight from './svg-circles-half-right';

gsap.registerPlugin(ScrollTrigger);

const SectionAboutOrigin = () => {
  const containerRef = useRef(null);
  const bgLayerRef = useRef(null);
  const imgPaperRef = useRef(null);
  const imgDigitalRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const layer = bgLayerRef.current;
    const imgPaper = imgPaperRef.current;
    const imgDigital = imgDigitalRef.current;

    if (!container || !layer) return;

    const ctx = gsap.context(() => {
      // Pin layer
      ScrollTrigger.create({
        trigger: container,
        start: 'top+=5% top',
        end: 'bottom bottom',
        pin: layer,
        pinSpacing: false
        // markers: true
      });

      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
          // markers: true
        }
      });

      tl1.set(imgDigital, {opacity: 0});

      tl1
        .fromTo(
          imgPaper,
          {opacity: 0},
          {opacity: 1, duration: 0.25, ease: 'none'}, // Fade-in `imgPaper`
          0
        )
        .to(
          imgPaper,
          {opacity: 0, y: 200, duration: 0.25, ease: 'none'}, // Fade-out `imgPaper`
          0.32 // Start animation at 0.32 (32%) scroll progress
        )
        .fromTo(
          imgDigital,
          {opacity: 0},
          {opacity: 1, duration: 0.25, ease: 'none'}, // Fade-in de `imgDigital`
          '+=0.01' // Start animation 0.01 after last animation
        )
        .to(
          imgDigital,
          {opacity: 0, y: 200, duration: 0.25, ease: 'none'}, // Fade-out
          0.8 // Start animation at 0.8 (80%) scroll progress
        );
    }, [container, layer]);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className={styles.section_about_origin}>
      <div className={styles.section_about_origin_content}>
        <div className={styles.section_about_origin_content_heading}>
          <div className={styles.heading}>
            <div className={styles.heading_img}>
              <Image
                src="/images/img_about_origin_640x640.png"
                alt="Emilie Claesens creative designer freelance - photo noir et blanc avec sphères blanches lumineuses dans les bras"
                fill
                priority
                style={{objectFit: 'cover'}}
              />
            </div>
            <div className={styles.heading_background}>
              <div className={`${styles.shape} ${styles.shape_left}`}>
                <SvgCirclesHalfLeft />
              </div>
              <div className={`${styles.shape} ${styles.shape_right}`}>
                <SvgCirclesHalfRight />
              </div>
            </div>
            <div className={styles.heading_title}>
              <AnimateStagger>
                {h2SectionAboutOrigin.map((text, index) => (
                  <AnimateHeading key={index} {...text} />
                ))}
              </AnimateStagger>
            </div>
          </div>
        </div>
        <div
          ref={containerRef}
          className={styles.section_about_origin_content_body}
        >
          <div ref={bgLayerRef} className={styles.background_layer}>
            <div className={styles.images_wrapper}>
              <Image
                ref={imgDigitalRef}
                src="/images/img_digital_2560x3400.webp"
                alt="Texture numérique en noir et blanc avec des ondulations et reflets fluides évoquant un rendu abstrait et futuriste"
                fill
                loading="lazy"
                // layout="responsive"
                // width={2560}
                // height={3400}
                /* quality={100} */
                style={{
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
              <Image
                ref={imgPaperRef}
                src="/images/img_paper_2560x3400.webp"
                alt="Accumulation ondulée de feuilles de papier sur la tranche"
                fill
                loading="lazy"
                // layout="responsive"
                // width={2560}
                // height={3400}
                /* quality={100} */
                style={{
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.body_item}></div>
            <div className={styles.body_item}>
              <div className={styles.body_item_text}>
                <AnimateStagger>
                  <AnimateFade>
                    <p className={styles.text}>
                      Tout commence par une passion pour le dessin.
                    </p>
                  </AnimateFade>
                </AnimateStagger>
              </div>
            </div>
            <div className={styles.body_item}>
              <div className={styles.body_item_text}>
                <AnimateStagger>
                  <AnimateFade>
                    <p className={styles.text}>
                      Mes compétences techniques et artistiques se sont
                      façonnées aux Beaux-Arts en Belgique.
                    </p>
                  </AnimateFade>
                </AnimateStagger>
              </div>
            </div>
            <div className={styles.body_item}>
              <div className={styles.body_item_text}>
                <AnimateStagger>
                  <AnimateFade>
                    <p className={styles.text}>
                      Par la suite, ma sphère créative s&apos;est enrichie, en
                      France, d&apos;une spécialisation en design numérique.
                    </p>
                  </AnimateFade>
                </AnimateStagger>
              </div>
            </div>
            <div className={styles.body_item}>
              <div className={styles.body_item_text}>
                <AnimateStagger>
                  <AnimateFade>
                    <p className={styles.text}>
                      J&apos;ai ainsi pu explorer de nouvelles dimensions
                      visuelles.
                    </p>
                  </AnimateFade>
                </AnimateStagger>
              </div>
            </div>
            <div className={styles.body_item}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAboutOrigin;
