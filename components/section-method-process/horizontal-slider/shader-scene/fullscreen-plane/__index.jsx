'use client'

import { useState, useRef, useEffect } from 'react';
import { extend, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FullscreenMaterial = shaderMaterial(
  {
    uResolution: new THREE.Vector2(1, 1),
    uScroll: 0,
    uRadius1: new THREE.Vector2(0.0, 0.0),
    uRadius2: new THREE.Vector2(0.0, 0.0),
    uRotation: 0,
    uEllipseColor: new THREE.Color(0.0, 0.0, 0.0), // 🆕 couleur personnalisable
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
  uniform vec3 uEllipseColor; // 🆕
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
    float gap = 0.22 * aspect;
    vec2 center = vec2(0.0, 0.0);
    
    float r1 = uRadius1.x;
    float r2 = uRadius2.x;
    float centerDistance = r1 + gap + r2;
    float offset1 = -centerDistance / 2.0 + r1 / 2.0;
    float offset2 = centerDistance / 2.0 + r2 / 2.0;

    {
      vec2 radius = uRadius1;
      vec2 p = center + vec2(offset1, 0.0);
      float d = sdf(p, radius, uv);
      tool += S(d);
      vec2 l = p - uv;
      defs += deformedSpace(l, radius, d);
    }

    {
      vec2 radius = uRadius2;
      vec2 p = center + vec2(offset2, 0.0);
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


extend({ FullscreenMaterial })

const FullscreenPlane = ({ width, height, uRadius1, uRadius2, sliderRef, tweenRef, slidesRef }) => {
  const materialRef = useRef(null);
  const { camera } = useThree(); // Accéder à la caméra via useThree
  const [planeWidth, setPlaneWidth] = useState(1);
  const [planeHeight, setPlaneHeight] = useState(1);

  useEffect(() => {
    // Le champ de vision de la caméra
    const fov = camera.fov * (Math.PI / 180); // Conversion en radians
    const aspectRatio = width / height;
    const distance = camera.position.z; // Distance entre la caméra et le plan

    // Calculer la taille du plan en fonction du fov et de la distance
    const heightInWorld = 2 * Math.tan(fov / 2) * distance; // Hauteur du plan
    const widthInWorld = heightInWorld * aspectRatio; // Largeur du plan

    setPlaneWidth(widthInWorld);
    setPlaneHeight(heightInWorld);

  }, [width, height, camera]);

  useEffect(() => {
    const slider = sliderRef?.current;
    const tween = tweenRef?.current;
    const slides = slidesRef?.current;
    const material = materialRef.current;
    if (!slider || !tween || slides.length === 0 || !material || !materialRef.current?.uniforms ) return;

    const ctx = gsap.context(() => {

      const shaderEllipse1Radius = material.uniforms.uRadius1;
      const shaderEllipse2Radius = material.uniforms.uRadius2;

      const ellipses = [
        {
          radius: shaderEllipse1Radius,
          x: 0.5,
          y: 0.3,
          labelPrefix: 'ellipse1'
        },
        {
          radius: shaderEllipse2Radius,
          x: 0.2,
          y: 0.3,
          labelPrefix: 'ellipse2'
        }
      ];

      // Création d'une timeline pour chaque ellipse dans le tableau afin d'animer son radius
      ellipses.forEach(({radius, x, y, labelPrefix}) => {
        gsap.timeline({
          scrollTrigger: {
            containerAnimation: tween,
            trigger: slides[0], // On part dès la première slide
            start: "right center",
            endTrigger: slides[slides.length - 1],
            end: "left center",
            scrub: true,
            // markers: true,
          }
        })
        .addLabel(`${labelPrefix}_radius_grow`)
        .to(radius.value, {
          x: x,   // Valeur de 'x' que tu veux atteindre
          y: y,   // Valeur de 'y' que tu veux atteindre
          duration: 0.2,
          ease: "power2.out",
        })
        .addLabel(`${labelPrefix}_radius_maintain`)
        .to(radius.value, {
          x: x,     // Valeurs stables pendant l'animation
          y: y,
          duration: (4 / 6), // Stable pendant slides 2 à 5
          ease: "none",
        })
        .addLabel(`${labelPrefix}_radius_shrink`)
        .to(radius.value, {
          x: 0,  // Retour à la position initiale
          y: 0,  // Retour à la position initiale
          duration: 0.2,
          ease: "power2.in",
        });

        if (labelPrefix === 'ellipse2') {
          // Animation scroll pour uScroll
          const scrollProxy = { value: 0 };
          
          gsap.timeline({
            scrollTrigger: {
              containerAnimation: tween,
              trigger: slides[1], // Début à slide 2
              start: "center center",
              endTrigger: slides[slides.length - 2], // Fin à slide 5
              end: "center center",
              scrub: true,
              // markers: true,
              onUpdate: () => {
                if (materialRef.current) {
                  materialRef.current.uniforms.uScroll.value = scrollProxy.value;
                }
              }
            }
          }).to(scrollProxy, {
            value: Math.PI * 3, // 1,5 tours
            ease: "none",
            duration: 1
          });
        }
      });
    });
  
    return () => ctx.revert();

  }, [sliderRef, tweenRef, slidesRef]);

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <fullscreenMaterial 
        ref={materialRef} 
        /* uResolution={[width, height]} */ 
        uResolution={new THREE.Vector2(width, height)}
        uRadius1={uRadius1} 
        uRadius2={uRadius2} 
      />
    </mesh>
  );
};

export default FullscreenPlane;