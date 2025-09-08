import styles from './style.module.scss';
import {Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {Environment} from '@react-three/drei';
import {Physics} from '@react-three/rapier';
import Sphere from './sphere';
import Pointer from './pointer';

const spheres = [...Array(50)].map(() => ({
  scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)]
}));

const Sphere3D = () => {
  return (
    <Canvas
      className={styles.canvas}
      gl={{alpha: true, stencil: false, depth: false, antialias: false}}
      dpr={[1, 1.5]}
      camera={{position: [0, 0, 25], fov: 30, near: 1, far: 40}}
      onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
      shadows
      flat
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <directionalLight
          position={[0, -15, -0]}
          intensity={2}
          color="#fce300"
        />

        <Physics gravity={[0, 0, 0]}>
          <Pointer />
          {spheres.map((props, i) => (
            <Sphere key={i} {...props} />
          ))}
        </Physics>
        <Environment preset="lobby" />
      </Suspense>
    </Canvas>
  );
};

export default Sphere3D;
