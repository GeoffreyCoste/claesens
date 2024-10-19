'use client';

import styles from './style.module.scss';
import {
  useState,
  useRef,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo
} from 'react';
import useMediaQueries from '@/hooks/useMediaQueries';
import {Canvas, useThree, useFrame} from '@react-three/fiber';
import {PerformanceMonitor, Points, PointMaterial} from '@react-three/drei';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParticlesScene3d = () => {
  const [degraded, degrade] = useState(false);

  const canvasContainerRef = useRef(null);
  const sphereContainerRef = useRef(null);

  return (
    <div className={styles.scene} ref={canvasContainerRef}>
      <Canvas
        shadows
        dpr={[1, degraded ? 1.5 : 2]}
        camera={{position: [0, 0, -4], fov: 35, near: 1, far: 50}}
      >
        <PerformanceMonitor onDecline={() => degrade(true)} />
        <group
          ref={sphereContainerRef}
          position={[0, -0.5, 0]}
          rotation={[0, -0.75, 0]}
        >
          <Scene />
        </group>
        <ZoomOnScroll ref={{canvasContainerRef, sphereContainerRef}} />
      </Canvas>
    </div>
  );
};

const ZoomOnScroll = forwardRef(function ZoomOnScroll(
  props,
  {canvasContainerRef, sphereContainerRef}
) {
  const {camera} = useThree();

  useLayoutEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    const sphereContainer = sphereContainerRef.current;

    const position = camera.position;

    if (!canvasContainer || !sphereContainer || !position) return;

    const ctx = gsap.context(() => {
      gsap.to(position, {
        z: -20,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: canvasContainer,
          start: 'top 50%',
          end: 'top top',
          scrub: true
        }
      });

      gsap.to(sphereContainer, {
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: canvasContainer,
          start: '50% 50%',
          end: 'bottom top',
          pin: true,
          pinSpacing: false
        }
      });
    }, canvasContainerRef);

    return () => {
      ctx.revert();
    };
  }, [camera, canvasContainerRef, sphereContainerRef]);
});

const Scene = () => {
  const {mobile} = useMediaQueries();

  const sphereRef = useRef(null);
  const pointsRef = useRef(null);

  const numberOfPoints = mobile ? 1000 : 3000;

  const points = useMemo(() => {
    const positions = new Float32Array(numberOfPoints * 3);
    for (let i = 0; i < numberOfPoints; i++) {
      const theta = Math.random() * Math.PI * 2; // Azimuth angle
      const phi = Math.acos(Math.random() * 2 - 1); // Polar angle

      // Spherical Coordinates
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);

      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [numberOfPoints]);

  useFrame((state, delta) => {
    if (sphereRef.current) {
      // Apply rotation around Z axis to all points
      sphereRef.current.rotation.y += 0.001;
    }

    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();

      const positions = pointsRef.current.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        const indexOffset = i / 3; // Point index
        const amplitude = 0.0002; // Float amplitude
        const frequency = 2; // Float frequency

        // Evaluate float move for each point
        positions[i + 1] +=
          Math.sin(time * frequency + indexOffset * 0.5) * amplitude; // Float on Y axis
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  useEffect(() => {
    // Capture current value in a local variable
    const pointsGeometry = pointsRef.current
      ? pointsRef.current.geometry
      : null;

    // Cleanup function
    return () => {
      if (pointsGeometry) {
        pointsGeometry.dispose(); // Frees resources if pointsGeometry exists
      }
    };
  }, [numberOfPoints]);

  return (
    <group ref={sphereRef} position={[0, 0, 0]}>
      <Points
        ref={pointsRef}
        positions={points}
        stride={3}
        frustumCulled={false}
        scale={mobile ? [3, 3, 3] : [4, 4, 4]}
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={2}
          sizeAttenuation={false}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default ParticlesScene3d;

/* 'use client';

import styles from './style.module.scss';
import {useState, useRef, forwardRef, useLayoutEffect, useMemo} from 'react';
import useMediaQueries from '@/hooks/useMediaQueries';
import {Canvas, useThree, useFrame} from '@react-three/fiber';
import {PerformanceMonitor, Points, PointMaterial} from '@react-three/drei';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParticlesScene3d = () => {
  const [degraded, degrade] = useState(false);

  const canvasContainerRef = useRef(null);
  const sphereContainerRef = useRef(null);

  return (
    <div className={styles.scene} ref={canvasContainerRef}>
      <Canvas
        shadows
        dpr={[1, degraded ? 1.5 : 2]}
        camera={{position: [0, 0, -4], fov: 35, near: 1, far: 50}}
      >
        <PerformanceMonitor onDecline={() => degrade(true)} />
        <group
          ref={sphereContainerRef}
          position={[0, -0.5, 0]}
          rotation={[0, -0.75, 0]}
        >
          <Scene />
        </group>
        <ZoomOnScroll ref={{canvasContainerRef, sphereContainerRef}} />
      </Canvas>
    </div>
  );
};

const ZoomOnScroll = forwardRef(function ZoomOnScroll(props, ref) {
  const {camera} = useThree();

  useLayoutEffect(() => {
    const canvasContainer = ref.canvasContainerRef.current;
    const sphereContainer = ref.sphereContainerRef.current;

    const position = camera.position;

    if (!canvasContainer || !sphereContainer || !position) return;

    const ctx = gsap.context(() => {
      gsap.to(position, {
        z: -20,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: canvasContainer,
          start: 'top 50%',
          end: 'top top',
          scrub: true
        }
      });

      gsap.to(sphereContainer, {
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: canvasContainer,
          start: '50% 50%',
          end: 'bottom top',
          pin: true,
          pinSpacing: false
        }
      });
    }, [camera, ref]);

    return () => {
      ctx.revert();
    };
  }, [camera, ref]);
});

const Scene = () => {
  const {mobile} = useMediaQueries();

  const sphereRef = useRef(null);
  const pointsRef = useRef(null);

  const numberOfPoints = mobile ? 1000 : 3000;

  const points = useMemo(() => {
    const positions = new Float32Array(numberOfPoints * 3);
    for (let i = 0; i < numberOfPoints; i++) {
      const theta = Math.random() * Math.PI * 2; // Azimuth angle
      const phi = Math.acos(Math.random() * 2 - 1); // Polar angle

      // Spherical Coordinates
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);

      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [numberOfPoints]);

  useFrame((state, delta) => {
    if (sphereRef.current) {
      // Apply rotation around Z axis to all points
      sphereRef.current.rotation.y += 0.001;
    }

    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();

      const positions = pointsRef.current.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        const indexOffset = i / 3; // Point index
        const amplitude = 0.0002; // Float amplitude
        const frequency = 2; // Float frequency

        // Evaluate float move for each point
        positions[i + 1] +=
          Math.sin(time * frequency + indexOffset * 0.5) * amplitude; // Float on Y axis
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={sphereRef} position={[0, 0, 0]}>
      <Points
        ref={pointsRef}
        positions={points}
        stride={3}
        frustumCulled={false}
        scale={mobile ? [3, 3, 3] : [4, 4, 4]}
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={2}
          sizeAttenuation={false}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default ParticlesScene3d; */
