'use client';

import styles from './style.module.scss';
import {Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {
  Environment,
  CameraControls,
  Lightformer,
  Backdrop
} from '@react-three/drei';
import Spheres from '../spheres';
import Globe from '../globe';

const Scene = () => {
  return (
    <div className={styles.scene}>
      <Canvas
        shadows
        camera={{position: [0, 0, -20], fov: 35, near: 1, far: 50}}
      >
        {/* <color attach="background" args={['#e4e4e4']} /> */}
        <ambientLight intensity={1.5} color={0xffffff} />
        <Suspense fallback={null}>
          {/* <CardStack /> */}
          {/* <CardWithHole /> */}
          <Globe />
          <Spheres />
          {/* <Backdrop
            receiveShadow
            floor={4}
            position={[-10, -6, 10]}
            scale={[80, 20, 4]}
            rotation={[0, Math.PI, 0]}
          >
            <meshStandardMaterial color="#c2c2c2" envMapIntensity={1} />
          </Backdrop> */}
          {/* <EffectComposer disableNormalPass>
            <N8AO aoRadius={3} intensity={2} color="#fce300" />
            <TiltShift2 blur={0.1} />
          </EffectComposer> */}
          <Environment
            resolution={512}
            background={false}
            // files="/rosendal_park_sunset_puresky_1k.hdr"
          >
            <group rotation={[-Math.PI / 3, 0, 0]}>
              <Lightformer
                intensity={4}
                rotation-x={Math.PI / 2}
                position={[0, 5, -9]}
                scale={[10, 10, 1]}
              />
              {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
                <Lightformer
                  key={i}
                  form="circle"
                  intensity={4}
                  rotation={[Math.PI / 2, 0, 0]}
                  position={[x, 4, i * 4]}
                  scale={[4, 1, 1]}
                />
              ))}
              <Lightformer
                intensity={2}
                rotation-y={Math.PI / 2}
                position={[-5, 1, -1]}
                scale={[50, 2, 1]}
              />
              <Lightformer
                intensity={2}
                rotation-y={-Math.PI / 2}
                position={[10, 1, 0]}
                scale={[50, 2, 1]}
              />
            </group>
          </Environment>
        </Suspense>
        <CameraControls
          truckSpeed={0}
          dollySpeed={0}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Scene;
