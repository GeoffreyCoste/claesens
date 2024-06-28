import {useRef} from 'react';
import * as THREE from 'three';
import {useFrame} from '@react-three/fiber';
import {RigidBody, BallCollider} from '@react-three/rapier';

const Pointer = ({vec = new THREE.Vector3()}) => {
  const ref = useRef();
  useFrame(({pointer, viewport}) => {
    vec.lerp(
      {
        x: (pointer.x * viewport.width) / 2,
        y: (pointer.y * viewport.height) / 2,
        z: 0
      },
      0.2
    );
    ref.current?.setNextKinematicTranslation(vec);
  });
  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
};

export default Pointer;
