'use client';

import styles from './style.module.scss';
import {useState, useRef, useEffect, Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {Environment, Sphere, Sparkles} from '@react-three/drei';
import ShaderLens from './shader-lens';
import PointsParticles from './points-particles';

const Canvas3d = () => {
  const [dimensions, setDimensions] = useState({width: 0, height: 0});

  const containerRef = useRef(null);

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const {width, height} = containerRef.current.getBoundingClientRect();
        setDimensions({width, height});
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{antialias: true}}
        camera={{position: [0, 0, 20], fov: 20}}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />

          <ShaderLens dimensions={dimensions} />
          <PointsParticles />

          {/* Sphere casting shadow */}
          {/* <Sphere
            castShadow
            receiveShadow
            args={[1, 32, 32]}
            position={[0, 0, 0]}
          >
            <meshStandardMaterial
              color={'#D8C324'}
              roughness={0}
              metalness={0}
              emissive={'#FC9200'}
              emissiveIntensity={0.6}
            />
            <Sparkles
              count={50}
              size={10}
              speed={1}
              color={'#fce300'}
              scale={5}
            />
          </Sphere> */}

          {/* Environment */}
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Canvas3d;
