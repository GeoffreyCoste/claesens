'use client';

import {Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {Environment} from '@react-three/drei';
import Geometry from './geometry';

const Scene = () => {
  return (
    <Canvas
      shadows
      camera={{position: [0, 0, 5], fov: 45}}
      dpr={[1, 2]}
      gl={{antialias: true}}
    >
      <Suspense fallback={null}>
        <Geometry />
        <Environment preset="lobby" />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
