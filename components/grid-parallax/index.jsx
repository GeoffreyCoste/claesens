'use client';

import styles from './style.module.scss';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import {useMedia} from '@/hooks/useMedia';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {IMAGES} from './data';
import {prepareColumns} from '@/utils/prepareColumns';

gsap.registerPlugin(ScrollTrigger);

const GridParallax = () => {
  const [columns, setColumns] = useState(2);
  const [imagesPerColumn, setImagesPerColumn] = useState(6);

  const gridRef = useRef(null);
  const colsRef = useRef([]);

  const {isHydrated, matches} = useMedia();
  const {mobile, tablet, xl} = matches;

  // Gérer la configuration responsive
  useEffect(() => {
    if (!isHydrated) return; // SSR-safe

    const handleResize = () => {
      const config =
        mobile || tablet
          ? {columns: 2, imagesPerColumn: 6}
          : xl
            ? {columns: 4, imagesPerColumn: 4}
            : {columns: 4, imagesPerColumn: 3};

      setColumns(config.columns);
      setImagesPerColumn(config.imagesPerColumn);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [isHydrated, mobile, tablet, xl]);

  // Animation GSAP
  useEffect(() => {
    if (!isHydrated) return; // SSR safe

    const cols = gsap.utils.toArray(colsRef.current);
    if (!cols) return;

    const mm = gsap.matchMedia();

    mm.add('(max-width: 767px)', () => {
      cols.forEach((col, index) => {
        const speed = index % 2 === 0 ? 200 : -600;
        const initialYOffset = index === 0 || index === 2 ? '-85vh' : '-5vh';

        gsap.set(col, {y: initialYOffset});
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
        const speed = index % 2 === 0 ? 200 : -600;
        const initialYOffset = index === 0 || index === 2 ? '-85vh' : '-10vh';

        gsap.set(col, {y: initialYOffset});
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

    mm.add('(min-width: 1024px)', () => {
      cols.forEach((col, index) => {
        const speed = index % 2 === 0 ? '0' : '-50vh';
        const initialYOffset = index === 0 || index === 2 ? '-85vh' : '-5vh';

        gsap.set(col, {y: initialYOffset});
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

    return () => mm.revert();
  }, [isHydrated, columns, imagesPerColumn]);

  // Préparer les images avec la fonction utilitaire
  const preparedCols = prepareColumns(IMAGES, columns, imagesPerColumn);

  return (
    <div ref={gridRef} className={styles.parallax_grid}>
      {preparedCols.map((images, colIndex) => (
        <div
          key={`parallax-grid-col-${colIndex}`}
          ref={(el) => (colsRef.current[colIndex] = el)}
          className={styles.parallax_col}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.parallax_card}>
              <Image
                src={`/images/${image.src}`}
                alt={image.alt}
                width={561}
                height={747}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '1vw',
                  backgroundColor: image.bg === 'grey' ? '#333' : '#000'
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridParallax;
