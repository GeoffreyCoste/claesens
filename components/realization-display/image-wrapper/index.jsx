'use client';

import styles from '../style.module.scss';
import Image from 'next/image';
import {useMedia} from '@/hooks/useMedia';
import clsx from 'clsx';

const ImageWrapper = ({src, alt, isFullScreen}) => {
  const {isHydrated, matches} = useMedia();
  const {mobile} = matches;

  return (
    <div
      className={clsx(styles.image_wrapper, {
        [styles.full_screen]: isFullScreen
      })}
    >
      {isHydrated && (
        <Image
          src={mobile ? src[0] : src[1]}
          alt={alt}
          fill
          style={{objectFit: 'cover'}}
          loading="lazy"
          sizes={
            isFullScreen
              ? '(max-width: 1199px) 100vw, (min-width: 1200px) 100vw'
              : '(max-width: 1199px) 100vw, (min-width: 1200px) 75vw'
          }
        />
      )}
    </div>
  );
};

export default ImageWrapper;
