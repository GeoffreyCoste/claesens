'use client';

import styles from './style.module.scss';
import {useState, useRef, Suspense} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  ScrollControls,
  Scroll,
  Sparkles,
  Icosahedron
} from '@react-three/drei';
import {
  Bloom,
  EffectComposer,
  DepthOfField,
  Vignette
} from '@react-three/postprocessing';
import {KernelSize} from 'postprocessing';
import * as THREE from 'three';

const Sphere = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

const Ring = ({geometryArgs, materialProps}) => {
  const ringRef = useRef(null);

  /* useFrame(() => {
      if (ringRef.current) {
        ringRef.current.rotation.z += 0.01;
      }
    }); */

  return (
    <mesh ref={ringRef} rotation={[0, -(Math.PI / 25), 0]}>
      <ringGeometry args={geometryArgs} />
      <meshBasicMaterial {...materialProps} />
    </mesh>
  );
};

const Bubbles = ({material}) => {
  // we use this array ref to store the spheres after creating them
  const [sphereRefs] = useState(() => []);
  // we use this array to initialize the background spheres
  const initialPositions = [
    [-4, 20, -12],
    [-10, 12, -4],
    [-11, -12, -23],
    [-16, -6, -10],
    [12, -2, -3],
    [13, 4, -12],
    [14, -2, -23],
    [8, 10, -20]
  ];
  // smaller spheres movement
  useFrame(() => {
    // animate each sphere in the array
    sphereRefs.forEach((el) => {
      el.position.y += 0.02;
      if (el.position.y > 19) el.position.y = -18;
      el.rotation.x += 0.06;
      el.rotation.y += 0.06;
      el.rotation.z += 0.02;
    });
  });
  return (
    <>
      {initialPositions.map((pos, i) => (
        <Icosahedron
          args={[1, 4]}
          position={[pos[0], pos[1], pos[2]]}
          material={material}
          key={i}
          ref={(ref) => (sphereRefs[i] = ref)}
        />
      ))}
    </>
  );
};

const Method3d = () => {
  return (
    <div className={styles.method_3d}>
      <Canvas shadows dpr={[1, 1.5]} camera={{position: [0, 0, 15]}}>
        <EffectComposer>
          <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={5}
            height={480}
          />
          <Bloom
            kernelSize={3}
            luminanceThreshold={0}
            luminanceSmoothing={0.4}
            intensity={0.6}
          />
          <Bloom
            kernelSize={KernelSize.HUGE}
            intensity={2}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            height={1000}
          />
          <Vignette eskil={false} offset={0.1} darkness={1.5} />
        </EffectComposer>

        {/* <color attach="background" args={['#000']} /> */}
        <ambientLight intensity={0.2} />
        <spotLight
          position={[0, 25, 0]}
          angle={1.3}
          penumbra={1}
          castShadow
          intensity={2}
          shadow-bias={-0.0001}
        />
        <Suspense fallback={null}>
          <Sphere />
          {/* <Ring
            geometryArgs={[3, 3.25, 64]}
            materialProps={{color: '#ffffff', side: THREE.DoubleSide}}
          /> */}
          {/* <Bubbles /> */}
        </Suspense>
        <Environment preset="warehouse" />

        {/* <ScrollControls
          pages={4}
          distance={1}
          horizontal={false}
          damping={0.25}
        >
          <Scroll>{/* To be completed *}</Scroll>
        </ScrollControls> */}

        <OrbitControls
          enableZoom={false}
          enablePan={true}
          enableRotate={true}
          target={[0, 0, 0]} // Centre les contrôles sur le cercle
        />
      </Canvas>
    </div>
  );
};

export default Method3d;
