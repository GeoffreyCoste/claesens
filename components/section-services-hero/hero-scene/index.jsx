'use client'

import styles from './style.module.scss';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three';
import ShaderSphere from './shader-sphere';

const HeroScene = () => {
  const [sphereRotation, setSphereRotation] = useState({ y: 0, z: 0 });

  const [options, setOptions] = useState({
    perlin: {
      time: 3.0,
      morph: 0.0,
      dnoise: 2.5
    },
    chroma: {
      RGBr: 5.5,
      RGBg: 4.5,
      RGBb: 2.0,
      RGBn: 5.0,
      RGBm: 1.5
    },
    camera: {
      zoom: 100,
      speedY: 0.6,
      speedX: 0.0,
      guide: false
    },
    sphere: {
      wireframe: false,
      points: false,
      psize: 3
    }
  });

  return (
    <Canvas 
      className={styles.canvas}
      style={{ pointerEvents: 'none'}}
      camera={{ position: [0, 0, 10], fov: 20 }}
      shadows
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <ShaderSphere 
        options={options}
        showWireframe={options.sphere.wireframe}
        showPoints={options.sphere.points}
        onRotationChange={setSphereRotation}
      />
    </Canvas>
  );
};

export default HeroScene;