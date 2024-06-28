import styles from './style.module.scss';
import {useState, useEffect, useRef, useCallback} from 'react';
import {motion, animate, transform, useMotionValue} from 'framer-motion';
import {useSideMenu} from '@/hooks/useSideMenu';

const CursorSticky = ({stickyElement}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef(null);
  const cursorSize = isHovered ? 60 : 15;

  const {isOpen} = useSideMenu();

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  const scale = {
    x: useMotionValue(1),
    y: useMotionValue(1)
  };

  const rotate = (distance) => {
    const angle = Math.atan2(distance.y, distance.x);
    animate(cursorRef.current, {rotate: `${angle}rad`}, {duration: 0});
  };

  const onMouseMove = useCallback(
    (e) => {
      const {clientX, clientY} = e;
      const {left, top, width, height} =
        stickyElement.current.getBoundingClientRect();

      // Center position of the stickyElement
      const center = {x: left + width / 2, y: top + height / 2};

      if (isHovered) {
        // Distance between the mouse pointer and the center of the custom cursor and
        const distance = {x: clientX - center.x, y: clientY - center.y};

        // Rotate
        rotate(distance);

        // Stretch based on the absolute distance calculated (i.e. no negative value)
        const absDistance = Math.max(
          Math.abs(distance.x),
          Math.abs(distance.y)
        );
        const newScaleX = transform(absDistance, [0, height / 2], [1, 1.3]);
        const newScaleY = transform(absDistance, [0, width / 2], [1, 0.8]);
        scale.x.set(newScaleX);
        scale.y.set(newScaleY);

        // Move mouse to center of stickyElement + slightly move it towards the mouse pointer
        mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.1);
        mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.1);
      } else {
        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);
      }
    },
    [mouse.x, mouse.y, cursorSize, stickyElement, isHovered, scale.x, scale.y]
  );

  const onMouseHover = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    if (cursorRef.current) {
      animate(
        cursorRef.current,
        {scaleX: 1, scaleY: 1},
        {duration: 0.1},
        {type: 'spring'}
      );
    }
  };

  useEffect(() => {
    const currentStickyElement = stickyElement.current;
    currentStickyElement.addEventListener('mouseover', onMouseHover);
    currentStickyElement.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      currentStickyElement.removeEventListener('mouseover', onMouseHover);
      currentStickyElement.removeEventListener('mouseleave', onMouseHover);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [onMouseMove, stickyElement, isHovered]);

  return (
    <motion.div
      ref={cursorRef}
      className={`${styles.cursor} ${isOpen ? styles.cursor_white : styles.cursor_black}`}
      style={{
        translateX: mouse.x,
        translateY: mouse.y,
        scaleX: scale.x,
        scaleY: scale.y
      }}
      animate={{width: cursorSize, height: cursorSize}}
    ></motion.div>
  );
};

export default CursorSticky;
