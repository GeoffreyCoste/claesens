'use client';

import styles from './style.module.scss';
import { useState, useRef, useEffect } from 'react';

const DraggableCircle = ({containerRef}) => {
  const circleRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const startPosition = useRef({ x: 0, y: 0 });

  // Center circle on first load
  useEffect(() => {
    const container = containerRef?.current;
    const circle = circleRef.current;
    if (!container || !circle) return;

    const containerRect = container.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();

    setPosition({
      x: (containerRect.width - circleRect.width) / 2,
      y: (containerRect.height - circleRect.height) / 2,
    });
  }, [containerRef]);

  // Manage drag events
  useEffect(() => {
    const circle = circleRef.current;
    const container = containerRef?.current;
    if (!circle || !container) return;

    const containerRect = container.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      dragging.current = true;

      startPosition.current = {
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      };
    };

    const handleTouchMove = (e) => {
      if (!dragging.current) return;
      e.preventDefault();
      const touch = e.touches[0];

      let newX = touch.clientX - startPosition.current.x;
      let newY = touch.clientY - startPosition.current.y;

      // Empêcher la sortie du conteneur
      newX = Math.max(0, Math.min(newX, containerRect.width - circleRect.width));
      newY = Math.max(0, Math.min(newY, containerRect.height - circleRect.height));

      setPosition({ x: newX, y: newY });
    };

    const handleTouchEnd = () => {
      dragging.current = false;
    };

    circle.addEventListener('touchstart', handleTouchStart);
    circle.addEventListener('touchmove', handleTouchMove);
    circle.addEventListener('touchend', handleTouchEnd);

    return () => {
      circle.removeEventListener('touchstart', handleTouchStart);
      circle.removeEventListener('touchmove', handleTouchMove);
      circle.removeEventListener('touchend', handleTouchEnd);
    };
  }, [position, dragging, containerRef]);

  return (
    <div className={styles.draggable_circle}>
        <div className={styles.svg_filter}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <defs>
                <filter id="noiseEffect" filterUnits="objectBoundingBox" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="1" seed="1" stitchTiles="stitch" result="particle"></feTurbulence>
                  <feDisplacementMap scale="110.1" in="SourceGraphic" in2="particle" xChannelSelector="R" yChannelSelector="G">

                  </feDisplacementMap></filter>
              </defs>
            </svg>
        </div>
        <div 
          ref={circleRef}
          className={styles.circle}
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        ></div>
    </div>
  )
}

export default DraggableCircle;