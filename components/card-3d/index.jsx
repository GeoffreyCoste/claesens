'use client';

import styles from './style.module.scss';
import {Canvas} from '@react-three/fiber';
import {
  Environment,
  CameraControls,
  Lightformer,
  Instances
} from '@react-three/drei';
import CardWithHole from './card-with-hole';
import Globe from './globe';
import Sphere from './sphere';
import {spheres} from './data';

const Card3d = () => {
  return (
    <div className={styles.card_3d}>
      <Canvas
        camera={{position: [0, 0, 7], fov: 35, near: 1, far: 50}}
        gl={{antialias: true, stencil: true}}
      >
        {/* <ambientLight intensity={10} />
        <pointLight position={[10, 10, 10]} /> */}
        <color attach="background" args={['#ffffff']}></color>
        <CardWithHole />
        <Globe>
          <Instances>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshBasicMaterial depthTest={false} color={0x000000} />
            {spheres.map(([scale, color, speed, position], index) => (
              <Sphere
                key={index}
                scale={scale}
                color={color}
                speed={speed}
                position={position}
              />
            ))}
          </Instances>
        </Globe>
        <CameraControls
          truckSpeed={0}
          dollySpeed={0}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
        <Environment resolution={512}>
          <group rotation={[-Math.PI / 3, 0, 0]}>
            <Lightformer
              intensity={4}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={[10, 10, 1]}
            />
            {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
              <Lightformer
                key={i}
                form="circle"
                intensity={4}
                rotation={[Math.PI / 2, 0, 0]}
                position={[x, 4, i * 4]}
                scale={[4, 1, 1]}
              />
            ))}
            <Lightformer
              intensity={2}
              rotation-y={Math.PI / 2}
              position={[-5, 1, -1]}
              scale={[50, 2, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-y={-Math.PI / 2}
              position={[10, 1, 0]}
              scale={[50, 2, 1]}
            />
          </group>
        </Environment>
      </Canvas>
    </div>
  );
};

export default Card3d;
