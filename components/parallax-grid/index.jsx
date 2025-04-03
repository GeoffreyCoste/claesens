'use client';

import styles from './style.module.scss';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useTransform, useScroll, motion } from 'framer-motion';
import useMediaQueries from '@/hooks/useMediaQueries';

import { IMAGES } from './data';
import { getLenisInstance } from '@/utils/lenisInstance';

const ParallaxGrid = () => {
    const [dimension, setDimension] = useState({width: 0, height: 0});
    const [columns, setColumns] = useState(2);  // Par défaut, mobile (2 colonnes)
    const [imagesPerColumn, setImagesPerColumn] = useState(6); // 6 images par colonne sur mobile
    const [parallaxSpeeds, setParallaxSpeeds] = useState([1.25, 0.75, 1.25, 0.75]);

    const gridRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: gridRef,
        offset: ['start end', 'end start'],
        layoutEffect: false, // Use `useEffect` instead of `useLayoutEffect` to avoid glitches
    });

    const { height } = dimension;

    const {mobile, tablet} = useMediaQueries();

    // Toujours créer 4 sets de transformations pour éviter l'erreur de hooks
    // const parallaxSpeeds = [2, 3, 1.5, 2.5];
    // const parallaxSpeeds = [1.25, 0.75, 1.25, 0.75];
    const y1 = useTransform(scrollYProgress, [0, 1], [0, height * parallaxSpeeds[0]]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * parallaxSpeeds[1]]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * parallaxSpeeds[2]]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height * parallaxSpeeds[3]]);
    const yTransforms = [y1, y2, y3, y4]; // Tableau fixe de transformations

    useEffect(() => {
        const lenis = getLenisInstance();
        
        const raf = (time) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
        
        // Référence au conteneur parent plutôt qu'à window
        const parentContainer = gridRef.current.parentElement;
        
        // Fonction pour obtenir les dimensions du conteneur parent
        const getParentDimensions = () => {
          if (parentContainer) {
            return {
              width: parentContainer.clientWidth,
              height: parentContainer.clientHeight
            };
          }
          return { width: 0, height: 0 };
        };
        
        // Mise à jour initiale des dimensions
        setDimension(getParentDimensions());
        
        // Observateur de redimensement pour le conteneur parent
        const resizeObserver = new ResizeObserver((entries) => {
          for (let entry of entries) {
            // Mise à jour des dimensions uniquement lors de changements significatifs
            const newDimensions = {
              width: entry.contentRect.width,
              height: entry.contentRect.height
            };
            
            setDimension(newDimensions);
            
            // Mise à jour des configurations en fonction des breakpoints
            if (newDimensions.width < 768) { // mobile
              setColumns(2);
              setImagesPerColumn(6);
              setParallaxSpeeds([0.6, 0.4, 0.6, 0.4]);
            } else if (newDimensions.width < 1024) { // tablet
              setColumns(2);
              setImagesPerColumn(6);
              setParallaxSpeeds([2, 1.5, 2, 1.5]);
            } else { // desktop
              setColumns(4);
              setImagesPerColumn(3);
              setParallaxSpeeds([1.25, -0.75, 1.25, -0.75]);
            }
          }
        });
        
        // Observer le conteneur parent
        if (parentContainer) {
          resizeObserver.observe(parentContainer);
        }
        
        return () => {
          if (parentContainer) {
            resizeObserver.unobserve(parentContainer);
          }
          resizeObserver.disconnect();
          lenis.destroy();
        };
      }, []);

    /* useEffect(() => {
      const lenis = getLenisInstance();

      if (!mobile) {
        const raf = (time) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      };
      

      const updateLayout = () => {
        setDimension({width: window.innerWidth, height: window.innerHeight})

        if (mobile) {
            setColumns(2);
            setImagesPerColumn(6);
            // setParallaxSpeeds([1, 0.5, 1, 0.5]);
            setParallaxSpeeds([1.5, -0.75, 1.5, -0.75]);
        } else if (tablet) {
            setColumns(2);
            setImagesPerColumn(6);
            setParallaxSpeeds([2, 1.5, 2, 1.5]);
        } else {
            setColumns(4);
            setImagesPerColumn(3);
            setParallaxSpeeds([1.25, -0.75, 1.25, -0.75]);
        }
      };

      window.addEventListener('resize', updateLayout);
      // requestAnimationFrame(raf);
      updateLayout();

      return () => {
        window.removeEventListener('resize', updateLayout);
        lenis.destroy();
        };
    }, [mobile, tablet]); */

    return (
        <div ref={gridRef} className={styles.parallax_grid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }, (_, colIndex) => {
                const images = IMAGES.slice(colIndex * imagesPerColumn, colIndex * imagesPerColumn + imagesPerColumn);
                return <Column key={colIndex} images={images} y={yTransforms[colIndex]} />;
            })}
        </div>
    );
};

const Column = ({ images, y }) => {
    return (
        <motion.div 
            className={styles.parallax_col} 
            style={{ y }}
            /* initial={false}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 50,
              restDelta: 0.001 
            }} */
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
                        }}
                        loading="lazy"
                    />
                </div>
            ))}
        </motion.div>
    );
};

export default ParallaxGrid;











/* useEffect(() => {
      const lenis = getLenisInstance();

      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      const resize = () => {
        setDimension({width: window.innerWidth, height: window.innerHeight})
      };


      window.addEventListener("resize", resize);
      requestAnimationFrame(raf);
      resize();

      return () => window.removeEventListener('resize', resize);
    }, []); */

    /* useEffect(() => {
        const updateLayout = () => {
            const width = window.innerWidth;

            if (width < BREAKPOINTS.mobile) {
                setColumns(2);
                setImagesPerColumn(6);
            } else if (width < BREAKPOINTS.tablet) {
                setColumns(3);
                setImagesPerColumn(4);
            } else {
                setColumns(4);
                setImagesPerColumn(3);
            }
        };

        window.addEventListener('resize', updateLayout);
        updateLayout();

        return () => window.removeEventListener('resize', updateLayout);
    }, []); */

    // Toujours créer 4 sets de transformations pour éviter l'erreur de hooks
    // const parallaxSpeeds = [2, 3, 1.5, 2.5];
    // const y1 = useTransform(scrollYProgress, [0, 1], [0, window.innerHeight * parallaxSpeeds[0]]);
    // const y2 = useTransform(scrollYProgress, [0, 1], [0, window.innerHeight * parallaxSpeeds[1]]);
    // const y3 = useTransform(scrollYProgress, [0, 1], [0, window.innerHeight * parallaxSpeeds[2]]);
    // const y4 = useTransform(scrollYProgress, [0, 1], [0, window.innerHeight * parallaxSpeeds[3]]);
    // const yTransforms = [y1, y2, y3, y4]; // Tableau fixe de transformations







/* 'use client';

import styles from './style.module.scss';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useTransform, useScroll, motion } from 'framer-motion';
import { getLenisInstance } from '@/utils/lenisInstance';
import { IMAGES, COLS } from './data';

const ParallaxGrid = () => {
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    const gridRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: gridRef,
        offset: ['start end', 'end start'],
    });

    const { height } = dimension;

    // Définir des vitesses différentes pour chaque colonne
    const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.5]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 2.5]);

    useEffect(() => {
        const lenis = getLenisInstance();

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        const resize = () => {
            setDimension({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', resize);
        requestAnimationFrame(raf);
        resize();

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
      <div ref={gridRef} className={styles.parallax_grid}>
          <Column images={IMAGES.slice(0, 3)} y={y1} />
          <Column images={IMAGES.slice(3, 6)} y={y2} />
          <Column images={IMAGES.slice(6, 9)} y={y3} />
          <Column images={IMAGES.slice(9, 12)} y={y4} />
      </div>
    )
};

const Column = ({ images, y }) => {
  return (
      <motion.div className={styles.parallax_col} style={{ y }}>
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
                      }}
                  />
              </div>
          ))}
      </motion.div>
  );
};

export default ParallaxGrid; */