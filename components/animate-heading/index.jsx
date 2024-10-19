'use client';

import styles from './style.module.scss';
import clsx from 'clsx';
import {dm_sans, bricolage_grotesque} from '@/app/fonts';
import {useRef} from 'react';
import {motion} from 'framer-motion';
import HeadingContainer from './heading-container';
import {tags, charVariants, dotVariants} from './data';

const AnimateHeading = ({type, text, isWhite = false}) => {
  const lastSpanRef = useRef(null);

  // Get tag name from tags object key 'type'
  const Tag = tags[type];
  // Storage array
  const words = [];
  // Split each word from 'text' props string into an array
  const splitWords = text.split(' ');
  // Push each word into words array
  for (const [, item] of splitWords.entries()) {
    words.push(item.split(''));
  }
  // Add a space ("\u00A0") to the end of each word excepting the last word followed by a dot
  for (let i = 0; i < words.length - 1; i++) {
    words[i].push('\u00A0');
  }

  // Add a space ("\u00A0") to the end of each word
  /* words.map((word) => {
    return word.push('\u00A0');
  }); */

  return (
    <>
      <Tag className={bricolage_grotesque.className} aria-label={text}>
        {words.map((word, wordIndex) => {
          return (
            <HeadingContainer key={wordIndex}>
              {words[wordIndex].flat().map((character, characterIndex) => {
                const isLastSpan =
                  wordIndex === words.length - 1 &&
                  characterIndex === word.length - 1;
                return (
                  <span
                    key={characterIndex}
                    style={{overflow: 'hidden', display: 'inline-block'}}
                  >
                    <motion.span
                      ref={isLastSpan ? lastSpanRef : null}
                      className={clsx(
                        isWhite && styles.heading_character_white,
                        isLastSpan && styles.heading_dot,
                        isLastSpan
                          ? dm_sans.className
                          : bricolage_grotesque.className
                      )}
                      style={{display: 'inline-block'}}
                      variants={!isLastSpan ? charVariants : dotVariants}
                    >
                      {character}
                    </motion.span>
                  </span>
                );
              })}
            </HeadingContainer>
          );
        })}
      </Tag>
    </>
  );
};

export default AnimateHeading;
