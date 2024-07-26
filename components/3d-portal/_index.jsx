'use client';

import styles from './style.module.scss';
import {useRef, Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {
  useTexture,
  OrbitControls,
  MeshTransmissionMaterial,
  RoundedBox
} from '@react-three/drei';

import {Bloom, EffectComposer} from '@react-three/postprocessing';
import {KernelSize} from 'postprocessing';
import * as THREE from 'three';

const Ring = ({geometryArgs, materialProps}) => {
  const ringRef = useRef(null);

  return (
    <mesh ref={ringRef}>
      <ringGeometry args={geometryArgs} />
      <meshBasicMaterial {...materialProps} />
    </mesh>
  );
};

const CustomRoundedBox = (meshProps) => {
  const [floor, normal] = useTexture([
    '/MetalZincGalvanized001_ROUGHNESS_1K_METALNESS.png',
    '/MetalZincGalvanized001_NRM_1K_METALNESS.png'
  ]);

  return (
    <RoundedBox
      args={[1, 1, 1]} // Width, height, depth. Default is [1, 1, 1]
      radius={0.05} // Radius of the rounded corners. Default is 0.05
      smoothness={4} // The number of curve segments. Default is 4
      bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
      creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
      {...meshProps} // All THREE.Mesh props are valid
    >
      {/* <meshPhongMaterial color="#f3f3f3" wireframe /> */}
      <MeshTransmissionMaterial
        backside={false}
        samples={3}
        thickness={3}
        chromaticAberration={0.025}
        anisotropy={0.1}
        distortion={0.2}
        distortionScale={0.1}
        temporalDistortion={0.2}
        roughness={0.5}
        roughnessMap={floor}
        normalMap={normal}
      />
    </RoundedBox>
  );
};

const Portal3d = () => {
  return (
    <div className={styles.portal_3d}>
      <Canvas shadows dpr={[1, 1.5]} camera={{position: [0, 0, 15]}}>
        <color attach="background" args={['#191920']} />
        <ambientLight intensity={0.5} />
        <fog attach="fog" args={['#191920', 0, 32]} />
        <Suspense fallback={null}>
          <Ring
            geometryArgs={[4.5, 5, 64]}
            materialProps={{color: '#ffffff', side: THREE.DoubleSide}}
          />

          <CustomRoundedBox />

          <EffectComposer multisampling={8}>
            <Bloom
              kernelSize={3}
              luminanceThreshold={0}
              luminanceSmoothing={0.4}
              intensity={0.6}
            />
            <Bloom
              kernelSize={KernelSize.HUGE}
              luminanceThreshold={0}
              luminanceSmoothing={0}
              intensity={0.5}
            />
          </EffectComposer>
        </Suspense>
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

export default Portal3d;
