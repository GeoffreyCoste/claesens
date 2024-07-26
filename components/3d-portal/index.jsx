'use client';

import styles from './style.module.scss';
import {useRef, useMemo, Suspense} from 'react';
import {Canvas, useLoader, useFrame} from '@react-three/fiber';
import {
  Environment,
  CameraControls,
  useTexture,
  useGLTF,
  OrbitControls,
  Reflector,
  Backdrop,
  MeshReflectorMaterial,
  MeshTransmissionMaterial,
  Lightformer,
  SpotLight,
  SpotLightShadow,
  RoundedBox,
  Stage
} from '@react-three/drei';
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader';
import {Bloom, EffectComposer} from '@react-three/postprocessing';
import {KernelSize} from 'postprocessing';
import * as THREE from 'three';

/* const Circle = ({color, ...props}) => {
  const circleRef = useRef(null);

  const {
    paths: [path]
  } = useLoader(SVGLoader, '/images/circle.svg');

  console.log(path);

  const geometry = useMemo(() => {
    if (!path) return null;
    const points = path.subPaths[0].getPoints();
    console.log('Points:', points); // Vérifiez les points du chemin

    return SVGLoader.pointsToStroke(points, path.userData.style);
  }, [path]);

  if (!geometry) return null;

  return (
    <group ref={circleRef}>
      <mesh geometry={geometry} {...props}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}; */

/* const Ring = () => {
  const ringRef = useRef(null);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh ref={ringRef}>
      <ringGeometry args={[4.5, 5, 64]} />
      <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
    </mesh>
  );
}; */

const Ring = ({geometryArgs, materialProps}) => {
  const ringRef = useRef(null);

  /* useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
    }
  }); */

  return (
    <mesh ref={ringRef}>
      <ringGeometry args={geometryArgs} />
      <meshBasicMaterial {...materialProps} />
    </mesh>
  );
};

/* const Waves = () => {
  const materialRef = useRef();

  useFrame(({clock}) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  const uniforms = {
    u_time: {value: 0.0}
  };

  return (
    <mesh>
      <ringGeometry args={[4, 4.5, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float u_time;
          varying vec2 vUv;

          void main() {
            float dist = distance(vUv, vec2(0.5, 0.5));
            float wave = sin(dist * 30.0 - u_time * 5.0) * 0.5 + 0.5;
            wave = smoothstep(0.4, 0.5, wave);
            gl_FragColor = vec4(0.0, 0.0, 1.0, wave);
          }
        `}
        side={THREE.DoubleSide}
        transparent={true}
      />
    </mesh>
  );
}; */

/* const Ground = (props) => {
  const [floor, normal] = useTexture([
    '/MetalZincGalvanized001_ROUGHNESS_1K_METALNESS.png',
    '/MetalZincGalvanized001_NRM_1K_METALNESS.png'
  ]);
  return (
    <Reflector resolution={1024} args={[12, 18]} {...props}>
      {(Material, props) => (
        <Material
          color="#9a9999"
          metalness={0}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={[2, 2]}
          {...props}
        />
      )}
    </Reflector>
  );
}; */

const ReflectiveFloor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={2048}
        mixBlur={1}
        mixStrength={80}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#050505"
        metalness={0.5}
      />
    </mesh>
  );
};

const Floor = ({props}) => {
  const [floor, normal] = useTexture([
    '/MetalZincGalvanized001_ROUGHNESS_1K_METALNESS.png',
    '/MetalZincGalvanized001_NRM_1K_METALNESS.png'
  ]);

  return (
    <group {...props} dispose={null}>
      <mesh castShadow position={[0, -6, 4]}>
        <planeGeometry args={[60, 10, 32]} />
        <MeshTransmissionMaterial
          backside={false}
          samples={3}
          thickness={3}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.1}
          temporalDistortion={0.2}
          roughness={0}
          roughnessMap={floor}
          normalMap={normal}
          // emissive="#1f1d13"
          // color="#fce300"
          // iridescence={1}
          // iridescenceIOR={1}
          // iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>
      {/* <mesh castShadow position={[0, -6, 4]}>
        <planeGeometry args={[60, 10, 32]} />
        <MeshTransmissionMaterial
          backside={false}
          samples={3}
          thickness={3}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.8}
          distortionScale={0.5}
          temporalDistortion={0.5}
          roughness={0}
          roughnessMap={floor}
          normalMap={normal}
          reflectivity={0.0125}
          color="#ffffff"
          // emissive="#0c0c0c"
          // color="#fce300"
          // iridescence={1}
          // iridescenceIOR={1}
          // iridescenceThicknessRange={[0, 1400]}
        />
      </mesh> */}
    </group>
  );
};

const Model = ({path, position, rotation, scale, color}) => {
  const {scene} = useGLTF(path);
  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
      color={color}
    />
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
        // emissive="#1f1d13"
        // color="#fce300"
        // iridescence={1}
        // iridescenceIOR={1}
        // iridescenceThicknessRange={[0, 1400]}
      />
    </RoundedBox>
  );
};

const Portal3d = () => {
  const reflectiveFloorRef = useRef(null);
  return (
    <div className={styles.portal_3d}>
      <div className={styles.portal_3d_container}>
        <Canvas shadows dpr={[1, 1.5]} camera={{position: [0, 0, 15]}}>
          {/* <color attach="background" args={['#101010']} /> */}
          {/* <color attach="background" args={['#191920']} /> */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight
            position={[0, 5, -5]}
            color="#fce300"
            intensity={1}
            distance={1}
            // decay={2}
            lookAt={
              reflectiveFloorRef.current
                ? reflectiveFloorRef.current.position
                : new THREE.Vector3(0, 0, 0)
            }
          />
          {/* <fog attach="fog" args={['#fff', 8.5, 12]} /> */}
          <fog attach="fog" args={['#191920', 0, 32]} />
          <Suspense fallback={null}>
            <Ring
              geometryArgs={[4.5, 5, 64]}
              materialProps={{color: '#ffffff', side: THREE.DoubleSide}}
            />
            {/* <CustomRoundedBox args={[20, 8, 0.2]} position={[0, -6, 3]} /> */}
            {/* <RoundedBox
              args={[20, 8, 4]} // Width, height, depth. Default is [1, 1, 1]
              position={[0, -6, 3]}
              radius={0.5} // Radius of the rounded corners. Default is 0.05
              smoothness={4} // The number of curve segments. Default is 4
              bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
              creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
            >
              {/* <meshPhongMaterial color="#f3f3f3" /> *}
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
                // roughnessMap={floor}
                // normalMap={normal}
                // emissive="#1f1d13"
                // color="#fce300"
                // iridescence={1}
                // iridescenceIOR={1}
                // iridescenceThicknessRange={[0, 1400]}
              />
            </RoundedBox> */}
            {/* <Floor /> */}
            {/* <Model
              path="/pencil.glb"
              position={[0, 0, 0]}
              scale={[0.75, 0.75, 0.75]}
              color="#ffffff"
            /> */}
            <ReflectiveFloor ref={reflectiveFloorRef} />
            {/* <Ground
              mirror={1}
              blur={[500, 100]}
              mixBlur={12}
              mixStrength={1.5}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              position-y={-8}
            /> */}
            {/* <Waves /> */}
            {/* <Circle
              color={'#ffffff'}
              position={[-5, -2, 0]}
              scale={[0.035, 0.035, 0.035]}
            /> */}
            {/* <Environment preset="studio" background blur={0.5} /> */}

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
          {/* <CameraControls
            truckSpeed={0}
            dollySpeed={0}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          /> */}
        </Canvas>
      </div>
    </div>
  );
};

export default Portal3d;
