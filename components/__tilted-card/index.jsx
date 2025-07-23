'use client'

import styles from './style.module.scss';
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

const TiltedCard = ({
  backgroundColor = "#1e1e1e",
  containerHeight = "300px",
  containerWidth = "100%",
  cardHeight = "300px",
  cardWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = false,
  interactionEnabled = true,
}) => {
  const [wasEnabled, setWasEnabled] = useState(interactionEnabled);
  const ref = useRef(null);

  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  const resetCard = useCallback(
    () => {
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1);
    },
    [rotateX, rotateY, scale],
  );

  // 👇 Reset dès que interactionEnabled passe à false
  useEffect(() => {
    if (wasEnabled && !interactionEnabled) {
      resetCard();
    }
    setWasEnabled(interactionEnabled);
  }, [wasEnabled, interactionEnabled, resetCard]);

  const handleMouse = (e) => {
    if (!interactionEnabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
  };

  const handleMouseEnter = () => {
    if (!interactionEnabled) return;
    scale.set(scaleOnHover);
  };

  const handleMouseLeave = () => {
    if (!interactionEnabled) return;
    resetCard();
  };

  return (
    <div
      ref={ref}
      className={styles.tilted_card_figure}
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className={styles.tilted_card_mobile_alert}>
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className={styles.tilted_card_inner}
        style={{
          width: cardWidth,
          height: cardHeight,
          backgroundColor,
          borderRadius: "15px",
          rotateX,
          rotateY,
          scale,
          cursor: interactionEnabled ? "pointer" : "default",
        }}
      />
    </div>
  );
}

export default TiltedCard;