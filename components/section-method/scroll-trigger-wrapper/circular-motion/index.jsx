'use client';

import styles from './style.module.scss';
import {
  useRef,
  useState,
  useLayoutEffect,
  forwardRef,
  useCallback,
  Suspense
} from 'react';
import {bricolage_grotesque} from '@/app/fonts';
import clsx from 'clsx';
import gsap from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {Canvas} from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  useTexture,
  Sphere,
  Ring,
  Circle,
  Html
} from '@react-three/drei';
import {STEPS} from './data';
import NumberDisplay from '../number-display';

const Scene = forwardRef(function Scene(props, ref) {
  const [prevIndex, setPrevIndex] = useState(null);
  const {index} = props;

  const circleRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const groupRef = useRef(null);
  const spheresRef = useRef([]);

  const radius = 5; // Radius of invisible circle used for positioning
  const positions = [
    [radius, 0, 0],
    [0, 0, -radius],
    [-radius, 0, 0],
    [0, 0, radius]
  ];

  // Loading textures
  const textures = useTexture([
    '/images/texture_3.jpg',
    '/images/texture_0.jpg',
    '/images/texture_1.jpg',
    '/images/texture_2.jpg'
  ]);

  useLayoutEffect(() => {
    const parentContainer = ref.parentContainerRef.current;
    const circle = circleRef.current;
    const ring1 = ring1Ref.current;
    const ring2 = ring2Ref.current;
    const group = groupRef.current;
    const spheres = spheresRef.current;

    if (!parentContainer || !circle || !ring1 || !ring2 || !group || !spheres)
      return;

    const xOffsets = [0.4, -0.1, -0.6, 0.9];

    spheres.forEach((sphere, index) => {
      const texture = sphere.material.map;

      const xOffset = xOffsets[index];
      texture.offset.set(xOffset, 0);
      texture.repeat.set(2, 2);
      texture.center.set(0.5, 0.5);
      texture.needsUpdate = true;
    });

    gsap.registerPlugin(ScrollTrigger);

    /* const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentContainer,
          start: 'top+=300vh top',
          end: '+=800vh',
          scrub: true
        }
      });

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
            trigger: parentContainer,
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
            opacity: 0.7,
            duration: 1,
            ease: 'slow(0.2,0.9,false)',
            scrollTrigger: {
              trigger: parentContainer,
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
              trigger: parentContainer,
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
              trigger: parentContainer,
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
              trigger: parentContainer,
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
              trigger: parentContainer,
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
            x: 0.45,
            y: 0.45,
            z: 0.45,
            // duration: 1,
            ease: 'slow(0.2,0.9,false)',
            scrollTrigger: {
              trigger: parentContainer,
              start: 'top+=100vh top',
              end: '+=100vh',
              scrub: true
            }
          }
        )
        // Animate circle to right with bouncing effect
        .to(circle.position, {
          x: '+=1.19', // Move circle to right
          duration: 1,
          ease: 'bounce.out',
          scrollTrigger: {
            trigger: parentContainer,
            start: 'top+=200vh top',
            end: '+=100vh',
            scrub: true
          }
        });
    }); */

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentContainer,
          start: 'top top',
          end: '+=300vh', // Augmentez cette valeur si nécessaire
          scrub: true
        }
      });

      // Animation de l'échelle du cercle de 0 à 1
      tl.fromTo(
        circle.scale,
        {x: 0, y: 0, z: 0},
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 1,
          ease: 'slow(0.2,0.9,false)'
        }
      )

        // Animation d'opacité
        .fromTo(
          circle.material,
          {opacity: 0},
          {
            opacity: 0.7,
            duration: 1,
            ease: 'slow(0.2,0.9,false)'
          },
          '-=1'
        )

        // Animation de l'échelle du premier anneau de 0 à 1
        .fromTo(
          ring1.scale,
          {x: 0, y: 0, z: 0},
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.7,
            ease: 'slow(0.2,0.9,false)'
          }
        )

        .fromTo(
          ring1.material,
          {opacity: 0},
          {
            opacity: 0.7,
            duration: 0.1,
            ease: 'slow(0.2,0.9,false)'
          },
          '-=0.5'
        )

        // Animation de l'échelle du second anneau de 0 à 1
        .fromTo(
          ring2.scale,
          {x: 0, y: 0, z: 0},
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.7,
            ease: 'slow(0.2,0.9,false)'
          }
        )

        .fromTo(
          ring2.material,
          {opacity: 0},
          {
            opacity: 0.7,
            duration: 0.1,
            ease: 'slow(0.2,0.9,false)'
          },
          '-=0.5'
        )

        // Réduire l'échelle du cercle après son déplacement
        .to(circle.scale, {
          x: 0.45,
          y: 0.45,
          z: 0.45,
          ease: 'slow(0.2,0.9,false)',
          duration: 1
        })

        // Déplacer le cercle vers la droite avec un effet de rebond
        .to(circle.position, {
          x: '+=1.19',
          duration: 1,
          ease: 'bounce.out'
        });
    });

    spheres.forEach((sphere, i) => {
      if (index === null) {
        gsap.to(sphere.material, {opacity: 0});
        // sphere.visible = false;
      } else {
        gsap.to(sphere.material, {opacity: 1});
      }
    });

    const degToRad = (degrees) => degrees * (Math.PI / 180);

    if (index !== null) {
      // Only animate if index is not null
      const targetRotation = -(1 + index) * 90; // Rotation in degrees

      gsap.to(group.rotation, {
        y: degToRad(targetRotation),
        duration: 1,
        ease: 'power1.out'
      });

      setPrevIndex(index);
    } else if (prevIndex !== null && prevIndex !== 3) {
      // Maintain index if it was 3 and is now null
      setPrevIndex(prevIndex);
    } else {
      // Reset to the previous valid state if necessary
      setPrevIndex(index);
    }

    return () => {
      ctx.revert(); // Cleanup animations and ScrollTrigger effects when component unmounts
    };
  }, [ref, groupRef, index, prevIndex]);

  return (
    <>
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

        <Circle args={[0.5, 64]} ref={circleRef} position={[-1.77, 0, 0]}>
          <meshBasicMaterial
            attach="material"
            color="#212121"
            transparent
            opacity={0}
          />

          <Html position={[0, 0, 0.01]} occlude>
            <div className={styles.motion_index_indicator}>
              <span className={styles.motion_index_indicator_label}>etape</span>
              <NumberDisplay index={index} />
            </div>
          </Html>
        </Circle>

        <Ring
          ref={ring1Ref}
          args={[0.5, 0.85, 64]}
          position={[-1.77, 0, -0.01]}
        >
          <meshBasicMaterial
            attach="material"
            color={'#212121'}
            transparent
            opacity={0}
          />
        </Ring>

        <Ring
          ref={ring2Ref}
          args={[0.85, 1.2, 64]}
          position={[-1.77, 0, -0.02]}
        >
          <meshBasicMaterial
            attach="material"
            color={'#292929'}
            // opacity={0.7}
            transparent
            opacity={0}
          />
        </Ring>

        <group ref={groupRef} position={[-6.75, 0, 0]}>
          {positions.map((position, index) => (
            <Sphere
              key={index}
              ref={(el) => {
                if (el) spheresRef.current[index] = el;
              }}
              args={[0.35, 32, 32]}
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

const Canvas3d = forwardRef(function Canvas3d(props, ref) {
  const {index} = props;
  const canvasRef = useRef(null);

  return (
    <Canvas
      ref={canvasRef}
      camera={{
        position: [0, 0, 5],
        fov: 35
      }}
      gl={{antialias: true}}
      style={{
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: '3',
        overflow: 'visible'
      }}
    >
      <Scene ref={{parentContainerRef: ref.parentContainerRef}} index={index} />
    </Canvas>
  );
});

const CircularMotion = forwardRef(function CircularMotion(props, ref) {
  const [activeDot, setActiveDot] = useState(null); // Active dot state

  const motionItemsRef = useRef([]);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const dotsListRef = useRef(null); // Reference to the dots list
  const scrollTriggerRef = useRef(null); // Reference to the ScrollTrigger instance

  useLayoutEffect(() => {
    gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

    const parentContainer = ref.containerRef.current;
    const items = motionItemsRef.current || [];
    const numItems = items.length;
    const svg = svgRef.current;
    const path = pathRef.current;

    if (!parentContainer || !svg || !path || numItems === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentContainer,
          start: 'top+=300vh top',
          end: '+=800vh',
          scrub: true,
          onUpdate: (self) => {
            // Synchronize active dot state with scroll position
            const progress = self.progress;

            items.forEach((_, i) => {
              if (progress > i / numItems && progress < (i + 1) / numItems) {
                setActiveDot(i);
              }
            });

            if (progress < 0.1 || progress > 0.9) {
              setActiveDot(null);
            }
          }
        }
      });

      // Save ScrollTrigger instance
      scrollTriggerRef.current = tl.scrollTrigger;

      // Setting initial label
      tl.addLabel('start');

      items.forEach((item, i) => {
        const start = 0;
        const mid = 0.5;
        const end = 1;

        const prevLabel = i === 0 ? 'start' : `item_${i - 1}_done`;
        const currentLabel = `item_${i}_done`;

        // Animate from start to mid
        tl.to(
          item,
          {
            opacity: 1,
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0, 0.5],
              start: start,
              end: mid
            },
            duration: 4
          },
          prevLabel
        );

        // Pause at mid
        tl.to(item, {
          opacity: 1,
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0, 0.5],
            start: mid,
            end: mid
          },
          duration: 2
        });

        // Animate from mid to end
        tl.to(item, {
          opacity: 0,
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0, 0.5],
            start: mid,
            end: end
          },
          duration: 4
        });

        // Add label at the beginning of current item last animation
        tl.addLabel(currentLabel, '<');
      });
    });

    return () => {
      ctx.revert();
    };
  }, [ref]);

  // Function to update ScrollTrigger position subject to progress
  const updateScrollTrigger = useCallback(
    (progress) => {
      if (ref.containerRef.current && scrollTriggerRef.current) {
        const scrollTrigger = scrollTriggerRef.current;

        const startOffset = scrollTrigger.start;
        const endOffset = scrollTrigger.end - 50;

        const newProgress = progress * (endOffset - startOffset) + startOffset;

        window.scrollTo({
          top: newProgress,
          behavior: 'smooth'
        });
      }
    },
    [ref]
  );

  const handleDotClick = (index) => {
    const items = motionItemsRef.current || [];
    const numItems = items.length;

    const targetProgress = (index + 0.5) / numItems;

    if (scrollTriggerRef.current) {
      updateScrollTrigger(targetProgress);
      setActiveDot(index);
    }
  };

  return (
    <div className={styles.motion_container}>
      <ul ref={dotsListRef} className={styles.dots_list}>
        {[0, 1, 2, 3].map((dotIndex) => (
          <li
            key={dotIndex}
            className={`${styles.dots_list_item} ${dotIndex === activeDot ? styles.active : ''}`}
            data-index={dotIndex}
            onClick={() => handleDotClick(dotIndex)}
          />
        ))}
      </ul>
      {STEPS.map((step, index) => (
        <div
          key={`step-${index}`}
          className={styles.motion_item}
          ref={(el) => (motionItemsRef.current[index] = el)}
        >
          <div className={styles.motion_item_content}>
            <article className={styles.step_article}>
              <h3
                className={clsx(
                  bricolage_grotesque.className,
                  styles.step_article_title
                )}
              >
                {step.title}
              </h3>
              <p className={styles.step_article_description}>
                {step.description}
              </p>
            </article>
          </div>
        </div>
      ))}
      <svg viewBox="0 0 200 100" ref={svgRef} className={styles.svg}>
        <path
          id="path"
          ref={pathRef}
          d="M 50,0 A 50,50 0 0 1 100,50 A 50,50 0 0 1 50,100"
          fill="none"
          stroke="none"
          strokeWidth="0.25"
          preserveAspectRatio="none"
        />
      </svg>
      <Canvas3d
        ref={{parentContainerRef: ref.containerRef}}
        index={activeDot}
      />
    </div>
  );
});

export default CircularMotion;
