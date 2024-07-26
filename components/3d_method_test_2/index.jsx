'use client';

import styles from './style.module.scss';
import {
  useRef,
  useEffect,
  forwardRef,
  useLayoutEffect,
  useImperativeHandle,
  Suspense
} from 'react';
import * as THREE from 'three';
import {Canvas, useThree, useFrame} from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  CameraControls,
  Sphere,
  MeshTransmissionMaterial,
  useTexture,
  ScrollControls
} from '@react-three/drei';
import {Camera} from 'three';
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Vignette
} from '@react-three/postprocessing';
import {KernelSize} from 'postprocessing';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/all';
import {spheres} from '../card-3d/data';

const Spheres = forwardRef(function Spheres(props, ref) {
  const groupRef = useRef(null);

  const radius = 4; // Rayon du cercle fictif
  const positions = [
    [radius, 0, 0],
    [0, 0, radius],
    [-radius, 0, 0],
    [0, 0, -radius]
  ];

  // Loading textures
  const textures = useTexture([
    '/images/texture_0.jpg',
    '/images/texture_1.jpg',
    '/images/texture_2.jpg',
    '/images/texture_3.jpg'
  ]);

  // Set textures size and position
  /* textures.forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // Répétition de la texture
    texture.repeat.set(1, 1); // Ajustez ceci pour répéter la texture
    texture.offset.set(0, 0); // Décalage initial de la texture
    texture .center.set(0.5, 0.5); // Centre de la texture
  }); */

  useImperativeHandle(ref, () => ({
    // Exposez ici les propriétés ou méthodes que vous souhaitez rendre accessibles au parent
    getElement: () => groupRef.current
  }));

  /* useEffect(() => {
    console.log('Container inside Spheres: ', groupRef.current);
  }, [containerRef]); */

  return (
    <group ref={groupRef}>
      {positions.map((position, index) => (
        <Sphere key={index} args={[1, 32, 32]} position={position}>
          <meshStandardMaterial
            attach="material"
            roughness={0.1}
            map={textures[index]}
          />
        </Sphere>
      ))}
    </group>
  );
});

const SphereCircle = () => {
  const groupRef = useRef(null);

  const radius = 4; // Rayon du cercle fictif
  const positions = [
    [radius, 0, 0],
    [0, 0, radius],
    [-radius, 0, 0],
    [0, 0, -radius]
  ];

  // Loading textures
  const textures = useTexture([
    '/images/texture_0.jpg',
    '/images/texture_1.jpg',
    '/images/texture_2.jpg',
    '/images/texture_3.jpg'
  ]);

  // Set textures size and position
  /* textures.forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // Répétition de la texture
    texture.repeat.set(1, 1); // Ajustez ceci pour répéter la texture
    texture.offset.set(0, 0); // Décalage initial de la texture
    texture.center.set(0.5, 0.5); // Centre de la texture
  }); */

  useEffect(() => {
    console.log(groupRef.current);
  }, []);

  return (
    <group ref={groupRef}>
      {positions.map((position, index) => (
        <Sphere key={index} args={[1, 32, 32]} position={position}>
          <meshStandardMaterial
            attach="material"
            roughness={0.1}
            map={textures[index]}
          />
        </Sphere>
      ))}
    </group>
  );
};

const CameraSetup = () => {
  const {camera} = useThree();

  useEffect(() => {
    camera.lookAt(7, 0, 0);
  }, [camera]);

  return null;
};

const AnimatedSphere = () => {
  const scrollContainerRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const cameraRef = useRef(null);
  const spheresRef = useRef(null);

  // Position du point lumineux fixe au-dessus de la sphère rose
  const lightPosition = [15, 10, 0];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          pin: canvasContainerRef.current,
          pinSpacing: false
        }
      });
    });

    return () => {
      ctx.revert(); // Cleanup animations and ScrollTrigger effects when component unmounts
    };
  }, []);

  useLayoutEffect(() => {
    if (spheresRef.current) {
      const element = spheresRef.current.getElement();
      console.log('Spheres inside AnimatedSpheres: ', element);
    }
  }, []);

  return (
    <div ref={scrollContainerRef} style={{width: '100%', height: '400vh'}}>
      <div ref={canvasContainerRef} style={{width: '100%', height: '100vh'}}>
        <Canvas
          ref={cameraRef}
          camera={{
            position: [9, 0, 5],
            fov: 35
          }}
          gl={{antialias: true}}
        >
          <CameraSetup />
          {/* <EffectComposer>
          <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={5}
            height={480}
          />
          <Bloom
            kernelSize={3}
            luminanceThreshold={0}
            luminanceSmoothing={0.4}
            intensity={0.6}
          />
          <Bloom
            kernelSize={KernelSize.HUGE}
            intensity={2}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            height={1000}
          />
          <Vignette eskil={false} offset={0.1} darkness={1.5} />
        </EffectComposer> */}
          <color attach="background" args={['#1e1e1e']} />
          <ambientLight intensity={0.5} />
          {/* <pointLight position={lightPosition} intensity={500} color="white" /> */}
          {/* <Suspense fallback={null}> */}
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
              {/* <Lightformer
                intensity={2}
                rotation-y={-Math.PI / 2}
                position={[10, 1, 0]}
                scale={[50, 2, 1]}
              /> */}
            </group>
          </Environment>
          {/* <SphereCircle /> */}
          <Spheres ref={spheresRef} />
          {/* </Suspense> */}

          {/* <CameraControls
          truckSpeed={0}
          dollySpeed={0}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        /> */}
        </Canvas>
      </div>
    </div>
  );
};

export default AnimatedSphere;

/* 'use client';

import styles from './style.module.scss';
import {useRef, useEffect, forwardRef, Suspense} from 'react';
import * as THREE from 'three';
import {Canvas, useThree, useFrame} from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  CameraControls,
  Sphere,
  MeshTransmissionMaterial,
  useTexture
} from '@react-three/drei';
import {Camera} from 'three';
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Vignette
} from '@react-three/postprocessing';
import {KernelSize} from 'postprocessing';
import gsap from 'gsap';

const SphereCircle = () => {
  const groupRef = useRef(null);

  const radius = 4; // Rayon du cercle fictif
  const speed = 0.1; // Vitesse de rotation
  const positions = [
    [radius, 0, 0],
    [0, 0, radius],
    [-radius, 0, 0],
    [0, 0, -radius]
  ];

  // Loading textures
  const textures = useTexture([
    '/images/texture_0.jpg',
    '/images/texture_1.jpg',
    '/images/texture_2.jpg',
    '/images/texture_3.jpg'
  ]);

  // Set textures size and position
  /* textures.forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // Répétition de la texture
    texture.repeat.set(1, 1); // Ajustez ceci pour répéter la texture
    texture.offset.set(0, 0); // Décalage initial de la texture
    texture.center.set(0.5, 0.5); // Centre de la texture
  }); */

/* useFrame(({clock}) => {
    const time = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * speed;
    }
  }); *

  return (
    <group ref={groupRef} /* rotation={[0, -Math.PI / 18, 0]} *>
      {positions.map((position, index) => (
        <Sphere key={index} args={[0.5, 32, 32]} position={position}>
          <meshStandardMaterial
            attach="material"
            roughness={0.1}
            map={textures[index]}
          />
        </Sphere>
      ))}
    </group>
  );
};

const CameraSetup = () => {
  const {camera} = useThree();

  useEffect(() => {
    camera.lookAt(7, 0, 0);
  }, [camera]);

  return null;
};

const AnimatedSphere = () => {
  const cameraRef = useRef(null);

  // Position du point lumineux fixe au-dessus de la sphère rose
  const lightPosition = [15, 10, 0];

  return (
    <div style={{width: '100%', height: '100vh'}}>
      <Canvas
        ref={cameraRef}
        camera={{
          position: [9, 0, 5],
          fov: 35
        }}
        gl={{antialias: true}}
      >
        <CameraSetup />
        {/* <EffectComposer>
          <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={5}
            height={480}
          />
          <Bloom
            kernelSize={3}
            luminanceThreshold={0}
            luminanceSmoothing={0.4}
            intensity={0.6}
          />
          <Bloom
            kernelSize={KernelSize.HUGE}
            intensity={2}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            height={1000}
          />
          <Vignette eskil={false} offset={0.1} darkness={1.5} />
        </EffectComposer> *}
        <color attach="background" args={['#1e1e1e']} />
        <ambientLight intensity={0.5} />
        {/* <pointLight position={lightPosition} intensity={500} color="white" /> *}
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
              {/* <Lightformer
                intensity={2}
                rotation-y={-Math.PI / 2}
                position={[10, 1, 0]}
                scale={[50, 2, 1]}
              /> *}
            </group>
          </Environment>
          <SphereCircle />
        </Suspense>
        {/* <CameraControls
          truckSpeed={0}
          dollySpeed={0}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        /> *}
      </Canvas>
    </div>
  );
};

export default AnimatedSphere; */

/* 'use client';

import styles from './style.module.scss';
import {useRef, useEffect, forwardRef, Suspense} from 'react';
import * as THREE from 'three';
import {Canvas, useThree, useFrame} from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  CameraControls,
  Sphere,
  MeshTransmissionMaterial,
  useTexture
} from '@react-three/drei';
import {Camera} from 'three';
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Vignette
} from '@react-three/postprocessing';
import {KernelSize} from 'postprocessing';

const SphereCircle = () => {
  const groupRef = useRef(null);

  const radius = 5; // Rayon du cercle fictif
  const speed = 0.05; // Vitesse de rotation
  const positions = [
    [radius, 0, 0],
    [0, 0, radius],
    [-radius, 0, 0],
    [0, 0, -radius]
  ];
  /* const radius = 15; // Rayon du cercle fictif
  const speed = 0.05; // Vitesse de rotation
  const positions = [
    [radius, 0, 0],
    [0, 0, radius],
    [-radius, 0, 0],
    [0, 0, -radius]
  ]; *

  // const colors = ['hotpink', 'yellow', 'red', 'purple'];

  // Loading textures
  const texture = useTexture('/images/texture_0.jpg');

  // Set textures size and position
  /* textures.forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // Répétition de la texture
    texture.repeat.set(1, 1); // Ajustez ceci pour répéter la texture
    texture.offset.set(0, 0); // Décalage initial de la texture
    texture.center.set(0.5, 0.5); // Centre de la texture
  }); *

  /* useFrame(({clock}) => {
    const time = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * speed;
    }
  }); *

  return (
    <group ref={groupRef} rotation={[0, -Math.PI / 18, 0]}>
      {positions.map((position, index) => (
        <Sphere key={index} args={[1, 32, 32]} position={position}>
          <meshStandardMaterial
            attach="material"
            // color={colors[index]}
            roughness={0.1}
            map={texture}
            // aoMap={texture1}
          />
        </Sphere>
      ))}
    </group>
  );
};

const CameraSetup = () => {
  const {camera} = useThree();

  useEffect(() => {
    camera.lookAt(camera.position.x, camera.position.y, 0);
  }, [camera]);

  return null;
};

const AnimatedSphere = () => {
  const cameraRef = useRef(null);

  // Position du point lumineux fixe au-dessus de la sphère rose
  const lightPosition = [15, 10, 0];

  return (
    <div style={{width: '100%', height: '100vh'}}>
      <Canvas
        ref={cameraRef}
        camera={{
          /* position: [25, 0, 10], *
          position: [5, 0, 5],
          fov: 50
        }}
        gl={{antialias: true}}
      >
        <CameraSetup />
        {/* <EffectComposer>
          <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={5}
            height={480}
          />
          <Bloom
            kernelSize={3}
            luminanceThreshold={0}
            luminanceSmoothing={0.4}
            intensity={0.6}
          />
          <Bloom
            kernelSize={KernelSize.HUGE}
            intensity={2}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            height={1000}
          />
          <Vignette eskil={false} offset={0.1} darkness={1.5} />
        </EffectComposer> *}
        <color attach="background" args={['#1e1e1e']} />
        <ambientLight intensity={0.5} />
        {/* <pointLight position={lightPosition} intensity={500} color="white" /> *}
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
              <Lightformer
                intensity={2}
                rotation-y={-Math.PI / 2}
                position={[10, 1, 0]}
                scale={[50, 2, 1]}
              />
            </group>
          </Environment>
          <SphereCircle />
        </Suspense>
        <CameraControls
          truckSpeed={0}
          dollySpeed={0}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default AnimatedSphere; */

/* 'use client';

import styles from './style.module.scss';
import {useState, useRef, useEffect, forwardRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, Sphere} from '@react-three/drei';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const positions = [
  [-8.5, 0, 3.5], // Front
  [-3.5, 0, 0], // Right
  [-8.5, 0, -3.5], // Back
  [-13.5, 0, 0] // Left
];

const AnimatedSphere = forwardRef(function AnimatedSphere({position}, ref) {
  return (
    <Sphere ref={ref} args={[1, 32, 32]} position={position}>
      <meshStandardMaterial attach="material" color="#fce300" />
    </Sphere>
  );
});

const SphereAnimation = () => {
  const containerRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=400%',
            scrub: true,
            pin: containerRef.current,
            pinSpacing: false,
            markers: true
          }
        })
        .to(cameraRef.current.position, {
          x: -3.5,
          z: 0,
          duration: 1,
          onUpdate: () => {
            cameraRef.current.lookAt(0, 0, 0);
          }
        })
        .to(cameraRef.current.position, {
          x: -8.5,
          z: -3.5,
          duration: 1,
          onUpdate: () => {
            cameraRef.current.lookAt(0, 0, 0);
          }
        })
        .to(cameraRef.current.position, {
          x: -13.5,
          z: 0,
          duration: 1,
          onUpdate: () => {
            cameraRef.current.lookAt(0, 0, 0);
          }
        })
        .to(cameraRef.current.position, {
          x: -8.5,
          z: 3.5,
          duration: 1,
          onUpdate: () => {
            cameraRef.current.lookAt(0, 0, 0);
          }
        });
    });

    return () => {
      ctx.revert(); // Cleanup animations and ScrollTrigger effects when component unmounts
    };
  }, []);

  return (
    <div ref={containerRef} style={{width: '100%', height: '500vh'}}>
      <Canvas
        ref={cameraRef}
        camera={{position: [0, 0, 10], fov: 50}}
        style={{height: '100vh', width: '100vw'}}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {positions.map((pos, index) => (
          <AnimatedSphere key={index} position={pos} />
        ))}
      </Canvas>
    </div>
  );
};

export default SphereAnimation; */

/* const SphereAnimation = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sphereRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: true,
          pin: canvasRef.current,
          pinSpacing: false,
          markers: true
        }
      });

      sphereRefs.current.forEach((sphere, index) => {
        tl.to(
          sphere,
          {
            position: [
              positions[(index + 1) % 4][0],
              0,
              positions[(index + 1) % 4][2]
            ]
            // duration: 1,
            // ease: 'none',
            // repeat: -1,
            // yoyo: false
          },
          0
        );
      });
    });

    return () => {
      ctx.revert(); // Cleanup animations and ScrollTrigger effects when component unmounts
    };
  }, []);

  useEffect(() => {
    console.log(sphereRefs.current);
    sphereRefs.current.forEach((sphere, index) => {
      tl.to(
        sphere,
        {
          position: [
            positions[(index + 1) % 4][0],
            0,
            positions[(index + 1) % 4][2]
          ],
          /* x: positions[(index + 1) % 4][0],
          z: positions[(index + 1) % 4][2], *
          duration: 1,
          ease: 'none',
          repeat: -1,
          yoyo: false
        },
        0
      );
    });
    /* sphereRefs.current.forEach((sphere, index) => {
      tl.to(
        sphere.position,
        {
          x: positions[(index + 1) % 4][0],
          z: positions[(index + 1) % 4][2],
          duration: 1,
          ease: 'none',
          repeat: -1,
          yoyo: false
        },
        0
      );
    }); *
  }, [sphereRefs]);

  return (
    <div ref={containerRef} style={{width: '100%', height: '500vh'}}>
      <div ref={canvasRef} style={{width: '100%', height: '100vh'}}>
        <Canvas
          camera={{position: [0, 0, 10], fov: 50}}
          style={{height: '100vh', width: '100vw'}}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {positions.map((pos, index) => (
            <AnimatedSphere
              key={index}
              position={pos}
              ref={(el) => (sphereRefs.current[index] = el)}
            />
          ))}
          {/* <OrbitControls /> *}
        </Canvas>
      </div>
    </div>
  );
};

export default SphereAnimation; */

/* const AnimatedSphere = ({position, index, scrollPosition}) => {
  const sphereRef = useRef();

  useEffect(() => {
    const newIndex = (index + scrollPosition) % 4;
    gsap.to(sphereRef.current.position, {
      x: positions[newIndex][0],
      y: positions[newIndex][1],
      z: positions[newIndex][2],
      duration: 1,
      ease: 'power3.inOut'
    });
  }, [scrollPosition, index]);

  return (
    <Sphere ref={sphereRef} args={[1, 32, 32]} position={position}>
      <meshStandardMaterial attach="material" color="#fce300" />
    </Sphere>
  );
}; */

/* const SphereAnimation = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const handleScroll = (event) => {
    setScrollPosition((prevPosition) => (prevPosition + 1) % 4);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: true,
          pin: canvasRef.current,
          pinSpacing: false,
          markers: true
        }
      });
    });

    return () => {
      ctx.revert(); // Cleanup animations and ScrollTrigger effects when component unmounts
    };
  }, []);

  return (
    <div ref={containerRef} style={{width: '100%', height: '400vh'}}>
      <div ref={canvasRef} style={{width: '100%', height: '100vh'}}>
        <Canvas camera={{position: [0, 0, 10], fov: 50}}>
          <color attach="background" args={['#191920']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {positions.map((pos, index) => (
            <AnimatedSphere
              key={index}
              position={pos}
              index={index}
              scrollPosition={scrollPosition}
            />
          ))}
          {/* <OrbitControls /> *}
        </Canvas>
      </div>
    </div>
  );
}; */
