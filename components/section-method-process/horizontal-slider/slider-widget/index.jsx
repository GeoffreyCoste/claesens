'use client';

import styles from './style.module.scss';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import EllipseSwirl from './ellipse-swirl';
import Controlers from './controlers';

gsap.registerPlugin(Draggable);

const SliderWidget = ({activeIndex, dotsLength, handleDotClick, handleControlerClick}) => {
    const widgetRef = useRef(null);
    const gripRef = useRef(null);

    useEffect(() => {
      if (widgetRef.current && gripRef.current) {
        Draggable.create(widgetRef.current, {
          type: 'x,y',
          bounds: widgetRef.current.parentElement, // contraint au parent
          handle: gripRef.current, // déplaçable uniquement via le grip
          inertia: false, // inertie fluide si tu veux (nécessite aussi le plugin InertiaPlugin de GSAP Club)
        });
      }
    }, []);

    useEffect(() => {
        console.log('Active index: ', activeIndex);
    }, [activeIndex])

    return (
      <div ref={widgetRef} className={styles.widget}>
          <div className={styles.header}>
            <div ref={gripRef} className={styles.grip}></div>
            <div className={styles.title}>Etape</div>
          </div>
          <div className={styles.body}>
            <div className={styles.index}>{activeIndex + 1}</div>
            <div className={styles.background}>
                <EllipseSwirl activeIndex={activeIndex} />
            </div>
            <div className={styles.controls}>
              <Controlers activeIndex={activeIndex} handleControlerClick={handleControlerClick} />
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.dots}>
                {Array.from({ length: dotsLength }, (_, index) => (
                    <div 
                        key={`indicator-${index}`} 
                        className={clsx(styles.dot, {
                            [styles.active]: activeIndex === index,
                        })}
                        onClick={() => handleDotClick(index)}
                    ></div>
                ))}
            </div>
          </div>
      </div>
    )
}

export default SliderWidget;