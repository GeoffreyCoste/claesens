'use client';

import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useCursor } from '@/hooks/useCursor';

const CursorMask = ({ maskElementRefs = [] }) => {
  const { mousePos } = useMousePosition();
  const { activeCursor, showCursor } = useCursor();
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
      showCursor("mask");

      if (shouldOverlap) {
        const updatePosition = () => {
          if (!ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          const {top, left, width, height} = rect;
          setOverlapPosition({
            // position: 'absolute',
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

        // Nettoyage lors du mouseleave
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
      showCursor("new");
    };

    /* const handlers = maskElementRefs.map(({ ref, content, shouldOverlap }) => {
      if (!ref.current) return null;
      ref.current.addEventListener('mouseenter', handleMouseEnter(ref, content, shouldOverlap));
      ref.current.addEventListener('mouseleave', handleMouseLeave);
      return { ref, handleMouseEnter: handleMouseEnter(content), handleMouseLeave };
    });

    return () => {
      handlers.forEach((h) => {
        if (!h || !h.ref.current) return;
        h.ref.current.removeEventListener('mouseenter', h.handleMouseEnter);
        h.ref.current.removeEventListener('mouseleave', h.handleMouseLeave);
      });
    }; */

    const handlers = maskElementRefs
      .filter(({ ref }) => ref?.current) // Keep only valid refs
      .map(({ ref, content, shouldOverlap }) => {
        const enterHandler = handleMouseEnter(ref, content, shouldOverlap);
        ref.current.addEventListener("mouseenter", enterHandler);
        ref.current.addEventListener("mouseleave", handleMouseLeave);

        return { ref, enterHandler };
      });

    return () => {
      handlers.forEach((h) => {
        if (!h?.ref?.current) return;
        h.ref.current.removeEventListener("mouseenter", h.enterHandler);
        h.ref.current.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [maskElementRefs, showCursor]);

  // Make component disappear from DOM when not active
  if (!isActive) return null;

  return (
    <motion.div
      className={styles.cursor_mask}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        // maskPosition: `${mousePos.x - size / 2}px ${mousePos.y - size / 2}px`,
        // maskSize: `${size}px`,
        WebkitMaskPosition: `${mousePos.x - size / 2}px ${mousePos.y - size / 2}px`,
        WebkitMaskSize: `${size}px`,
      }}
      exit={{ opacity: 0 }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
    >
      <div className={styles.mask_content} style={overlapPosition || {}}>{maskContent}</div>
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

const CursorMask = ({ maskElementRefs = [] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [maskContent, setMaskContent] = useState(null);
  const { mousePos } = useMousePosition(); // on utilise pos pour avoir des numbers
  const size = isHovered ? 400 : 15;

  const { activeCursor, showCursor, hideCursor } = useCursor();
  const isActive = activeCursor === 'mask';

  useEffect(() => {
    const handleMouseEnter = (content) => () => {
      setIsHovered(true);
      setMaskContent(content);
    };
    const handleMouseLeave = () => {
      setIsHovered(false);
      setMaskContent(null);
    };

    const handlers = maskElementRefs.map(({ ref, content }) => {
      if (!ref.current) return null;
      ref.current.addEventListener('mouseenter', handleMouseEnter(content));
      ref.current.addEventListener('mouseleave', handleMouseLeave);
      return { ref, handleMouseEnter: handleMouseEnter(content), handleMouseLeave };
    });

    return () => {
      handlers.forEach((h) => {
        if (!h || !h.ref.current) return;
        h.ref.current.removeEventListener('mouseenter', h.handleMouseEnter);
        h.ref.current.removeEventListener('mouseleave', h.handleMouseLeave);
      });
    };
  }, [maskElementRefs]);

  return isActive ? (
    <motion.div
      className={styles.cursor_mask}
      initial={{ opacity: 0}}
      animate={{
        opacity: 1,
        maskPosition: `${mousePos.x - size / 2}px ${mousePos.y - size / 2}px`,
        maskSize: `${size}px`,
        WebkitMaskPosition: `${mousePos.x - size / 2}px ${mousePos.y - size / 2}px`,
        WebkitMaskSize: `${size}px`,
      }}
      exit={{opacity: 0}}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.3 }}
    >
      <div className={styles.mask_content}>{maskContent}</div>
    </motion.div>
  ) : null;
};

export default CursorMask; */




/* 'use client';

import styles from './style.module.scss';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

const CursorMask = ({maskElementRefs = []}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [maskContent, setMaskContent] = useState(null);
    const {x, y} = useMousePosition();
    const size = isHovered ? 400 : 15;

    const cursorRef = useRef(null);

    /* const onMouseHover = (content) => {
        setIsHovered(true);
        setMaskContent(content);
    };

    const onMouseLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        maskElementRefs.forEach(({ref, content}) => {
            ref.current?.addEventListener('mouseover', onMouseHover(content));
            ref.current?.addEventListener('mouseleave', onMouseLeave);
        });
        return () => {
            maskElementRefs.forEach(({ref}) => {
                ref.current?.removeEventListener('mouseover', onMouseHover);
                ref.current?.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, [maskElementRefs, isHovered]); *

      useEffect(() => {
        const handleMouseEnter = (content) => () => {
        setIsHovered(true);
        setMaskContent(content);
        };

        const handleMouseLeave = () => {
        setIsHovered(false);
        setMaskContent(null);
        };

        const handlers = maskElementRefs.map(({ ref, content }) => {
        if (!ref.current) return null;
        ref.current.addEventListener('mouseenter', handleMouseEnter(content));
        ref.current.addEventListener('mouseleave', handleMouseLeave);
        return { ref, handleMouseEnter: handleMouseEnter(content), handleMouseLeave };
        });

        return () => {
        handlers.forEach((h) => {
            if (!h || !h.ref.current) return;
            h.ref.current.removeEventListener('mouseenter', h.handleMouseEnter);
            h.ref.current.removeEventListener('mouseleave', h.handleMouseLeave);
        });
        };
    }, [maskElementRefs]);


    return (
        <motion.div 
        ref={cursorRef}
          className={styles.cursor_mask} 
          animate={{
            maskPosition: `${x.get() - size / 2}px ${y.get() - size / 2}px`,
            maskSize: `${size}px`,
            WebkitMaskPosition: `${x.get() - (size/2)}px ${y.get() - (size/2)}px`,
            WebkitMaskSize: `${size}px`,
          }}
          transition={{ type: "tween", ease: "backOut", duration:0.5}}
        >
          <div 
            className={styles.mask_content} 
            /* style={{
              top: h2Pos.top,
              left: h2Pos.left,
              width: h2Pos.width,
              height: h2Pos.height
            }} *
          >
            {maskContent}
          </div>
        </motion.div>
    )
}

export default CursorMask; */