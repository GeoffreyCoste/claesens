'use client';

import {useEffect, useRef, useMemo} from 'react';
import {useCursor} from './useCursor';

export const useCursorElement = (elementRef, type, config) => {
  const {
    registerCursorElement,
    unregisterCursorElement,
    activateCursor,
    resetCursor
  } = useCursor();

  // Stable ID
  const elementId = useRef(Math.random().toString(36).slice(2, 11)).current;

  // Stable Config: change only if `config` really changes
  const stableConfig = useMemo(() => config, [config]);

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
