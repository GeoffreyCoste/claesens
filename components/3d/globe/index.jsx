import {MeshTransmissionMaterial} from '@react-three/drei';

const Globe = ({props}) => {
  return (
    <group {...props} dispose={null}>
      <mesh castShadow position={[0, 0, 0]}>
        <sphereGeometry args={[3, 32, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={5}
          thickness={3}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>
      {/* <group ref={ref}>{children}</group> */}
    </group>
  );
};

export default Globe;
