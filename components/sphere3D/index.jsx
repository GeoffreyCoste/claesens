import styles from './style.module.scss';
import {Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, Environment} from '@react-three/drei';
import {Physics} from '@react-three/rapier';
import {EffectComposer, N8AO} from '@react-three/postprocessing';
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
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={4} />
        <directionalLight
          position={[0, -15, -0]}
          intensity={4}
          color="#fce300"
        />

        <Physics gravity={[0, 0, 0]}>
          <Pointer />
          {spheres.map((props, i) => (
            <Sphere key={i} {...props} />
          ))}
        </Physics>
        <Environment preset="studio" />
        <EffectComposer disableNormalPass>
          <N8AO color="red" aoRadius={2} intensity={1} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};

export default Sphere3D;
