'use client';

import styles from './style.module.scss';
import {useRef} from 'react';
import {useScroll} from 'framer-motion';
import {useMedia} from '@/hooks/useMedia';
import {services} from '../section-services-intro/data';
import Card from '../card';

const ScrollOverlap = () => {
  const containerRef = useRef(null);

  const {isHydrated, matches} = useMedia();
  const {desktop} = matches;

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={containerRef} className={styles.overlap_container}>
      {services.map((service, index) => {
        const targetScale = 1 - (services.length - index) * 0.05;
        return (
          <Card
            key={`s_${index}`}
            index={index}
            {...service}
            progress={isHydrated && desktop ? scrollYProgress : null}
            range={desktop ? [index * 0.25, 1] : [0, 1]}
            targetScale={desktop ? targetScale : 1}
          />
        );
      })}
    </div>
  );
};

export default ScrollOverlap;
