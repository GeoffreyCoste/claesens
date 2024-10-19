import {Float, Instance} from '@react-three/drei';

const Sphere = ({position, scale = 1, speed = 0.1, color = 'white'}) => {
  return (
    <Float rotationIntensity={40} floatIntensity={20} speed={speed / 2}>
      <Instance position={position} scale={scale} color={color} />
    </Float>
  );
};

export default Sphere;
