'use client';

import {useState, useRef, useEffect} from 'react';
import {Float, MeshTransmissionMaterial, Sphere} from '@react-three/drei';
import gsap from 'gsap';

const Geometry = () => {
  const [yPosition, setYPosition] = useState(-0.75);
  const [hovered, setHovered] = useState(false);

  const sphereRef = useRef(null);

  const [floatParams, setFloatParams] = useState({
    speed: 1,
    rotationIntensity: 0.5,
    floatIntensity: 1,
    floatingRange: [0.25, 1]
  });

  const handleClick = () => {
    setHovered(true);
    setTimeout(() => {
      setHovered(false);
    }, 2000);
  };

  useEffect(() => {
    const sphere = sphereRef.current;
    if (!sphere) return;

    sphere.position.z = -10;

    // Function to start the animation
    const handleStart = () => {
      if (!sphere) return;

      gsap.fromTo(
        sphere.position,
        {z: -6},
        {z: -3, duration: 2, ease: 'bounce.out'}
      );

      // Animate opacity fade-in
      gsap.fromTo(
        sphere.material,
        {opacity: 0},
        {opacity: 1, duration: 2, ease: 'bounce.out'}
      );
    };

    // Function to resize the sphere based on window width
    const handleResize = () => {
      if (sphere) {
        if (window.innerWidth >= 768 && window.innerWidth < 1200) {
          gsap.to(sphere.scale, {
            x: 1.5, // Double the size along the x-axis
            y: 1.5, // Double the size along the y-axis
            z: 1.5, // Double the size along the z-axis
            duration: 1,
            ease: 'power3.out'
          });

          setYPosition(0);

          setFloatParams({
            speed: 1, // Decrease speed
            rotationIntensity: 0.5, // Same rotation
            floatIntensity: 0.5, // Lower floating motion
            floatingRange: [-0.5, 0.5] // Reduced floating range
          });
        } else if (window.innerWidth >= 1200) {
          gsap.to(sphere.scale, {
            x: 2.25, // Double the size along the x-axis
            y: 2.25, // Double the size along the y-axis
            z: 2.25, // Double the size along the z-axis
            duration: 1,
            ease: 'power3.out'
          });

          setYPosition(0);

          setFloatParams({
            speed: 0.5, // Decrease speed
            rotationIntensity: 0.5, // Same rotation
            floatIntensity: 0.5, // Lower floating motion
            floatingRange: [-0.5, 0.5] // Reduced floating range
          });
        } else {
          gsap.to(sphere.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1,
            ease: 'power3.out'
          });

          setYPosition(-0.75);

          setFloatParams({
            speed: 1, // Default speed
            rotationIntensity: 1, // Default rotation
            floatIntensity: 1, // Default floating motion
            floatingRange: [0.25, 1] // Default floating range
          });
        }
      }
    };

    // Use gsap.delayedCall to ensure that the animation starts after a slight delay
    gsap.delayedCall(0.1, handleStart); // The 0.1 second delay is to ensure that the component is mounted
    window.addEventListener('resize', handleResize);
    handleResize(); // Trigger the resize handler initially

    return () => {
      gsap.killTweensOf(sphereRef.current); // Cleaning the tweens during disassembly
    };
  }, []);

  /* return (
    <Sphere
      ref={sphereRef}
      castShadow
      receiveShadow
      position={[0, yPosition, -3]}
      args={[1, 64, 64]}
    >
      <meshPhysicalMaterial
        color="#bdbdbd"
        roughness={0}
        metalness={0}
        transmission={1}
        ior={1}
      />
    </Sphere>
  ); */

  return (
    <Float
      speed={floatParams.speed} // Animation speed, defaults to 1
      rotationIntensity={floatParams.rotationIntensity} // XYZ rotation intensity, defaults to 1
      floatIntensity={floatParams.floatIntensity} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={floatParams.floatingRange} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <Sphere
        ref={sphereRef}
        castShadow
        receiveShadow
        position={[0, yPosition, -3]}
        args={[1, 64, 64]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <meshPhysicalMaterial
          // color="#bdbdbd"
          color={hovered ? '#DFCB1B' : '#bdbdbd'}
          roughness={0}
          metalness={0}
          transmission={1}
          ior={1}
        />
      </Sphere>
    </Float>
  );
};

export default Geometry;
