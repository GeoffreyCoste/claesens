'use client';

import styles from './style.module.scss';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useCursor } from '@/hooks/useCursor';
import { useMedia } from '@/hooks/useMedia';

const CursorMask = ({ maskElementRefs = [] }) => {
  const { mousePos } = useMousePosition();
  const { activeCursor, showCursor } = useCursor();
  const { isHydrated, matches } = useMedia();
  const { desktop } = matches;

  const [isHovered, setIsHovered] = useState(false);
  const [maskContent, setMaskContent] = useState(null);
  const [overlapPosition, setOverlapPosition] = useState(null);
  const overlapRef = useRef(null);
  const size = isHovered ? 400 : 15;

  const isActive = isHydrated && desktop && activeCursor === 'mask';

  const memoMaskElementRefs = useMemo(() => maskElementRefs, [maskElementRefs]);

  const updateOverlapPosition = useCallback((ref) => {
    if (!ref.current) return null;
    const rect = ref.current.getBoundingClientRect();
    return { top: rect.top, left: rect.left, width: rect.width, height: rect.height, pointerEvents: 'none' };
  }, []);

  useEffect(() => {
    if (!isActive || !memoMaskElementRefs.length) return;

    const handleMouseLeave = () => {
      setIsHovered(false);
      setMaskContent(null);
      setOverlapPosition(null);
      showCursor('new');
    };

    const rafRefs = new Map();

    const handlers = memoMaskElementRefs.map(({ ref, content, shouldOverlap }) => {
      const handleMouseEnter = () => {
        setIsHovered(true);
        setMaskContent(content);

        if (shouldOverlap) {
          const update = () => {
            setOverlapPosition(updateOverlapPosition(ref));
            rafRefs.set(ref, requestAnimationFrame(update));
          };
          update();

          const cleanup = () => {
            cancelAnimationFrame(rafRefs.get(ref));
            rafRefs.delete(ref);
          };

          window.addEventListener('resize', update);
          window.addEventListener('scroll', update, true);

          ref.current.cleanup = cleanup;
        } else {
          setOverlapPosition(null);
        }
      };

      ref.current?.addEventListener('mouseenter', handleMouseEnter);
      ref.current?.addEventListener('mouseleave', handleMouseLeave);

      return { ref, handleMouseEnter };
    });

    return () => {
      handlers.forEach(({ ref, handleMouseEnter }) => {
        ref.current?.removeEventListener('mouseenter', handleMouseEnter);
        ref.current?.removeEventListener('mouseleave', handleMouseLeave);
        if (ref.current?.cleanup) ref.current.cleanup();
      });
    };
  }, [isActive, memoMaskElementRefs, showCursor, updateOverlapPosition]);

  if (!isActive) return null;

  return (
    <motion.div
      className={styles.cursor_mask}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        WebkitMaskPosition: `${mousePos.x - size / 2}px ${mousePos.y - size / 2}px`,
        WebkitMaskSize: `${size}px`,
      }}
      exit={{ opacity: 0 }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
    >
      <div className={styles.mask_content} style={overlapPosition || {}}>
        {maskContent}
      </div>
    </motion.div>
  );
};

export default CursorMask;


/* 'use client';

import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useCursor } from '@/hooks/useCursor';
import {useMedia} from '@/hooks/useMedia';

const CursorMask = ({maskElementRefs = []}) => {
  const {mousePos} = useMousePosition();
  const {activeCursor, showCursor} = useCursor();
  const {isHydrated, matches} = useMedia();
  const {desktop} = matches;
  const [isHovered, setIsHovered] = useState(false);
  const [maskContent, setMaskContent] = useState(null);
  const [overlapPosition, setOverlapPosition] = useState(null);
  const size = isHovered ? 400 : 15;

  const isActive = activeCursor === 'mask' && desktop;

  useEffect(() => {
    if (!desktop) return;

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
  }, [desktop, maskElementRefs, showCursor]);

  // Make component disappear from DOM when not active
  if (!isHydrated || !isActive) return null;

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

export default CursorMask; */
