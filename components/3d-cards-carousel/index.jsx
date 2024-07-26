'use client';

import styles from './style.module.scss';
import {useRef, useState} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {Image, Environment, ScrollControls, useScroll} from '@react-three/drei';
import * as THREE from 'three';
import {easing} from 'maath';
import '@/utils/utils3d.js';

const CardsCarousel3d = () => {
  return (
    <div className={styles.carousel}>
      <Canvas camera={{position: [0, 0, 0], fov: 15}}>
        <fog attach="fog" args={['#a79', 8.5, 12]} />
        <ScrollControls pages={4} infinite>
          <Rig rotation={[0, 0, 0.15]}>
            <Carousel />
          </Rig>
          {/* <Banner position={[0, -0.15, 0]} /> */}
        </ScrollControls>
        <Environment preset="dawn" background blur={0.5} />
      </Canvas>
    </div>
  );
};

const Rig = (props) => {
  const ref = useRef();
  const scroll = useScroll();
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
    state.events.update(); // Raycasts every frame rather than on pointer-move
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta
    ); // Move camera
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
};

const Carousel = ({radius = 1.4, count = 4}) => {
  return Array.from({length: count}, (_, i) => (
    <Card
      key={i}
      url={`/images/services_img_${Math.floor(i % 10)}.jpg`}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
    />
  ));
};

const Card = ({url, ...props}) => {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const pointerOver = (e) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    easing.damp(
      ref.current.material,
      'radius',
      hovered ? 0.25 : 0.1,
      0.2,
      delta
    );
    easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta);
  });
  return (
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      {...props}
    >
      {/* <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} /> */}
      <bentPlaneGeometry args={[0.5, 2, 1, 20, 20]} />
    </Image>
  );
};

export default CardsCarousel3d;
