'use client';

import styles from './style.module.scss';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import useMediaQueries from '@/hooks/useMediaQueries';
import useMousePosition from '@/hooks/useMousePosition';
import ButtonCopy from '../button-copy';
import AnimateStagger from '../animate-stagger';
import AnimateHeading from '../animate-heading';
import { h2FooterAsideRealization, h2FooterAsideRealizationMask } from '../animate-heading/data';
import AnimateFade from '../animate-fade';
import SvgEllipsesAnim from './svg-ellipses-anim';

const AsideFooterRealizationNew = () => {

  const [isHovered, setIsHovered] = useState(false);
  const titleRef = useRef(null);
  const {desktop} = useMediaQueries();
  /* const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 15;

  const [h2Pos, setH2Pos] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    const updatePosition = () => {
      const title = titleRef.current;
      if (!title) return;
  
      if (title) {
        setH2Pos({
          top: title.offsetTop,
          left: title.offsetLeft,
          width: title.offsetWidth,
          height: title.offsetHeight
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [desktop]); */

  return (
    <div className={styles.aside_footer_realization}>
      <aside className={styles.aside}>
        <div className={styles.content}>
          <div className={styles.anim}>
            <SvgEllipsesAnim />
          </div>
          <div className={styles.body}>
            <AnimateStagger>
              <div 
                ref={titleRef} 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {h2FooterAsideRealization.map((text, index) => (
                  <AnimateHeading key={index} {...text} />
                ))}
              </div>
              <AnimateFade>
                {(isAnimationDone) => (
                  <p
                    className={styles.text}
                    style={{
                      color: isAnimationDone ? 'white' : '#1e1e1e',
                      mixBlendMode: isAnimationDone ? 'difference' : 'normal'
                    }}
                  >
                    Une seule connexion suffit !
                  </p>
                )}
              </AnimateFade>
            </AnimateStagger>

            <ButtonCopy />
          </div>

          {/* {desktop && (
            <motion.div 
              className={styles.overlay_mask} 
              animate={{
                WebkitMaskPosition: `${x - (size/2)}px ${y - (size/2)}px`,
                WebkitMaskSize: `${size}px`,
              }}
              transition={{ type: "tween", ease: "backOut", duration:0.5}}
            >
              <div 
                className={styles.masked_title} 
                style={{
                  top: h2Pos.top,
                  left: h2Pos.left,
                  width: h2Pos.width,
                  height: h2Pos.height
                }}
              >
                {h2FooterAsideRealizationMask.map((text, index) => (
                  <AnimateHeading key={index} {...text} />
                ))}
              </div>
            </motion.div>
          )} */}
        </div>
      </aside>
    </div>
  );
}

export default AsideFooterRealizationNew;