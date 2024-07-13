'use client';

import {useLayoutEffect, useRef} from 'react';
import {MeshTransmissionMaterial, Sphere, useMask} from '@react-three/drei';

const Globe = ({children, ...props}) => {
  const ref = useRef(null);

  const stencil = useMask(1, false);

  useLayoutEffect(() => {
    // Apply stencil to all contents
    ref.current.traverse(
      (child) => child.material && Object.assign(child.material, {...stencil})
    );
  }, [stencil]);

  return (
    <group {...props} dispose={null}>
      <mesh castShadow scale={[0.61 * 6, 0.8 * 6, 1 * 6]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={5}
          thickness={3}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>
      <group ref={ref}>{children}</group>
    </group>
  );
};

export default Globe;

/* 'use client';

import {useLayoutEffect, useRef} from 'react';
import {Sphere, useMask} from '@react-three/drei';

const Globe = ({children}) => {
  const ref = useRef(null);

  const stencil = useMask(1, false);

  useLayoutEffect(() => {
    // Apply stencil to all contents
    ref.current.traverse(
      (child) => child.material && Object.assign(child.material, {...stencil})
    );
  }, [stencil]);

  return (
    <Sphere args={[0.9, 32, 32]} position={[0, 0, 0]}>
      <meshPhysicalMaterial
        transmission={1}
        roughness={0}
        thickness={0.5}
        clearcoat={1}
        clearcoatRoughness={0}
        reflectivity={1}
      />
      <group ref={ref}>{children}</group>
    </Sphere>
  );
};

export default Globe; */
