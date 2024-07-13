import {useRef} from 'react';
import * as THREE from 'three';
import {useTexture} from '@react-three/drei';

const CardWithHole = () => {
  const meshRef = useRef(null);

  // Load texture
  const texture = useTexture('/3d/textures/PlasticMoldDryBlast002_REFL_1K.png');

  // Create card with rounded corners and a center hole
  const shape = new THREE.Shape();
  const width = 2.5;
  const height = 3.75;
  const radius = 0.1; // rounded corner radius
  const holeWidth = 2;
  const holeHeight = 2;
  const holeRadius = 0.1; // rounded corner radius for the hole

  // Draw rounded corners
  shape.moveTo(-width / 2 + radius, -height / 2);
  shape.lineTo(width / 2 - radius, -height / 2);
  shape.absarc(
    width / 2 - radius,
    -height / 2 + radius,
    radius,
    -Math.PI / 2,
    0,
    false
  );
  shape.lineTo(width / 2, height / 2 - radius);
  shape.absarc(
    width / 2 - radius,
    height / 2 - radius,
    radius,
    0,
    Math.PI / 2,
    false
  );
  shape.lineTo(-width / 2 + radius, height / 2);
  shape.absarc(
    -width / 2 + radius,
    height / 2 - radius,
    radius,
    Math.PI / 2,
    Math.PI,
    false
  );
  shape.lineTo(-width / 2, -height / 2 + radius);
  shape.absarc(
    -width / 2 + radius,
    -height / 2 + radius,
    radius,
    Math.PI,
    1.5 * Math.PI,
    false
  );

  // Square with rounded corners hole at center
  const hole = new THREE.Shape();
  hole.moveTo(-holeWidth / 2 + holeRadius, -holeHeight / 2);
  hole.lineTo(holeWidth / 2 - holeRadius, -holeHeight / 2);
  hole.absarc(
    holeWidth / 2 - holeRadius,
    -holeHeight / 2 + holeRadius,
    holeRadius,
    -Math.PI / 2,
    0,
    false
  );
  hole.lineTo(holeWidth / 2, holeHeight / 2 - holeRadius);
  hole.absarc(
    holeWidth / 2 - holeRadius,
    holeHeight / 2 - holeRadius,
    holeRadius,
    0,
    Math.PI / 2,
    false
  );
  hole.lineTo(-holeWidth / 2 + holeRadius, holeHeight / 2);
  hole.absarc(
    -holeWidth / 2 + holeRadius,
    holeHeight / 2 - holeRadius,
    holeRadius,
    Math.PI / 2,
    Math.PI,
    false
  );
  hole.lineTo(-holeWidth / 2, -holeHeight / 2 + holeRadius);
  hole.absarc(
    -holeWidth / 2 + holeRadius,
    -holeHeight / 2 + holeRadius,
    holeRadius,
    Math.PI,
    1.5 * Math.PI,
    false
  );
  shape.holes.push(hole);

  const extrudeSettings = {
    depth: 0.05,
    bevelEnabled: false
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const material = new THREE.MeshStandardMaterial({color: 0xff0000});

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={[0, 0, 0]}
    >
      <meshStandardMaterial attach="material" />
    </mesh>
  );
};

export default CardWithHole;
