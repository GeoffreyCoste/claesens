import {Shape, ExtrudeGeometry} from 'three';
import {Text, useTexture} from '@react-three/drei';
import {MeshPhysicalMaterial, TextureLoader} from 'three';

const Card = ({text, positionZ, holeRadius}) => {
  const texture = useTexture('/3d/textures/leather_red_02_ao_1k.jpg'); // Load texture

  // Create the card shape with a hole
  const shape = new Shape();
  const width = 8;
  const height = 8;
  shape.moveTo(-width / 2, -height / 2);
  shape.lineTo(width / 2, -height / 2);
  shape.lineTo(width / 2, height / 2);
  shape.lineTo(-width / 2, height / 2);
  shape.lineTo(-width / 2, -height / 2);

  const hole = new Shape();
  hole.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const extrudeSettings = {
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 2
  };

  return (
    <mesh position={[0, 0.25, positionZ]}>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0.1}
        roughness={0.1}
        transmission={0.9}
        thickness={0.5}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        map={texture}
      />
      <Text
        position={[width / 2 - 0.5, height / 2 - 0.5, 0.1]}
        rotation={[0, 0, Math.PI / 2]}
        fontSize={0.5}
        color="#000000"
      >
        {text}
      </Text>
    </mesh>
  );
};
export default Card;
