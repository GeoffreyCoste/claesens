'use client';

import styles from './style.module.scss';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, animate, transform, useMotionValue } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useSideMenu } from '@/hooks/useSideMenu';
import { useCursor } from '@/hooks/useCursor';
import {useMedia} from '@/hooks/useMedia';

const CursorCustom = ({stickyElementRefs = []}) => {
  const cursorRef = useRef(null);
  const {x, y, setOffset} = useMousePosition();
  const {activeCursor} = useCursor();
  const {isSideMenuOpen} = useSideMenu();
  const {isHydrated, matches} = useMedia();
  const {desktop} = matches;
  const isActive = activeCursor === 'new' && desktop;

  const [isHovered, setIsHovered] = useState(false);
  const scale = {x: useMotionValue(1), y: useMotionValue(1)};
  const cursorSize = isHovered ? 60 : 15;

  const onMouseMove = useCallback(
    (e) => {
      const {clientX, clientY} = e;

      if (!desktop) return;

      const activeSticky = stickyElementRefs.find(
        (r) => r.current && r.current.matches(':hover')
      );

      if (activeSticky?.current && isHovered) {
        const rect = activeSticky.current.getBoundingClientRect();
        const center = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };

        const distance = {x: clientX - center.x, y: clientY - center.y};
        const absDistance = Math.max(
          Math.abs(distance.x),
          Math.abs(distance.y)
        );

        scale.x.set(transform(absDistance, [0, rect.height / 2], [1, 1.3]));
        scale.y.set(transform(absDistance, [0, rect.width / 2], [1, 0.8]));

        x.set(center.x - cursorSize / 2 + distance.x * 0.1);
        y.set(center.y - cursorSize / 2 + distance.y * 0.1);
      } else {
        setOffset(cursorSize / 2, cursorSize / 2);
        x.set(clientX - cursorSize / 2);
        y.set(clientY - cursorSize / 2);
      }
    },
    [
      desktop,
      cursorSize,
      isHovered,
      scale.x,
      scale.y,
      setOffset,
      stickyElementRefs,
      x,
      y
    ]
  );

  const onMouseHover = () => setIsHovered(true);
  const onMouseLeave = () => {
    setIsHovered(false);
    if (cursorRef.current)
      animate(cursorRef.current, {scaleX: 1, scaleY: 1}, {duration: 0.1});
  };

  useEffect(() => {
    if (!desktop) return;

    stickyElementRefs.forEach((r) => {
      r.current?.addEventListener('mouseover', onMouseHover);
      r.current?.addEventListener('mouseleave', onMouseLeave);
    });
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      stickyElementRefs.forEach((r) => {
        r.current?.removeEventListener('mouseover', onMouseHover);
        r.current?.removeEventListener('mouseleave', onMouseLeave);
      });
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [desktop, stickyElementRefs, isHovered, onMouseMove]);

  if (!isHydrated || !isActive) return null;

  return (
    <motion.div
      ref={cursorRef}
      className={`${styles.cursor} ${isSideMenuOpen ? styles.cursor_white : styles.cursor_black}`}
      style={{translateX: x, translateY: y, scaleX: scale.x, scaleY: scale.y}}
      initial={{opacity: 0}}
      animate={{opacity: 1, width: cursorSize, height: cursorSize}}
      exit={{opacity: 0}}
      transition={{duration: 0.3}}
    />
  );
};

export default CursorCustom;