'use client';

import {Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {Environment, OrbitControls} from '@react-three/drei';
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

        {/* <OrbitControls /* makeDefault autoRotate autoRotateSpeed={0.1} minPolarAngle={0} maxPolarAngle={Math.PI / 2} *
          /> */}
      </Suspense>
    </Canvas>
  );
};

export default Scene;
