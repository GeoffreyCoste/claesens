'use client';

import {useRef, useMemo} from 'react';
import {Points} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
/* import * as THREE from 'three'; */

const PointsParticles = () => {
  const particleCount = 100;

  // References to manipulate positions
  const pointsRef = useRef();

  // Generate particles positions and colors
  const particles = useMemo(() => {
    const positions = [];
    const velocities = [];
    const sizes = [];
    const colors = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 6;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 6;
      positions.push(x, y, z);

      // Add initial random speed
      velocities.push(
        (Math.random() - 0.5) * 0.002, // Speed on X
        (Math.random() - 0.5) * 0.002, // Speed on Y
        (Math.random() - 0.5) * 0.002 // Speed on Z
      );

      // Random size
      sizes.push(Math.random() * 0.5 + 0.3); // Size between 0.1 and 0.3

      // Add color gradient or random colors
      colors.push(0.98, 0.89, 1); // RGB for yellow/orange
    }
    return {
      positions: new Float32Array(positions),
      velocities: new Float32Array(velocities),
      sizes: new Float32Array(sizes),
      colors: new Float32Array(colors)
    };
  }, []);

  // Animate particles
  useFrame(() => {
    const positions = particles.positions;
    const velocities = particles.velocities;

    for (let i = 0; i < positions.length; i += 3) {
      // Update positions with speed
      positions[i] += velocities[i]; // X
      positions[i + 1] += velocities[i + 1]; // Y
      positions[i + 2] += velocities[i + 2]; // Z

      // Check if particle get out of the limit (i.e., cube of 6 units)
      if (Math.abs(positions[i]) > 3) velocities[i] *= -1; // Rever X speed
      if (Math.abs(positions[i + 1]) > 3) velocities[i + 1] *= -1; // Revert Y speed
      if (Math.abs(positions[i + 2]) > 3) velocities[i + 2] *= -1; // Revert Z speed
    }

    // Update positions inside buffer
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points
      ref={pointsRef}
      positions={particles.positions}
      colors={particles.colors}
      stride={3}
      frustumCulled={false}
    >
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        // blending={THREE.AdditiveBlending} // Ajoute la lumière des particules
        // depthWrite={false}
        // alphaTest={0.5}
        // sizeAttenuation
      />
    </Points>
  );
};

export default PointsParticles;
