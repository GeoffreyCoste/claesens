'use client'

import styles from './style.module.scss';
import { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import useMeasure from 'react-use-measure';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import FullscreenPlane from './fullscreen-plane';
import ArticlesPositionWrapper from './articles-position-wrapper';
import ModelsPositionWrapper from './models-position-wrapper';

gsap.registerPlugin(ScrollTrigger);

const ShaderScene = ({ sliderRef, slidesRef, tweenRef, activeIndex, isDotNavigationScrolling }) => {
  const [ready, setReady] = useState(false);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  const [ref, bounds] = useMeasure();
  const uRadius1 = useMemo(() => new THREE.Vector2(0.0, 0.0), []);
  const uRadius2 = useMemo(() => new THREE.Vector2(0.0, 0.0), []);
  const uRadius3 = useMemo(() => new THREE.Vector2(0.0, 0.0), []);
  const uRadius1Static = useMemo(() => new THREE.Vector2(0.5, 0.25), []);
  const uRadius2Static = useMemo(() => new THREE.Vector2(0.2, 0.3), []);

  useEffect(() => {
    if (tweenRef.current && slidesRef.current.length > 0) {
      setReady(true);
    }
  }, [tweenRef, slidesRef]);

  useEffect(() => {
    const tween = tweenRef?.current;
    const slides = slidesRef?.current;
    if (!tween || !slides.length) return;

    const ctx = gsap.context(() => {
      // When entering slides[slides.length - 1] (end)
      ScrollTrigger.create({
        containerAnimation: tween,
        trigger: slides[slides.length - 2],
        start: 'center center',
        end: 'center+=5% center',
        onLeave: ({direction}) => {
          console.log('On Leave');
          if (direction === 1) setShouldFadeOut(true);
        },
        onEnterBack: ({direction}) => {
          console.log('On Enter Back');
          if (direction === -1) setShouldFadeOut(false);
        }
      });

      // Reset to false as soon as you enter a "valid" slide
      for (let i = 1; i < slides.length - 2; i++) {
        ScrollTrigger.create({
          containerAnimation: tween,
          trigger: slides[i],
          start: 'left center',
          onEnter: ({direction}) => {
            console.log('On Enter');
            if (direction === 1) setShouldFadeOut(false);
          }
          // markers: true
        });
      }
    });

    return () => ctx.revert();
  }, [tweenRef, slidesRef]);

  return (
    <div className={styles.canvas_container} ref={ref}>
      {ready && bounds.width > 0 && (
        <Canvas
          camera={{position: [0, 0, 15], fov: 50}}
          dpr={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
        >
          <Environment preset="city" />

          <FullscreenPlane
            width={bounds.width}
            height={bounds.height}
            uRadius1={uRadius1}
            uRadius2={uRadius2}
            uRadius3={uRadius3}
            sliderRef={sliderRef}
            tweenRef={tweenRef}
            slidesRef={slidesRef}
          />
          <ArticlesPositionWrapper
            bounds={bounds}
            uRadius1={uRadius1Static}
            uRadius2={uRadius2Static}
            activeIndex={activeIndex}
            isDotNavigationScrolling={isDotNavigationScrolling}
            shouldFadeOut={shouldFadeOut}
          />
          <ModelsPositionWrapper
            bounds={bounds}
            uRadius1={uRadius1Static}
            uRadius2={uRadius2Static}
            slidesRef={slidesRef}
            tweenRef={tweenRef}
            activeIndex={activeIndex}
            isDotNavigationScrolling={isDotNavigationScrolling}
          />
        </Canvas>
      )}
    </div>
  );
};

export default ShaderScene;