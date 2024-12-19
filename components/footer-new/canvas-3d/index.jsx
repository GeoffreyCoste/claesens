'use client';

import styles from './style.module.scss';
import {useState, useRef, useEffect, Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {Environment} from '@react-three/drei';
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
          {/* <PointsParticles /> */}

          {/* Environment */}
          <Environment background={false} preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Canvas3d;
