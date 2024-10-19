import {useRef} from 'react';
import * as THREE from 'three';
import {useFrame} from '@react-three/fiber';
import {BallCollider, RigidBody, CylinderCollider} from '@react-three/rapier';
import Geometry from '../geometry';

const Sphere = ({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread
}) => {
  const sphere = useRef();

  useFrame((state, delta) => {
    if (sphere.current) {
      delta = Math.min(0.1, delta);
      sphere.current.applyImpulse(
        vec
          .copy(sphere.current.translation())
          .normalize()
          .multiply({
            x: -50 * delta * scale,
            y: -150 * delta * scale,
            z: -50 * delta * scale
          })
      );
    }
  });

  return (
    <RigidBody
      ref={sphere}
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      colliders={false}
      dispose={null}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <Geometry scale={scale} />
    </RigidBody>
  );
};

export default Sphere;
