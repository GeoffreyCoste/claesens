'use client';

import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useCursor } from '@/hooks/useCursor';

const CursorMask = ({maskElementRefs = []}) => {
  const {mousePos} = useMousePosition();
  const {activeCursor, showCursor} = useCursor();
  const [isHovered, setIsHovered] = useState(false);
  const [maskContent, setMaskContent] = useState(null);
  const [overlapPosition, setOverlapPosition] = useState(null);
  const size = isHovered ? 400 : 15;

  const isActive = activeCursor === 'mask';

  useEffect(() => {
    const handleMouseEnter = (ref, content, shouldOverlap) => () => {
      if (!ref?.current) return;

      setIsHovered(true);
      setMaskContent(content);
      showCursor('mask');

      if (shouldOverlap) {
        const updatePosition = () => {
          if (!ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          const {top, left, width, height} = rect;
          setOverlapPosition({
            top: top,
            left: left,
            width: width,
            height: height,
            pointerEvents: 'none'
          });
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        // Cleanup on mouseleave
        return () => {
          window.removeEventListener('resize', updatePosition);
          window.removeEventListener('scroll', updatePosition, true);
        };
      } else {
        setOverlapPosition(null);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setMaskContent(null);
      showCursor('new');
    };

    const handlers = maskElementRefs
      .filter(({ref}) => ref?.current) // Keep only valid refs
      .map(({ref, content, shouldOverlap}) => {
        const enterHandler = handleMouseEnter(ref, content, shouldOverlap);
        ref.current.addEventListener('mouseenter', enterHandler);
        ref.current.addEventListener('mouseleave', handleMouseLeave);

        return {ref, enterHandler};
      });

    return () => {
      handlers.forEach((h) => {
        if (!h?.ref?.current) return;
        h.ref.current.removeEventListener('mouseenter', h.enterHandler);
        h.ref.current.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [maskElementRefs, showCursor]);

  // Make component disappear from DOM when not active
  if (!isActive) return null;

  return (
    <motion.div
      className={styles.cursor_mask}
      initial={{opacity: 0}}
      animate={{
        opacity: 1,
        WebkitMaskPosition: `${mousePos.x - size / 2}px ${mousePos.y - size / 2}px`,
        WebkitMaskSize: `${size}px`
      }}
      exit={{opacity: 0}}
      transition={{type: 'tween', ease: 'backOut', duration: 0.5}}
    >
      <div className={styles.mask_content} style={overlapPosition || {}}>
        {maskContent}
      </div>
    </motion.div>
  );
};

export default CursorMask;
