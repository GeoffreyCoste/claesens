'use client';

import styles from './style.module.scss';
import {useRef} from 'react';
import {useScroll} from 'framer-motion';
import useMediaQueries from '@/hooks/useMediaQueries';
import {services} from '../section-services-intro/data';
import Card from '../card';

const ScrollOverlap = () => {
  const containerRef = useRef(null);

  const {desktop} = useMediaQueries();

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Not necessary because initiated inside Header component
  /* useEffect( () => {
        const lenis = new Lenis()
    
        function raf(time) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
    
        requestAnimationFrame(raf)
    }); */

  return (
    <div ref={containerRef} className={styles.overlap_container}>
      {services.map((service, index) => {
        const targetScale = 1 - (services.length - index) * 0.05;
        return (
          <Card
            key={`s_${index}`}
            index={index}
            {...service}
            progress={desktop ? scrollYProgress : null}
            range={desktop ? [index * 0.25, 1] : [0, 1]}
            targetScale={desktop ? targetScale : 1}
          />
        );
      })}
    </div>
  );
};

export default ScrollOverlap;
