'use client';

import styles from './style.module.scss';
import {useRef, useEffect, useCallback} from 'react';
import useMediaQueries from '@/hooks/useMediaQueries';
import gsap from 'gsap';

const StaggeredText = ({text}) => {
  const refsArray = useRef([]);
  const {mobile, desktop} = useMediaQueries();

  const wordsArray = text
    .split(' ')
    .map((word) =>
      word.split('').map((char) => (char === ' ' ? '\u00A0' : char))
    );

  // Opacity calculation function
  const calculateOpacity = (yValue) => {
    if (yValue >= -120 && yValue <= -100) return (yValue + 120) / 20;
    if (yValue >= 100 && yValue <= 120) return (120 - yValue) / 20;
    if (yValue > -100 && yValue < 100) return 1;
    return 0;
  };

  // Function initializing GSAP upon characters array
  const createTimeline = useCallback(
    (elements, index, delayMultiplier, duration) => {
      const timeline = gsap.timeline({
        repeat: -1,
        delay: index * delayMultiplier
      });

      timeline.fromTo(
        elements,
        {y: 120, opacity: 0, scale: 0.5},
        {
          y: -120,
          opacity: 0,
          scale: 1,
          stagger: {each: 0.2},
          duration,
          ease: 'power1.inOut',
          onUpdate: () => {
            elements.forEach((char) => {
              const yValue = gsap.getProperty(char, 'y');
              const opacity = calculateOpacity(yValue);
              gsap.set(char, {opacity});
            });
          }
        }
      );
    },
    []
  );

  useEffect(() => {
    const elements = refsArray.current;

    if (!elements.length) return;

    elements.forEach((item, index) => {
      const characters = gsap.utils.toArray(`.${styles.character}`, item);

      createTimeline(
        characters,
        index,
        !desktop ? 1 : 2, // Delay multiplier
        !desktop ? 4 : 2.5 // Duration
      );
    });
  }, [mobile, desktop, createTimeline]);

  // Line or word render function with empty character(s) management
  const renderWord = (word, shouldAddEmptyCharacters) => (
    <>
      {shouldAddEmptyCharacters && (
        <div className={styles.character}>
          <span>&nbsp;</span>
        </div>
      )}
      {word.map((char, charIndex) => (
        <div key={charIndex} className={styles.character}>
          <span>{char}</span>
        </div>
      ))}
      {shouldAddEmptyCharacters && (
        <div className={styles.character}>
          <span>&nbsp;</span>
        </div>
      )}
    </>
  );

  return (
    <div className={styles.staggered_text}>
      {!desktop
        ? wordsArray.map((word, index) => {
            const shouldAddEmptyCharacters = word.length === 9; // Mobile specific logic
            return (
              <div
                key={`word-${index}`}
                className={styles.word}
                ref={(el) => (refsArray.current[index] = el)}
              >
                {renderWord(word, shouldAddEmptyCharacters)}
              </div>
            );
          })
        : [...Array(5)].map((_, lineIndex) => (
            <div
              key={`line-${lineIndex}`}
              className={styles.line}
              ref={(el) => (refsArray.current[lineIndex] = el)}
            >
              {wordsArray.map((word, wordIndex) => (
                <div key={`word-${wordIndex}`} className={styles.word}>
                  {renderWord(
                    word,
                    false /* No need for empty character(s) on desktop */
                  )}
                </div>
              ))}
            </div>
          ))}
    </div>
  );
};

export default StaggeredText;
