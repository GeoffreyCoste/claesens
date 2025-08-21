'use client'

import {useState, useRef, useEffect, useMemo} from 'react';
import {extend, useThree} from '@react-three/fiber';
import {shaderMaterial} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import useMediaQueries from '@/hooks/useMediaQueries';
import ScrollableArticle from '../articles-position-wrapper/scrollable-article';
import {Html} from '@react-three/drei';
import {STAGES} from '../articles-position-wrapper/data';
import {computeUvPosition} from '@/utils/computeUvPosition';

gsap.registerPlugin(ScrollTrigger);

const FullscreenMaterial = shaderMaterial(
  {
    uResolution: new THREE.Vector2(1, 1),
    uScroll: 0,
    uRadius1: new THREE.Vector2(0.0, 0.0),
    uRadius2: new THREE.Vector2(0.0, 0.0),
    uRotation: 0,
    uEllipseColor: new THREE.Color(0.0, 0.0, 0.0), // 🆕 couleur personnalisable
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
    float yGap = 0.02 * aspect;
    vec2 center = vec2(0.0, 0.0);
    
    float xRad1 = uRadius1.x;
    float xRad2 = uRadius2.x;
    float xCenterDistance = xRad1 + xGap + xRad2;
    float xOffset1 = -xCenterDistance / 2.0 + xRad1 / 2.0;
    float xOffset2 = xCenterDistance / 2.0 + xRad2 / 2.0;

    float yRad1 = uRadius1.y;
    float yRad2 = uRadius2.y;
    float yCenterDistance = yRad1 + yGap + yRad2;
    float yOffset1 = yCenterDistance / 2.0 + yRad1 / 2.0;
    float yOffset2 = -yCenterDistance / 2.0 + yRad2 / 2.0;

    {
      vec2 radius = uRadius1;
      /* vec2 p = center + vec2(offset1, 0.0); */
      vec2 p;
      if (uIsDesktop) {
        p = center + vec2(xOffset1, 0.0);
      } else {
        p = center + vec2(0.0, yOffset1 - 0.12);
      }
      float d = sdf(p, radius, uv);
      tool += S(d);
      vec2 l = p - uv;
      defs += deformedSpace(l, radius, d);
    }

    {
      vec2 radius = uRadius2;
      /* vec2 p = center + vec2(offset2, 0.0); */
      vec2 p;
      if (uIsDesktop) {
        p = center + vec2(xOffset2, 0.0);
      } else {
        p = center + vec2(0.0, yOffset2 - 0.17);
      }
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
  sliderRef,
  tweenRef,
  slidesRef,
  activeIndex,
  isDotNavigationScrolling,
  shouldFadeOut
}) => {
  const materialRef = useRef(null);
  const {camera} = useThree();

  const [planeWidth, setPlaneWidth] = useState(1);
  const [planeHeight, setPlaneHeight] = useState(1);
  const {desktop} = useMediaQueries();

  // 📏 Calcul des dimensions du plan en unités monde
  useEffect(() => {
    const fov = camera.fov * (Math.PI / 180);
    const aspectRatio = width / height;
    const distance = camera.position.z;

    const heightInWorld = 2 * Math.tan(fov / 2) * distance;
    const widthInWorld = heightInWorld * aspectRatio;

    setPlaneWidth(widthInWorld);
    setPlaneHeight(heightInWorld);
  }, [width, height, camera]);

  // 🖥️ Mise à jour du booléen desktop dans le shader
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uIsDesktop.value = desktop;
    }
  }, [desktop]);

  // 📍 Position de l’ellipse1 dans l’espace monde
  /* const ellipse1Pos = useMemo(() => {
    const aspect = width / height;

    const xGap = 0.22 * aspect;
    const yGap = 0.02 * aspect;

    const xRad1 = uRadius1.x;
    const yRad1 = uRadius1.y;

    const xRad2 = uRadius2.x;
    const yRad2 = uRadius2.y;

    const xCenterDistance = xRad1 + xGap + xRad2;
    const yCenterDistance = yRad1 + yGap + yRad2;

    const xOffset1 = -xCenterDistance / 2 + xRad1 / 2;
    const yOffset1 = yCenterDistance / 2 + yRad1 / 2;

    const x = desktop ? xOffset1 : 0;
    const y = desktop ? 0 : yOffset1 - 0.12;

    return new THREE.Vector3(x, y, 0);
  }, [desktop, width, height, uRadius1, uRadius2]); */

  const ellipse1Pos = useMemo(() => {
    const {u, v, z} = computeUvPosition({
      bounds: {width, height},
      uRadius1,
      uRadius2,
      z: 0,
      isDesktop: desktop,
      position: desktop ? 'left' : 'top'
    });

    // Convertir les coordonnées UV [0,1] vers coordonnées centrées dans le plan
    const x = (u * width - 0.5 * width) / height;
    const y = (v * height - 0.5 * height) / height;

    return new THREE.Vector3(x, y, z);
  }, [desktop, width, height, uRadius1, uRadius2]);

  // 🎞️ ScrollTrigger Animations
  useEffect(() => {
    const slider = sliderRef?.current;
    const tween = tweenRef?.current;
    const slides = slidesRef?.current;
    const material = materialRef.current;

    if (!slider || !tween || slides.length === 0 || !material) return;

    const ctx = gsap.context(() => {
      const shaderEllipse1Radius = material.uniforms.uRadius1;
      const shaderEllipse2Radius = material.uniforms.uRadius2;

      const ellipses = [
        {
          radius: shaderEllipse1Radius,
          x: desktop ? 0.5 : 0.3,
          y: desktop ? 0.3 : 0.15,
          labelPrefix: 'ellipse1'
        },
        {
          radius: shaderEllipse2Radius,
          x: desktop ? 0.2 : 0.2,
          y: desktop ? 0.3 : 0.1,
          labelPrefix: 'ellipse2'
        }
      ];

      ellipses.forEach(({radius, x, y, labelPrefix}) => {
        gsap
          .timeline({
            scrollTrigger: {
              containerAnimation: tween,
              trigger: slides[0],
              start: 'right center',
              endTrigger: slides[slides.length - 1],
              end: 'left center',
              scrub: true
            }
          })
          .addLabel(`${labelPrefix}_radius_grow`)
          .to(radius.value, {x, y, duration: 0.2, ease: 'power2.out'})
          .addLabel(`${labelPrefix}_radius_maintain`)
          .to(radius.value, {x, y, duration: 4 / 6, ease: 'none'})
          .addLabel(`${labelPrefix}_radius_shrink`)
          .to(radius.value, {x: 0, y: 0, duration: 0.2, ease: 'power2.in'});

        if (labelPrefix === 'ellipse2') {
          const scrollProxy = {value: 0};
          gsap
            .timeline({
              scrollTrigger: {
                containerAnimation: tween,
                trigger: slides[1],
                start: 'center center',
                endTrigger: slides[slides.length - 2],
                end: 'center center',
                scrub: true,
                onUpdate: () => {
                  if (materialRef.current) {
                    materialRef.current.uniforms.uScroll.value =
                      scrollProxy.value;
                  }
                }
              }
            })
            .to(scrollProxy, {
              value: Math.PI * 3,
              ease: 'none',
              duration: 1
            });
        }
      });
    });

    return () => ctx.revert();
  }, [desktop, sliderRef, tweenRef, slidesRef]);

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <fullscreenMaterial
        ref={materialRef}
        uResolution={new THREE.Vector2(width, height)}
        uRadius1={uRadius1}
        uRadius2={uRadius2}
        uEllipseColor={new THREE.Color(0.1176, 0.1176, 0.1176)}
      />

      {/* 🟢 Ajout du HTML centré dans ellipse1 */}
      <Html
        position={ellipse1Pos}
        center
        zIndexRange={[10, 0]}
        /* style={{
          width: 'auto',
          maxWidth: `${planeWidth * uRadius1.x}px`,
          maxHeight: `${planeHeight * uRadius1.y}px`,
          overflow: 'hidden',
          padding: '2rem',
          backgroundColor: '#1e1e1e',
          color: '#ffffff',
          borderRadius: '100%',
          clipPath: 'ellipse(50% 50% at 50% 50%)'
        }} */
      >
        <ScrollableArticle
          datas={STAGES}
          activeIndex={activeIndex}
          isDotNavigationScrolling={isDotNavigationScrolling}
          shouldFadeOut={shouldFadeOut}
          bounds={{width, height}}
          uRadius1={uRadius1}
          uRadius2={uRadius2}
          isDesktop={desktop}
        />
      </Html>
    </mesh>
  );
};

export default FullscreenPlane;