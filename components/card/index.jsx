'use client';

import styles from './style.module.scss';
import {useRef} from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import {useTransform, motion, useScroll, useMotionValue} from 'framer-motion';
import {bricolage_grotesque} from '@/app/fonts';
import {useMedia} from '@/hooks/useMedia';
import Badge from '../badge';

const Card = ({
  index,
  title,
  badges,
  description,
  image,
  progress = null,
  range = [0, 1],
  targetScale = 1
}) => {
  const articleRef = useRef(null);

  const {isHydrated, matches} = useMedia();
  const {tablet, desktop, md} = matches;

  // Check <article> scroll progress between 0 and 1
  // (i.e. 0 meaning that element start is at window bottom and 1 at window start)
  const {scrollYProgress} = useScroll({
    target: articleRef,
    offset: ['start end', 'start start'] // 'article start / window end', 'article start / window start'
  });

  // Set image scale property subject to scroll progress (i.e. when scroll progress goes from 0 to 1, image scales from 1.2 to 1 )
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  // Appear/disappear at screen center only for tablet
  const cardCenterProgress = useScroll({
    target: articleRef,
    offset: ['start 85%', 'end 15%']
  });

  const tabletOpacity = useTransform(
    cardCenterProgress.scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0, 1, 1, 0]
  );

  const tabletScale = useTransform(
    cardCenterProgress.scrollYProgress,
    [0, 0.5, 1],
    [0.9, 1, 0.9]
  );

  // Ensure progress is always a MotionValue and setting default
  const defaultContentScale = useMotionValue(1);
  // If progress is null, replace it by the default value
  const safeProgress = progress || defaultContentScale;
  const contentScale = useTransform(safeProgress, range, [1, targetScale]);

  const motionStyle = isHydrated
    ? desktop
      ? {
          scale: contentScale,
          top: `calc(-5vh + ${index * 25}px)`,
          position: 'relative'
        }
      : tablet
        ? {scale: tabletScale, opacity: tabletOpacity, pointerEvents: 'none'}
        : {}
    : {}; // avant hydratation, pas de style

  const imageSrc = isHydrated && md ? image.src[1] : image.src[0];
  const imageWidth = md ? 222 : 512;
  const imageHeight = md ? 296 : 384;
  const imageHeightStyle = md ? '296px' : 'auto';

  return (
    <article ref={articleRef} className={styles.card_container}>
      <motion.div className={styles.card_content} style={motionStyle}>
        <div className={styles.card_content_item}>
          <div
            className={clsx(
              styles.card_content_item_wrapper,
              styles.wrapper_image
            )}
          >
            <motion.div
              style={{
                height: imageHeightStyle,
                display: 'flex',
                scale: imageScale
              }}
            >
              <Image
                src={imageSrc}
                alt={image.alt}
                loading="lazy"
                width={imageWidth}
                height={imageHeight}
              />
            </motion.div>
          </div>
        </div>
        <div className={styles.card_content_item}>
          <div
            className={clsx(
              styles.card_content_item_wrapper,
              styles.wrapper_text
            )}
          >
            <h3 className={bricolage_grotesque.className}>{title}</h3>

            <div className={styles.badges}>
              {badges.map((text, index) => (
                <Badge
                  key={`$badge-${text.split(' ').join('')}-${index}`}
                  text={text}
                  color="black"
                  fontSize="xs"
                  fontWeight="normal"
                  padding="compact"
                  bg="gray_light"
                  border="gray_light"
                />
              ))}
            </div>

            {description.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      </motion.div>
    </article>
  );
};

export default Card;
