const Geometry = ({scale}) => {
  return (
    <mesh scale={scale} castShadow receiveShadow>
      <sphereGeometry args={[1, 28, 28]} />
      <meshStandardMaterial color={'#FCE300'} roughness={0} metalness={0} />
      {/* <meshPhongMaterial
        color={'#a6a6a6'}
        emissive={'#fce300'}
        specular={'#a1a1a1'}
        shininess={1}
      /> */}
    </mesh>
  );
};

export default Geometry;
