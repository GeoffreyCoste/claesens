'use client';

import styles from './style.module.scss';
import {useState, useEffect, useRef} from 'react';
import {useTransform, useScroll} from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import Column from './column';
import {IMAGES} from './data';

const Gallery = () => {
  const [dimension, setDimension] = useState({width: 0, height: 0});
  const [columns, setColumns] = useState([]);
  const galleryRef = useRef(null);

  const {scrollYProgress} = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start']
  });

  const {height} = dimension;
  // Define transformations per columns
  const y0 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
  const yTransform = [y0, y1, y2, y3];

  useEffect(() => {
    /* const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }; */

    const resize = () => {
      setDimension({width: window.innerWidth, height: window.innerHeight});
    };

    window.addEventListener('resize', resize);
    // requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

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