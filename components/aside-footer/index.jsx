'use client';

import styles from './style.module.scss';
import { useRef } from 'react';
import {useMedia} from '@/hooks/useMedia';
import DraggableCircle from '../draggable-circle';

const AsideFooter = ({variant = null, anim, body, draggable = false}) => {
  const containerRef = useRef(null);

  const {isHydrated, matches} = useMedia();
  const {desktop} = matches;

  const showDraggable = isHydrated && !desktop && draggable;

  return (
    <aside
      className={`${styles.aside} ${variant ? styles[`aside_${variant}`] : ''}`}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          {isHydrated && desktop && <div className={styles.anim}>{anim}</div>}
          <div className={styles.body}>{body}</div>

          {showDraggable && (
            <div ref={containerRef} className={styles.drag_container}>
              <DraggableCircle containerRef={containerRef} />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AsideFooter;