'use client';

import styles from './style.module.scss';
import {useEffect, useRef} from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import {useTransform, motion, useScroll, useMotionValue} from 'framer-motion';
import {bricolage_grotesque} from '@/app/fonts';
import useMediaQueries from '@/hooks/useMediaQueries';

const Card = ({
  index,
  title,
  description,
  image,
  progress = null,
  range = [0, 1],
  targetScale = 1
}) => {
  const articleRef = useRef(null);

  // Check <article> scroll progress between 0 and 1
  // (i.e. 0 meaning that element start is at window bottom and 1 at window start)
  const {scrollYProgress} = useScroll({
    target: articleRef,
    offset: ['start end', 'start start'] // 'article start / window end', 'article start / window start'
  });

  // Set image scale property subject to scroll progress (i.e. when scroll progress goes from 0 to 1, image scales from 1.2 to 1 )
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  // Ensure progress is always a MotionValue and setting default
  const defaultContentScale = useMotionValue(1);
  // If progress is null, replace it by the default value
  const safeProgress = progress || defaultContentScale;
  const contentScale = useTransform(safeProgress, range, [1, targetScale]);

  const {desktop, md} = useMediaQueries();

  return (
    <article ref={articleRef} className={styles.card_container}>
      <motion.div
        className={styles.card_content}
        style={
          desktop
            ? {scale: contentScale, top: `calc(-5vh + ${index * 25}px)`}
            : {}
        }
      >
        <div className={styles.card_content_item}>
          <div
            className={clsx(
              styles.card_content_item_wrapper,
              styles.wrapper_image
            )}
          >
            <motion.div
              style={{
                height: `${md ? '296px' : 'auto'}`,
                display: 'flex',
                scale: imageScale
              }}
            >
              <Image
                src={md ? image.src[1] : image.src[0]}
                alt={image.alt}
                loading="lazy"
                width={md ? 222 : 512}
                height={md ? 296 : 384}
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
            <h2 className={bricolage_grotesque.className}>{title}</h2>
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
