'use client';

import styles from './style.module.scss';
import {useState, useRef, useEffect, useCallback} from 'react';

const CanvasDots = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mousePos = useRef({x: 0, y: 0});

  const updateDimensions = useCallback(() => {
    const container = containerRef.current;

    if (container) {
      setWidth(container.clientWidth);
      setHeight(container.clientHeight);
    }
  }, []);

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const gridSize = 20; // Setting grid cells size
    const pointSize = 2; // Initial point size
    const hoverRadius = 100; // Hover radius

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let x = gridSize / 2; x < canvas.width; x += gridSize) {
      for (let y = gridSize / 2; y < canvas.height; y += gridSize) {
        const distance = Math.sqrt(
          (x - mousePos.current.x) ** 2 + (y - mousePos.current.y) ** 2
        );
        let radius = pointSize; // Initial point size

        // If point is hovered, adjust its size due to its distance
        if (distance < hoverRadius) {
          radius += ((hoverRadius - distance) / hoverRadius) * 5; // Scale factor
        }

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
    }
  }, []);

  useEffect(() => {
    updateDimensions();

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateDimensions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;

    const handleMouseMove = (event) => {
      mousePos.current = getMousePos(canvas, event);
      requestAnimationFrame(drawGrid);
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    drawGrid();
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, [width, height, drawGrid]);

  const getMousePos = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  return (
    <div ref={containerRef} className={styles.canvas_dots}>
      <canvas ref={canvasRef} className={styles.canvas}>
        <div>Dots Canvas</div>
      </canvas>
    </div>
  );
};

export default CanvasDots;
