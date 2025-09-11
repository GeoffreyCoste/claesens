'use client';

import styles from './style.module.scss';
import Image from 'next/image';
import {useMedia} from '@/hooks/useMedia';
import clsx from 'clsx';
import {bricolage_grotesque} from '@/app/fonts';
import Badge from '../badge';
import ArrowRight from '../icons/arrow-right';

const FlipCard = ({index, name, badges, images, alt}) => {
  const {isHydrated, matches} = useMedia();
  const {desktop} = matches;

  const imageSrc = isHydrated ? (desktop ? images[1] : images[0]) : null;

  return (
    <div className={styles.card}>
      <div className={styles.card_inner}>
        <div className={styles.card_front}>
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={alt}
              fill
              style={{objectFit: 'cover'}}
              loading="lazy"
            />
          )}
          <div className={styles.card_content}>
            <div className={styles.card_header}>
              <span className={styles.card_header_item}>
                {`# ${index + 1}.`}
              </span>
              <h3
                className={clsx(
                  bricolage_grotesque.className,
                  styles.card_header_title
                )}
              >
                {name}
              </h3>
            </div>
            <div className={styles.card_menu}>
              <ul className={styles.card_menu_list}>
                {badges?.map((badge, i) => (
                  <li key={i} className={styles.menu_list_item}>
                    <Badge text={badge} />
                  </li>
                ))}
              </ul>
              <div className={styles.card_menu_item}>
                <ArrowRight color={'#fce300'} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.card_back}>
          <div className={styles.card_content}>
            <div className={styles.card_header}>
              <span className={styles.card_header_item}>
                {`# ${index + 1}.`}
              </span>
              <h3
                className={clsx(
                  bricolage_grotesque.className,
                  styles.card_header_title
                )}
              >
                {name}
              </h3>
            </div>
            <div className={styles.card_menu}>
              <ul className={styles.card_menu_list}>
                {badges?.map((badge, i) => (
                  <li key={i} className={styles.menu_list_item}>
                    <Badge text={badge} />
                  </li>
                ))}
              </ul>
              <div className={styles.card_menu_item}>
                <ArrowRight color={'#fce300'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
