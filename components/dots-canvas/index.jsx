import styles from './style.module.scss';
import {useEffect, useRef, useCallback} from 'react';

const DotsCanvas = ({width, height}) => {
  const canvasRef = useRef(null);
  const mousePos = useRef({x: 0, y: 0});

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
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
        ctx.fillStyle = '#FFF8B5';
        ctx.fill();
      }
    }
  }, []);

  const getMousePos = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    const handleMouseMove = (event) => {
      mousePos.current = getMousePos(canvas, event);
      requestAnimationFrame(drawGrid);
    };

    const handleResize = () => {
      canvas.width = width;
      canvas.height = height;
      requestAnimationFrame(drawGrid);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    drawGrid();

    // Cleanup function to remove event listeners
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [width, height, drawGrid]);

  return (
    <canvas ref={canvasRef} className={styles.canvas}>
      <div>Dots Canvas</div>
    </canvas>
  );
};

export default DotsCanvas;
