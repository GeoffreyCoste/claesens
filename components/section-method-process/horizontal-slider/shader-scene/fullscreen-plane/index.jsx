'use client'

import { useState, useRef, useEffect } from 'react';
import { extend, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {useMedia} from '@/hooks/useMedia';

gsap.registerPlugin(ScrollTrigger);

const FullscreenMaterial = shaderMaterial(
  {
    uResolution: new THREE.Vector2(1, 1),
    uScroll: 0,
    uRadius1: new THREE.Vector2(0.0, 0.0),
    uRadius2: new THREE.Vector2(0.0, 0.0),
    uRadius3: new THREE.Vector2(0.0, 0.0),
    uRotation: 0,
    uEllipseColor: new THREE.Color(0.0, 0.0, 0.0), // Customizable color
    uIsDesktop: true // Boolean used to apply a conditional positioning to the spheres inside the shader
  },
  // Vertex Shader
  `varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,

  // Fragment Shader
  `uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uRadius1;
  uniform vec2 uRadius2;
  uniform vec2 uRadius3;
  uniform float uRotation;
  uniform vec3 uEllipseColor;
  uniform bool uIsDesktop;
  varying vec2 vUv;

  #define aa 2.0 / uResolution.y
  #define S(x) smoothstep(aa, 0.0, x)
  #define rotate2d(a) mat2(cos(a), -sin(a), sin(a), cos(a))

  float gridMask(vec2 uv, const float subdiv) {
    vec2 toGrid = uv - round(uv * subdiv) / subdiv;
    float d = min(abs(toGrid.x), abs(toGrid.y));
    return S(abs(d));
  }

  float sdf(vec2 p, vec2 r, vec2 uv) {
    vec2 l = (uv - p) * rotate2d(uScroll);
    vec2 ratio = (l * l) / (r * r);
    return ratio.x + ratio.y - 1.0;
  }

  vec2 deformedSpace(vec2 local, vec2 r, float d) {
    vec2 lnorm = local / d;
    vec2 intersection = lnorm * r;
    float falloff = smoothstep(3.0, 0.0, d);
    return intersection * falloff;
  }

  void main() {
    vec2 uv = (vUv * uResolution - 0.5 * uResolution) / uResolution.y;
    vec2 m = uMouse / uResolution.y;
    float aspect = uResolution.x / uResolution.y;
    
    float tool = 0.0;
    vec2 defs = vec2(0.0);
    float xGap = 0.22 * aspect;
    vec2 center = vec2(0.0, 0.0);

    float yOffset1 = 0.2;
    float yOffset2 = -0.2;
    float yOffset3 = 0.0;
    
    float xRad1 = uRadius1.x;
    float xRad2 = uRadius2.x;
    float xCenterDistance = xRad1 + xGap + xRad2;
    float xOffset1 = -xCenterDistance / 2.0 + xRad1 / 2.0;
    float xOffset2 = xCenterDistance / 2.0 + xRad2 / 2.0;

    {
      vec2 radius = uRadius1;
      vec2 p;
      if (uIsDesktop) {
        p = center + vec2(xOffset1, 0.0);
      } else {
        p = center + vec2(0.0, yOffset1);
      }
      float d = sdf(p, radius, uv);
      tool += S(d);
      vec2 l = p - uv;
      defs += deformedSpace(l, radius, d);
    }

    {
      vec2 radius = uRadius2;
      vec2 p;
      if (uIsDesktop) {
        p = center + vec2(xOffset2, 0.0);
      } else {
        p = center + vec2(0.0, yOffset2);
      }
      float d = sdf(p, radius, uv);
      tool += S(d);
      vec2 l = p - uv;
      defs += deformedSpace(l, radius, d);
    }
    
    {
      vec2 radius = uRadius3;
      vec2 p = center + vec2(0.0, yOffset3);
      float d = sdf(p, radius, uv);
      tool += S(d);
      vec2 l = p - uv;
      defs += deformedSpace(l, radius, d);
    }

    float grid = gridMask(uv + defs, 20.0);

    vec3 bgColor = vec3(0.1176);       // #1e1e1e
    vec3 gridColor = vec3(0.8941);     // #e4e4e4
    vec3 ellipseColor = uEllipseColor; // 🆕

    vec3 color = bgColor;
    color = mix(color, gridColor, grid * (1.0 - tool) * 0.2);
    color = mix(color, ellipseColor, tool);

    gl_FragColor = vec4(color, 1.0);
  }`
);

extend({FullscreenMaterial});

const FullscreenPlane = ({
  width,
  height,
  uRadius1,
  uRadius2,
  uRadius3,
  sliderRef,
  tweenRef,
  slidesRef
}) => {
  const materialRef = useRef(null);
  const {camera} = useThree();
  const [planeWidth, setPlaneWidth] = useState(1);
  const [planeHeight, setPlaneHeight] = useState(1);

  const {isHydrated, matches} = useMedia();
  const {desktop, xl} = matches;

  useEffect(() => {
    // Camera field of view
    const fov = camera.fov * (Math.PI / 180); // Conversion in radians
    const aspectRatio = width / height;
    const distance = camera.position.z; // Distance between camera and plane

    // Calculate plane size subject to fov and distance
    const heightInWorld = 2 * Math.tan(fov / 2) * distance; // Plane height
    const widthInWorld = heightInWorld * aspectRatio; // Plane width
    setPlaneWidth(widthInWorld);
    setPlaneHeight(heightInWorld);
  }, [width, height, camera]);

  useEffect(() => {
    if (!isHydrated) return;

    if (materialRef.current) {
      materialRef.current.uniforms.uIsDesktop.value = desktop; // ✅ Boolean update
    }
  }, [isHydrated, desktop]);

  useEffect(() => {
    if (!isHydrated) return;

    const slider = sliderRef?.current;
    const tween = tweenRef?.current;
    const slides = slidesRef?.current;
    const material = materialRef.current;
    if (
      !slider ||
      !tween ||
      slides.length === 0 ||
      !material ||
      !materialRef.current?.uniforms
    )
      return;

    const ctx = gsap.context(() => {
      const shaderEllipse1Radius = material.uniforms.uRadius1;
      const shaderEllipse2Radius = material.uniforms.uRadius2;
      const shaderEllipse3Radius = material.uniforms.uRadius3;

      const ellipses = desktop
        ? [
            {
              radius: shaderEllipse1Radius,
              x: 0.5,
              y: xl ? 0.4 : 0.3,
              labelPrefix: 'ellipse1'
            },
            {
              radius: shaderEllipse2Radius,
              x: 0.2,
              y: 0.3,
              labelPrefix: 'ellipse2'
            }
          ]
        : [
            {
              radius: shaderEllipse1Radius,
              x: width < 800 ? 0.33 : 0.3,
              y: 0.15,
              labelPrefix: 'ellipse1'
            },
            {
              radius: shaderEllipse2Radius,
              x: width < 800 ? 0.33 : 0.3,
              y: 0.15,
              labelPrefix: 'ellipse2'
            },
            {
              radius: shaderEllipse3Radius,
              x: width < 800 ? 0.33 : 0.3,
              y: 0.15,
              labelPrefix: 'ellipse3'
            }
          ];

      // Create timeline for each ellipse inside array to animate radius
      ellipses.forEach(({radius, x, y, labelPrefix}) => {
        gsap
          .timeline({
            scrollTrigger: {
              containerAnimation: tween,
              trigger: slides[0], // From first slide
              start: 'right center',
              endTrigger: slides[slides.length - 1],
              end: 'left center',
              scrub: true
              // markers: true,
            }
          })
          .addLabel(`${labelPrefix}_radius_grow`)
          .to(radius.value, {
            x: x, // 'x' value to reach
            y: y, // 'y' value to reach
            duration: 0.2,
            ease: 'power2.out'
          })
          .addLabel(`${labelPrefix}_radius_maintain`)
          .to(radius.value, {
            x: x, // Satble Values duringanimation
            y: y,
            duration: 4 / 6, // Stable during slides 2 to 5
            ease: 'none'
          })
          .addLabel(`${labelPrefix}_radius_shrink`)
          .to(radius.value, {
            x: 0, // Return to initial position
            y: 0, // Return to initial position
            duration: 0.2,
            ease: 'power2.in'
          });

        if (labelPrefix === 'ellipse2') {
          // Scroll animation for uScroll
          const scrollProxy = {value: 0};

          gsap
            .timeline({
              scrollTrigger: {
                containerAnimation: tween,
                trigger: slides[1], // Starts from slide 2
                start: 'center center',
                endTrigger: slides[slides.length - 2], // End at slide 5
                end: 'center center',
                scrub: true,
                // markers: true,
                onUpdate: () => {
                  if (materialRef.current) {
                    materialRef.current.uniforms.uScroll.value =
                      scrollProxy.value;
                  }
                }
              }
            })
            .to(scrollProxy, {
              value: Math.PI * 3, // 1.5 turns
              ease: 'none',
              duration: 1
            });
        }
      });
    });

    return () => ctx.revert();
  }, [isHydrated, desktop, xl, width, sliderRef, tweenRef, slidesRef]);

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <fullscreenMaterial
        ref={materialRef}
        uResolution={new THREE.Vector2(width, height)}
        uRadius1={uRadius1}
        uRadius2={uRadius2}
        uRadius3={uRadius3}
      />
    </mesh>
  );
};

export default FullscreenPlane;