'use client';

import React, {useRef, useLayoutEffect, forwardRef, Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  useTexture,
  Sphere,
  Ring,
  Circle
} from '@react-three/drei';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

const Scene = forwardRef(function Scene(props, refs) {
  const circleRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const groupRef = useRef(null);
  const spheresRef = useRef([]);

  const radius = 4; // Radius of invisible circle used for positioning
  const positions = [
    [radius, 0, 0],
    [0, 0, -radius],
    [-radius, 0, 0],
    [0, 0, radius]
  ];

  // Loading textures
  const textures = useTexture([
    '/images/texture_0.jpg',
    '/images/texture_1.jpg',
    '/images/texture_2.jpg',
    '/images/texture_3.jpg'
  ]);

  useLayoutEffect(() => {
    let container;
    let canvas;
    let circle;
    let ring1;
    let ring2;
    let group;
    let spheres = [];

    if (refs.containerRef.current) {
      container = refs.containerRef.current;
    }

    if (refs.canvasRef.current) {
      canvas = refs.canvasRef.current;
    }

    if (circleRef.current) {
      circle = circleRef.current;
      // ring.material.color = {r: 0, g: 0, b: 0};
      console.log('Circle: ', circle);
    }

    if (ring1Ref.current) {
      ring1 = ring1Ref.current;
      // ring.material.color = {r: 0, g: 0, b: 0};
      console.log('Ring1: ', ring1);
    }

    if (ring2Ref.current) {
      ring2 = ring2Ref.current;
      // ring.material.color = {r: 0, g: 0, b: 0};
      console.log('Ring2: ', ring2);
    }

    if (groupRef.current) {
      group = groupRef.current;
      console.log('Group: ', group);
    }

    const xOffsets = [0.4, -0.1, -0.6, 0.9];

    if (spheresRef.current) {
      spheres = spheresRef.current;
      console.log('Spheres: ', spheres);
      spheres.forEach((sphere, index) => {
        const texture = sphere.material.map;

        const xOffset = xOffsets[index];
        texture.offset.set(xOffset, 0);
        texture.repeat.set(2, 2);
        texture.center.set(0.5, 0.5);
        texture.needsUpdate = true;

        console.log(`Texture ${index}: `, texture);
      });
    }

    gsap.registerPlugin(ScrollTrigger);

    const totalScroll = 700; // Total scroll distance (800vh)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${totalScroll + 100}vh`,
        scrub: true,
        pin: canvas,
        pinSpacing: true
        // markers: true
      }
    });

    if (Array.isArray(spheres)) {
      spheres.forEach((sphere, index) => {
        // Sphere opacity animation
        tl.fromTo(
          sphere.material,
          {opacity: 0},
          {
            opacity: 1,
            duration: 3.5,
            delay: index * 100,
            ease: 'slow(0.2,0.9,false)',
            scrollTrigger: {
              trigger: container,
              start: 'top+=225vh top',
              end: '+=50vh',
              scrub: true
            }
          }
        );

        // Sphere scale animation
        tl.fromTo(
          sphere.scale,
          {x: 0, y: 0, z: 0},
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 5,
            delay: index * 100,
            ease: 'slow(0.2,0.9,false)',
            scrollTrigger: {
              trigger: container,
              start: 'top+=225vh top',
              end: '+=50vh',
              scrub: true
            }
          }
        );

        // Hide the first sphere at the end of the last rotation
        if (index === 0) {
          tl.fromTo(
            sphere.material,
            {opacity: 1}, // Start with full opacity
            {
              opacity: 0, // Fade out the first sphere
              duration: 1.5,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: container,
                start: 'top+=300vh top', // Start towards the end of the scroll
                end: 'top+=400vh', // Optionally define an end point
                scrub: true
              }
            }
          );
        }
      });
    }

    // Animate Circle at center
    tl.fromTo(
      circle.scale,
      {x: 0, y: 0, z: 0},
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        ease: 'slow(0.2,0.9,false)',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=100vh',
          scrub: true
        }
      }
    )
      .fromTo(
        circle.material,
        {opacity: 0},
        {
          opacity: 1,
          duration: 1,
          ease: 'slow(0.2,0.9,false)',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=100vh',
            scrub: true
          }
        },
        '-=1'
      )

      // Animate Ring1
      .fromTo(
        ring1.scale,
        {x: 0, y: 0, z: 0},
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.7,
          ease: 'slow(0.2,0.9,false)',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=100vh',
            scrub: true
          }
        }
      )
      .fromTo(
        ring1.material,
        {opacity: 0},
        {
          opacity: 0.7,
          duration: 0.1,
          ease: 'slow(0.2,0.9,false)',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=100vh',
            scrub: true
          }
        },
        '-=0.5'
      )

      // Animate Ring2
      .fromTo(
        ring2.scale,
        {x: 0, y: 0, z: 0},
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.7,
          ease: 'slow(0.2,0.9,false)',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=100vh',
            scrub: true
          }
        }
      )
      .fromTo(
        ring2.material,
        {opacity: 0},
        {
          opacity: 0.7,
          duration: 0.1,
          ease: 'slow(0.2,0.9,false)',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=100vh',
            scrub: true
          }
        },
        '-=0.5'
      )
      // Animate circle scale
      .fromTo(
        circle.scale,
        {x: 1, y: 1, z: 1},
        {
          x: 0.1,
          y: 0.1,
          z: 0.1,
          // duration: 1,
          ease: 'slow(0.2,0.9,false)',
          scrollTrigger: {
            trigger: container,
            start: 'top+=100vh top',
            end: '+=100vh',
            scrub: true
          }
        }
      )
      // Animate circle to right with bouncing effect
      .to(circle.position, {
        x: '+=1.75', // Move circle 2 units right
        duration: 1,
        ease: 'bounce.out',
        scrollTrigger: {
          trigger: container,
          start: 'top+=200vh top',
          end: '+=100vh',
          scrub: true
        }
      });

    // Spheres group rotation animation
    tl.to(group.rotation, {
      y: -270 * (Math.PI / 180), // 270 degrees in radians
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top+=300vh top',
        end: `+=${totalScroll - 300}vh`,
        scrub: true, // Synchronize animation with scroll
        snap: {
          snapTo: 1 / 3, // 3 steps, each quarter of scroll corresponding to 90 degrees (a third of 270 degrees)
          duration: 0.5, // Animation duration when stopping
          ease: 'power2.inOut' // Stop easing
        }
      }
    });

    tl.fromTo(
      spheres[0].material,
      {opacity: 1}, // Start with full opacity
      {
        opacity: 0, // Fade out the first sphere
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: container,
          start: 'top+=400vh top', // Start towards the end of the scroll
          end: 'top+=500vh', // Optionally define an end point
          scrub: true
        }
      }
    );
  }, [
    refs.containerRef,
    refs.canvasRef,
    circleRef,
    ring1Ref,
    ring2Ref,
    groupRef,
    spheresRef
  ]);

  return (
    <>
      <color attach="background" args={['#1e1e1e']} />
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <Environment background={false}>
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
          </group>
        </Environment>

        <Circle args={[0.65, 64]} ref={circleRef} position={[-1.77, 0, 0]}>
          <meshBasicMaterial
            attach="material"
            color="#000000"
            transparent
            opacity={0}
          />
        </Circle>

        <Ring ref={ring1Ref} args={[0.65, 1, 64]} position={[-1.77, 0, -0.01]}>
          <meshBasicMaterial
            attach="material"
            color={'#1e1e1e'}
            transparent
            opacity={0}
          />
        </Ring>

        <Ring ref={ring2Ref} args={[1, 1.4, 64]} position={[-1.77, 0, -0.02]}>
          <meshBasicMaterial
            attach="material"
            color={'#2c2c2c'}
            // opacity={0.7}
            transparent
            opacity={0}
          />
        </Ring>

        <group ref={groupRef} position={[-5.75, 0, 0]}>
          {positions.map((position, index) => (
            <Sphere
              key={index}
              ref={(el) => {
                if (el) spheresRef.current[index] = el;
              }}
              args={[0.5, 32, 32]}
              position={position}
            >
              <meshStandardMaterial
                attach="material"
                color={'#ffffff'}
                roughness={0.1}
                opacity={0}
                transparent
                map={textures[index]}
              />
            </Sphere>
          ))}
        </group>
      </Suspense>
    </>
  );
});

const CanvasMethod = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  return (
    <div
      ref={containerRef}
      style={{width: '100%', height: '900vh', position: 'relative'}}
    >
      <Canvas
        ref={canvasRef}
        camera={{
          position: [0, 0, 5],
          fov: 35
        }}
        gl={{antialias: true}}
        style={{width: '100%', height: '100vh', overflow: 'visible'}}
      >
        <Scene ref={{containerRef, canvasRef}} />
      </Canvas>
    </div>
  );
};

export default CanvasMethod;
