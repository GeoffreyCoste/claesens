'use client';

import styles from './style.module.scss';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import {useTransform, useScroll, motion} from 'framer-motion';

import {IMAGES} from './data';

const ParallaxGrid = () => {
  const [dimension, setDimension] = useState({width: 0, height: 0});
  const [columns, setColumns] = useState(2); // Default, mobile (2 columns)
  const [imagesPerColumn, setImagesPerColumn] = useState(6); // 6 images per column on mobile
  const [parallaxSpeeds, setParallaxSpeeds] = useState([
    1.25, 0.75, 1.25, 0.75
  ]);

  const gridRef = useRef(null);

  const {scrollYProgress} = useScroll({
    target: gridRef,
    offset: ['start end', 'end start'],
    layoutEffect: false // Use `useEffect` instead of `useLayoutEffect` to avoid glitches
  });

  const {height} = dimension;

  const y1 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * parallaxSpeeds[0]]
  );
  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * parallaxSpeeds[1]]
  );
  const y3 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * parallaxSpeeds[2]]
  );
  const y4 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * parallaxSpeeds[3]]
  );
  const yTransforms = [y1, y2, y3, y4]; // Fixed array of transformations

  useEffect(() => {
    // Reference to parentcontainer parent instead of window
    const parentContainer = gridRef.current.parentElement;

    // Function to obtain parent container dimensions
    const getParentDimensions = () => {
      if (parentContainer) {
        return {
          width: parentContainer.clientWidth,
          height: parentContainer.clientHeight
        };
      }
      return {width: 0, height: 0};
    };

    // Update initial dimensions
    setDimension(getParentDimensions());

    // Resize observator for parent container
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Update dimensions only for significant changes
        const newDimensions = {
          width: entry.contentRect.width,
          height: entry.contentRect.height
        };

        setDimension(newDimensions);

        // Update configurations subject to breakpoints
        if (newDimensions.width < 768) {
          // mobile
          setColumns(2);
          setImagesPerColumn(6);
          setParallaxSpeeds([0.6, 0.4, 0.6, 0.4]);
        } else if (newDimensions.width < 1024) {
          // tablet
          setColumns(2);
          setImagesPerColumn(6);
          setParallaxSpeeds([2, 1.5, 2, 1.5]);
        } else {
          // desktop
          setColumns(4);
          setImagesPerColumn(3);
          setParallaxSpeeds([1.25, -0.75, 1.25, -0.75]);
        }
      }
    });

    // Observe parent container
    if (parentContainer) {
      resizeObserver.observe(parentContainer);
    }

    return () => {
      if (parentContainer) {
        resizeObserver.unobserve(parentContainer);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className={styles.parallax_grid}
      style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}}
    >
      {Array.from({length: columns}, (_, colIndex) => {
        const images = IMAGES.slice(
          colIndex * imagesPerColumn,
          colIndex * imagesPerColumn + imagesPerColumn
        );
        return (
          <Column key={colIndex} images={images} y={yTransforms[colIndex]} />
        );
      })}
    </div>
  );
};

const Column = ({images, y}) => {
  return (
    <motion.div className={styles.parallax_col} style={{y}}>
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
              borderRadius: '1vw'
            }}
            loading="lazy"
          />
        </div>
      ))}
    </motion.div>
  );
};

export default ParallaxGrid;
