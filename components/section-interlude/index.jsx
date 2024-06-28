'use client';

import styles from './style.module.scss';
import {useState, useEffect, useRef, useCallback} from 'react';
import DotsCanvas from '../dots-canvas';

const SectionInterlude = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const containerRef = useRef(null);

  const updateDimensions = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      setWidth(container.clientWidth);
      setHeight(container.clientHeight);
    }
  }, []);

  useEffect(() => {
    updateDimensions();

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateDimensions]);

  return (
    <section className={styles.section_interlude}>
      <div ref={containerRef} className={styles.section_interlude_container}>
        <DotsCanvas width={width} height={height} />
      </div>
    </section>
  );
};

export default SectionInterlude;
