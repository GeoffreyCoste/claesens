'use client';

import styles from './style.module.scss';
import {useState, useEffect, useRef} from 'react';
import {useTransform, useScroll} from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import useMediaQueries from '@/hooks/useMediaQueries';
import {pickRandom} from '@/utils/pickRandom';
import Column from './column';
import {IMAGES} from './data';

const Gallery = () => {
  const [dimension, setDimension] = useState({width: 0, height: 0});
  const [selectedImages, setSelectedImages] = useState([]);
  const [columns, setColumns] = useState([]);
  const galleryRef = useRef(null);

  const {scrollYProgress} = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start']
  });

  const {mobile, tablet, desktop} = useMediaQueries();

  const {height} = dimension;
  // Define transformations per columns
  const y0 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
  const yTransform = [y0, y1, y2, y3];

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({width: window.innerWidth, height: window.innerHeight});
    };

    window.addEventListener('resize', resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* useEffect(() => {
    // Select 6, 9 or all images subject to screen size
    let images;
    if (mobile) {
      images = pickRandom(IMAGES, 10);
    } else if (tablet) {
      images = pickRandom(IMAGES, 9);
    } else {
      images = [...IMAGES]; // Use all IMAGES for desktop
    }

    setSelectedImages(images);

    // Divide images into 2 columns for mobile and 3 columns for other devices
    const columns = [];
    if (mobile) {
      columns.push(images.slice(0, 5));
      columns.push(images.slice(5, 10));
    } else {
      for (let i = 0; i < images.length; i += 3) {
        columns.push(images.slice(i, i + 3));
      }
    }

    setColumns(columns);
  }, [mobile, tablet]); */

  useEffect(() => {
    let columns = [];
    for (let i = 0; i < IMAGES.length; i += 3) {
      columns.push(IMAGES.slice(i, i + 3));
    }
    setColumns(columns);
  }, []);

  return (
    <div ref={galleryRef} className={styles.gallery}>
      {columns.map((column, index) => (
        <Column key={index} images={column} y={yTransform[index]} />
      ))}
    </div>
  );
};

export default Gallery;

/* 'use client';

import styles from './style.module.scss';
import {useState, useEffect, useRef} from 'react';
import {useTransform, useScroll} from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import useMediaQueries from '@/hooks/useMediaQueries';
import {pickRandom} from '@/utils/pickRandom';
import Column from './column';
import {IMAGES} from './data';

const Gallery = () => {
  const [dimension, setDimension] = useState({width: 0, height: 0});
  const [selectedImages, setSelectedImages] = useState([]);
  const [columns, setColumns] = useState([]);
  const galleryRef = useRef(null);

  const {scrollYProgress} = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start']
  });

  const {mobile, tablet, desktop} = useMediaQueries();

  const {height} = dimension;
  // Define transformations per columns
  const y0 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
  const yTransform = [y0, y1, y2, y3];

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({width: window.innerWidth, height: window.innerHeight});
    };

    window.addEventListener('resize', resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    // Select 6, 9 or all images subject to screen size
    let images;
    if (mobile) {
      images = pickRandom(IMAGES, 6);
    } else if (tablet) {
      images = pickRandom(IMAGES, 9);
    } else {
      images = [...IMAGES]; // Use all IMAGES for desktop
    }

    setSelectedImages(images);

    // Divide images into groups of 3 per columns
    const columns = [];
    for (let i = 0; i < images.length; i += 3) {
      columns.push(images.slice(i, i + 3));
    }

    setColumns(columns);
  }, [mobile, tablet]);

  return (
    <div ref={galleryRef} className={styles.gallery}>
      {columns.map((column, index) => (
        <Column key={index} images={column} y={yTransform[index]} />
      ))}
    </div>
  );
};

export default Gallery; */
