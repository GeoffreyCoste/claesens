'use client';

import styles from './style.module.scss';
import { useRef } from 'react';
import useMediaQueries from '@/hooks/useMediaQueries';
import DraggableCircle from '../draggable-circle';

const AsideFooter = ({variant = null, anim, body, draggable = false}) => {

  const containerRef = useRef(null);

  const {desktop} = useMediaQueries();
  return (
    <aside className={`${styles.aside} ${variant ? styles[`aside_${variant}`] : ''}`}>
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.anim}>{anim}</div>
                <div className={styles.body}>{body}</div>

                {!desktop && draggable && (
                    <div ref={containerRef} className={styles.drag_container}>
                        <DraggableCircle containerRef={containerRef} />
                    </div>
                )}
            </div>
        </div>
    </aside>
  )
}

export default AsideFooter;