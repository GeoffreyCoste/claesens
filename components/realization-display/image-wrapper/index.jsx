import styles from '../style.module.scss';
import Image from 'next/image';
import useMediaQueries from '@/hooks/useMediaQueries';
import clsx from 'clsx';

const ImageWrapper = ({src, alt, isFullScreen}) => {

  const {mobile} = useMediaQueries();

  return (
    <div className={clsx(styles.image_wrapper, {[styles.full_screen]: isFullScreen})}>
      <Image
        src={mobile ? src[0] : src[1]} 
        alt={alt} 
        fill 
        style={{objectFit: 'cover'}} 
        loading="lazy"
        quality={100}
        unoptimized
      />
    </div>
  );
};

export default ImageWrapper;
