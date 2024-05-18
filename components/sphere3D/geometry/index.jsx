const Geometry = ({scale}) => {
  return (
    <mesh scale={scale} castShadow receiveShadow>
      <sphereGeometry args={[1, 28, 28]} />
      {/* <meshLambertMaterial color={'#d4ca6c'} emissive={'#fce300'} /> */}
      <meshPhongMaterial
        color={'#a6a6a6'}
        emissive={'#fce300'}
        specular={'#a1a1a1'}
        shininess={1}
      />
    </mesh>
  );
};

export default Geometry;
