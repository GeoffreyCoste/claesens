'use client';

import {Float, Instance} from '@react-three/drei';

const Sphere = ({position, scale = 1, speed = 0.1, color = '#fce300'}) => {
  return (
    <Float rotationIntensity={2} floatIntensity={2} speed={4}>
      <Instance position={position} scale={scale} color={color} />
    </Float>
  );
};

export default Sphere;
