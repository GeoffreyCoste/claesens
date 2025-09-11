'use client';

import styles from '../style.module.scss';
import { bricolage_grotesque } from '@/app/fonts';
import { useEffect, useRef, useState } from 'react';
import {useMedia} from '@/hooks/useMedia';
import clsx from 'clsx';
import {useScroll, motion} from 'framer-motion';

const TextAlongPath = ({text, color, svg}) => {
  const containerRef = useRef();
  const pathElement = useRef(null);
  const textPathRef = useRef(null);
  const textElementRef = useRef(null);

  const {isHydrated, matches} = useMedia();
  const {mobile, tablet} = matches;

  const defaultConfig = {
    viewBox: '0 0 320 580',
    path: 'M0,116.12c218.59,0,118.86,347.76,320,347.76',
    baseOffset: -42,
    scrollFactor: 84
  };

  const config = svg
    ? mobile
      ? svg.mobile
      : tablet
        ? svg.tablet
        : svg.desktop
    : defaultConfig;

  const {viewBox, path, baseOffset = 0, scrollFactor = 0} = config;

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const [repeatedText, setRepeatedText] = useState(text);

  useEffect(() => {
    if (!isHydrated) return;

    const computeRepeats = () => {
      const pathLength = pathElement.current?.getTotalLength?.() || 0;

      // Render text once to measure it
      const textLength = textElementRef.current?.getComputedTextLength?.() || 1;

      if (textLength === 0) return;

      // +2 for margin/padding to avoid empty gap
      const repeatCount = Math.ceil(pathLength / textLength) + 2;

      const spacedText = Array(repeatCount).fill(text).join('   ');
      setRepeatedText(spacedText);
    };

    computeRepeats();

    // Also recompute if font loads late
    window.addEventListener('load', computeRepeats);
    return () => window.removeEventListener('load', computeRepeats);
  }, [isHydrated, text]);

  useEffect(() => {
    const updateOffset = (e) => {
      if (textPathRef.current) {
        textPathRef.current.setAttribute(
          'startOffset',
          `${baseOffset + e * scrollFactor}%`
        );
      }
    };

    scrollYProgress.on('change', updateOffset);

    return () => {
      scrollYProgress.clearListeners('change');
    };
  }, [scrollYProgress, baseOffset, scrollFactor]);

  return (
    <motion.div ref={containerRef} className={styles.text_along_path}>
      <svg viewBox={viewBox}>
        <path ref={pathElement} fill="none" id="curve" d={path} />
        <text
          ref={textElementRef} // for measuring
          className={clsx(bricolage_grotesque.className, styles.svg_text)}
          style={{fill: color, visibility: 'hidden', position: 'absolute'}}
        >
          <textPath href="#curve">{text}</textPath>
        </text>
        {isHydrated && (
          <text
            className={clsx(bricolage_grotesque.className, styles.svg_text)}
            style={{fill: color}}
          >
            <textPath
              ref={textPathRef}
              href="#curve"
              startOffset={`${baseOffset}%`}
            >
              {repeatedText}
            </textPath>
          </text>
        )}
      </svg>
    </motion.div>
  );
};

export default TextAlongPath;