'use client';

import styles from './style.module.scss';
import {useState, useEffect, useRef, useCallback} from 'react';
import {Bricolage_Grotesque} from 'next/font/google';
import DotsCanvas from '../dots-canvas';

const bricolage_grotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin']
});

const InterludeSection = () => {
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
    <section className={styles.interlude_section}>
      <div ref={containerRef} className={styles.interlude_section_container}>
        <DotsCanvas width={width} height={height} />
      </div>
    </section>
  );
};

export default InterludeSection;
