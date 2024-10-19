'use client';

import {useRef} from 'react';
import {MathUtils} from 'three';
import {Instances} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import Sphere from '../sphere';

const getRandomPositionInSphere = (radius) => {
  let x, y, z;
  do {
    x = (Math.random() * 2 - 1) * radius;
    y = (Math.random() * 2 - 1) * radius;
    z = (Math.random() * 2 - 1) * radius;
  } while (x * x + y * y + z * z > radius * radius);
  return [x, y, z];
};

const generateSpheres = (count, radius) => {
  return Array.from({length: count}, () => ({
    position: getRandomPositionInSphere(radius),
    velocity: [
      MathUtils.randFloatSpread(0.1),
      MathUtils.randFloatSpread(0.1),
      MathUtils.randFloatSpread(0.1)
    ],
    scale: 1,
    color: '#fce300'
  }));
};

/* const spheres = Array.from({length: 20}, () => ({
  position: getRandomPositionInSphere(2.5),
  scale: 1,
  speed: MathUtils.randFloat(0.01, 0.75),
  color: '#fce300'
})); */

const Spheres = () => {
  const spheresRef = useRef(generateSpheres(15, 2));

  useFrame(() => {
    const radius = 3;
    const newSpheres = [...spheresRef.current];

    // Update positions
    newSpheres.forEach((sphere) => {
      for (let i = 0; i < 3; i++) {
        sphere.position[i] += sphere.velocity[i];

        // Collision with globe borders
        if (sphere.position[i] > radius || sphere.position[i] < -radius) {
          sphere.velocity[i] *= -1;
        }
      }
    });

    // Detect collisions between spheres
    for (let i = 0; i < newSpheres.length; i++) {
      for (let j = i + 1; j < newSpheres.length; j++) {
        const dx = newSpheres[i].position[0] - newSpheres[j].position[0];
        const dy = newSpheres[i].position[1] - newSpheres[j].position[1];
        const dz = newSpheres[i].position[2] - newSpheres[j].position[2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < 0.9) {
          // 0.45 (radius) * 2 = 0.9
          // Reverse speed
          for (let k = 0; k < 3; k++) {
            const temp = newSpheres[i].velocity[k];
            newSpheres[i].velocity[k] = newSpheres[j].velocity[k];
            newSpheres[j].velocity[k] = temp;
          }
        }
      }
    }

    spheresRef.current = newSpheres;
  });

  return (
    <Instances limit={20}>
      <sphereGeometry args={[0.45, 64, 64]} />
      {/* <meshBasicMaterial depthTest={false} color={0xfce300} /> */}
      <meshStandardMaterial
        depthTest={false}
        color={0xfce300}
        emissive={0x000000}
        metalness={1}
        roughness={0.75}
      />
      {spheresRef.current.map((sphere, index) => (
        <Sphere key={index} {...sphere} />
      ))}
    </Instances>
  );
};

export default Spheres;

/* const spheres = Array.from({length: 50}, () => {
  factor: MathUtils.randInt(20, 100);
  speed: MathUtils.randFloat(0.01, 0.75);
  xFactor: MathUtils.randFloatSpread(40);
  yFactor: MathUtils.randFloatSpread(10);
  zFactor: MathUtils.randFloatSpread(10);
}); */
