/* ChatGPT */
'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useCursor } from './useCursor';

export const useCursorElement = (elementRef, type, config) => {
  const {
    registerCursorElement,
    unregisterCursorElement,
    activateCursor,
    resetCursor
  } = useCursor();

  // ID stable
  const elementId = useRef(Math.random().toString(36).slice(2, 11)).current;

  // Config stabilisée : change uniquement si `config` change vraiment
  const stableConfig = useMemo(() => config, [config]);
  /* const stableConfig = useMemo(() => config || {}, [config]); */

  useEffect(() => {
    const element = elementRef?.current;
    if (!element) return;

    registerCursorElement(elementId, element, type, stableConfig);

    const handleMouseEnter = () => {
      activateCursor(type, elementId, stableConfig);
    };

    const handleMouseLeave = () => {
      resetCursor();
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      unregisterCursorElement(elementId);
    };
  }, [
    elementRef,
    type,
    elementId,
    stableConfig,
    registerCursorElement,
    unregisterCursorElement,
    activateCursor,
    resetCursor
  ]);

  return elementId;
};



/* Claude IA */

/* 'use client';

import { useEffect, useRef } from 'react';
import { useCursor } from './useCursor';

export const useCursorElement = (elementRef, type, config = {}) => {
  const { registerCursorElement, unregisterCursorElement, activateCursor, resetCursor } = useCursor();
  const elementId = useRef(Math.random().toString(36).substr(2, 9)).current;

  useEffect(() => {
    if (!elementRef.current) return;

    // Enregistrement de l'élément
    registerCursorElement(elementId, elementRef.current, type, config);

    const handleMouseEnter = () => {
      activateCursor(type, elementId, config);
    };

    const handleMouseLeave = () => {
      resetCursor();
    };

    const element = elementRef.current;
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      unregisterCursorElement(elementId);
    };
  }, [elementRef, type, config, registerCursorElement, unregisterCursorElement, activateCursor, resetCursor, elementId]);

  return elementId;
};
 */