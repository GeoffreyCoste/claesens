'use client';

import styles from '../../style.module.scss';
import { useRef } from 'react';
import useMediaQueries from "@/hooks/useMediaQueries"
import Canvas3d from "../../canvas-3d";
import AnimateStagger from "@/components/animate-stagger";
import AnimateHeading from "@/components/animate-heading";
import AnimateFade from "@/components/animate-fade";
import ButtonCopy from "@/components/button-copy";
import { h2FooterAsideHome } from "@/components/animate-heading/data";
import DraggableCircle from '@/components/draggable-circle';

const AsideContent = () => {

    const containerRef = useRef(null);

    const {desktop} = useMediaQueries();

    return (
      <>
        {!desktop ? (
          <div className={styles.aside_content}>
            <div ref={containerRef} className={styles.drag_container}>
              <DraggableCircle containerRef={containerRef} />
            </div>

            <AnimateStagger>
              <AnimateStagger>
                {h2FooterAsideHome.map((text, index) => (
                  <AnimateHeading key={index} {...text} isStacked />
                ))}
              </AnimateStagger>
              <AnimateFade>
                <div className={styles.item_container}>
                  <p className={styles.item_text}>
                    Ensemble, faisons rayonner vos idées !
                  </p>
                </div>
              </AnimateFade>
            </AnimateStagger>

            <ButtonCopy />
          </div>
        ) : (
          <>
            <Canvas3d />
            <div className={styles.footer_default_aside_overlay}>
              <div className={styles.overlay_item}>
                <AnimateStagger>
                  {h2FooterAsideHome.map((text, index) => (
                    <AnimateHeading key={index} {...text} />
                  ))}
                  <AnimateFade>
                    <div className={styles.item_container}>
                      <p className={styles.item_text}>
                        Ensemble, faisons rayonner vos idées !
                      </p>
                    </div>
                  </AnimateFade>
                </AnimateStagger>

                <ButtonCopy />
              </div>
            </div>
          </>
        )}
      </>
    );
}

export default AsideContent;