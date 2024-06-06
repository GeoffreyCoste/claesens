'use client';

import {useState, useEffect} from 'react';
import {motion, animate, useMotionValue, useTransform} from 'framer-motion';
import {interpolate} from 'flubber';

const PathMotion = ({paths, isInView}) => {
  const [pathIndex, setPathIndex] = useState(0);
  const progress = useMotionValue(pathIndex);
  const [startAnimate, setStartAnimate] = useState(false);

  const arrayOfIndex = paths.map((_, i) => i);
  const path = useTransform(progress, arrayOfIndex, paths, {
    mixer: (a, b) => interpolate(a, b, {maxSegmentLength: 1})
  });

  useEffect(() => {
    if (isInView && !startAnimate) {
      const animation = animate(progress, pathIndex, {
        duration: 0.4,
        ease: 'easeInOut',
        delay: 0.5,
        onComplete: () => {
          if (pathIndex === paths.length - 1) {
            setStartAnimate(true);
          } else {
            setPathIndex(pathIndex + 1);
          }
        }
      });

      return () => {
        animation.stop();
      };
    }
  }, [isInView, pathIndex, startAnimate, paths.length, progress]);

  return <motion.path fill="#fce300" d={path} />;
};

export default PathMotion;
