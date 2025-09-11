'use client'

import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import {useParams} from 'next/navigation';
import {useMedia} from '@/hooks/useMedia';
import TextBlock from './text-block';
import ImageWrapper from './image-wrapper';
import TextAlongPath from './text-along-path';
import TextScrollRepetition from './text-scroll-repetition';
import {realizations} from './data';
import LinkCustom from '../link-custom';

const COMPONENT_MAP = {
  TextBlock,
  ImageWrapper,
  TextAlongPath,
  TextScrollRepetition
};

const RealizationDisplay = () => {
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  const {realisation} = useParams();
  const realization = realizations[realisation];

  const {isHydrated, matches} = useMedia();
  const {mobile} = matches;

  useEffect(() => {
    const keys = Object.keys(realizations);
    const currentIndex = keys.indexOf(realisation);

    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + keys.length) % keys.length;
      const nextIndex = (currentIndex + 1) % keys.length;

      setPrev(keys[prevIndex]);
      setNext(keys[nextIndex]);
    }
  }, [realisation]);

  if (!realization) {
    return <p>Contenu non disponible.</p>;
  }

  return (
    <div className={styles.display}>
      {realization.blocks.map((block, index) => {
        const Component = COMPONENT_MAP[block.type];
        return Component ? <Component key={index} {...block} /> : null;
      })}
      {isHydrated && (
        <div className={styles.pages_navbar}>
          {mobile ? (
            <>
              <div className={styles.navitem}>
                <LinkCustom href={`/realisations/${prev}`} prev mobile />
                <LinkCustom href={`/realisations/${next}`} next mobile />
              </div>
              <div className={`${styles.navitem} ${styles.navitem_back}`}>
                <LinkCustom href={'/realisations'} text={'retour'} />
              </div>
            </>
          ) : (
            <>
              <div className={styles.navitem}>
                <LinkCustom href={`/realisations/${prev}`} prev />
              </div>
              <div className={`${styles.navitem} ${styles.navitem_back}`}>
                <LinkCustom href={'/realisations'} text={'retour'} />
              </div>
              <div className={styles.navitem}>
                <LinkCustom href={`/realisations/${next}`} next />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RealizationDisplay;
