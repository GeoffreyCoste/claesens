'use client';

import styles from './style.module.scss';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenisInstance } from '@/utils/lenisInstance';
import {useLenis} from '@/hooks/useLenis';
import {IMAGES, COLS} from './data';

gsap.registerPlugin(ScrollTrigger);

const ParallaxGrid = () => {
  const gridRef = useRef(null);
  const colsRef = useRef([]);

  const {lenis} = useLenis();

  /* useEffect(() => {
      const lenis = getLenisInstance();

      // Synchronisation de Lenis avec requestAnimationFrame
      const raf = (time) => {
          lenis.raf(time);
          ScrollTrigger.update(); // Synchroniser Lenis avec GSAP
          requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);

      return () => lenis.destroy();
  }, []); */

  useEffect(() => {
    // const lenis = getLenisInstance();

    // Synchronisation avec GSAP
    lenis.on('scroll', ScrollTrigger.update);

    /* const raf = (time) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
      };
    
      requestAnimationFrame(raf);
    
      return () => lenis.destroy(); */
  }, [lenis]);

  useEffect(() => {
    const grid = gridRef.current;
    const cols = gsap.utils.toArray(colsRef.current);
    if (!grid || !cols) return;

    const mm = gsap.matchMedia();

    mm.add('(max-width: 767px)', () => {
      cols.forEach((col, index) => {
        // Décalage différent pour chaque colonne
        const speed = index % 2 === 0 ? 200 : -200;
        // const initialYOffset = (index * -20) -20 + "vh";  // Décalage unique par colonne
        let initialYOffset;
        if (index === 0 || index === 2) {
          initialYOffset = '-85vh'; // 1ère et 3ème colonne, décalage plus important
        } else {
          initialYOffset = '-25vh'; // 2ème et 4ème colonne, décalage plus petit
        }

        gsap.set(col, {y: initialYOffset}); // Décalage initial pour chaque colonne

        gsap.to(col, {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: col,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      });
    });

    mm.add('(min-width: 768px) and (max-width: 1023px)', () => {
      cols.forEach((col, index) => {
        // Décalage différent pour chaque colonne
        const speed = index % 2 === 0 ? 200 : -200;
        // const initialYOffset = (index * -20) -20 + "vh";  // Décalage unique par colonne
        let initialYOffset;
        if (index === 0 || index === 2) {
          initialYOffset = '-40vh'; // 1ère et 3ème colonne, décalage plus important
        } else {
          initialYOffset = '-15vh'; // 2ème et 4ème colonne, décalage plus petit
        }

        gsap.set(col, {y: initialYOffset}); // Décalage initial pour chaque colonne

        /* gsap.to(col, {
                  y: speed,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: col,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                  },
                }); */
      });
    });

    mm.add('(min-width: 1024px)', () => {
      cols.forEach((col, index) => {
        // Décalage différent pour chaque colonne
        const speed = index % 2 === 0 ? 100 : -100;
        // const initialYOffset = (index * -20) -20 + "vh";  // Décalage unique par colonne
        let initialYOffset;
        if (index === 0 || index === 2) {
          initialYOffset = '-175vh'; // 1ère et 3ème colonne, décalage plus important
        } else {
          initialYOffset = '-15vh'; // 2ème et 4ème colonne, décalage plus petit
        }

        gsap.set(col, {y: initialYOffset}); // Décalage initial pour chaque colonne

        gsap.to(col, {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: col,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            scroller: document.documentElement // Permet à GSAP d'écouter Lenis
          }
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={gridRef} className={styles.parallax_grid}>
      {/* {COLS.map((col, colIndex) => (
            <div key={`parallax-grid-col-${colIndex}`} ref={(el) => colsRef.current[colIndex] = el} className={styles.parallax_col}>
                {col.map((image, cardIndex) => (
                  <div key={cardIndex} className={styles.parallax_card}>
                    <Image
                      src={`/images/${image.src}`}
                      alt={image.alt}
                      width={561}
                      height={747}
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '1vw'
                      }}
                    />
                  </div>
                ))}
            </div>
          ))} */}
      {[...Array(4)].map((_, colIndex) => (
        <div
          key={`parallax-grid-col-${colIndex}`}
          className={styles.parallax_col}
          ref={(el) => (colsRef.current[colIndex] = el)}
        >
          {/* Afficher 3 à 6 cartes par colonne en fonction de l'écran */}
          {IMAGES.slice(colIndex * 3, colIndex * 3 + 3).map(
            (image, cardIndex) => (
              <div key={cardIndex} className={styles.parallax_card}>
                <Image
                  src={`/images/${image.src}`}
                  alt={image.alt}
                  width={561}
                  height={747}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1vw'
                  }}
                />
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default ParallaxGrid;