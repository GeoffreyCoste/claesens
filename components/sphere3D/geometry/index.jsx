'use client';

const Geometry = ({scale}) => {
  return (
    <mesh scale={scale} castShadow receiveShadow>
      <sphereGeometry args={[1, 28, 28]} />
      <meshStandardMaterial color={'#FCE300'} roughness={0} metalness={0} />
    </mesh>
  );
};

export default Geometry;
