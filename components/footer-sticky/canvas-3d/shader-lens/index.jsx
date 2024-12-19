'use client';

import {useState, useRef, useEffect, useLayoutEffect, useMemo} from 'react';
import * as THREE from 'three';
import {useFrame, useThree} from '@react-three/fiber';

const ShaderLens = ({dimensions}) => {
  const [spherePosition, setSpherePosition] = useState([4.95, 0, 0]);

  const vMouseDamp = useMemo(() => new THREE.Vector2(), []);
  const vResolution = useMemo(() => new THREE.Vector2(), []);
  const vOffset = useMemo(() => new THREE.Vector2(0.3, 0.3), []);
  const pixelRatio =
    typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  // Mesh reference
  const meshRef = useRef(null);

  // Get camera and render datas as from useThree
  const {camera, gl} = useThree();

  // Declare fragment shader
  const fragmentShader = `
        precision highp float; // Add precision to avoid errors on certain devices

        varying vec2 vUv;

        uniform vec2 u_mouse;
        uniform vec2 u_resolution;
        uniform vec2 u_offset;
        uniform float u_pixelRatio;

        /* Common constants */
        #ifndef PI
        #define PI 3.1415926535897932384626433832795
        #endif
        #ifndef TWO_PI
        #define TWO_PI 6.2831853071795864769252867665590
        #endif

        /* Coordinate and unit utils */
        #ifndef FNC_COORD
        #define FNC_COORD
        vec2 coord(in vec2 p) {
            p = p / u_resolution.xy;
            // correct aspect ratio
            if (u_resolution.x > u_resolution.y) {
                p.x *= u_resolution.x / u_resolution.y;
                p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
            } else {
                p.y *= u_resolution.y / u_resolution.x;
                p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
            }
            // centering
            p -= 0.5;
            p *= vec2(-1.0, 1.0);
            return p;
        }
        #endif

        #define st0 coord(gl_FragCoord.xy)
        #define mx coord(u_mouse * u_pixelRatio)


        float sdCircle(in vec2 st, in vec2 center) {
            return length(st - center) * 2.0;
        }

        /* Antialiased step function */
        float aastep(float threshold, float value) {
            float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
            return smoothstep(threshold - afwidth, threshold + afwidth, value);
        }
        /* Signed distance drawing methods */
        float fill(in float x) { return 1.0 - aastep(0.0, x); }
        float fill(float x, float size, float edge) {
            return 1.0 - smoothstep(size - edge, size + edge, x);
        }

        float stroke(in float d, in float t) { return (1.0 - aastep(t, abs(d))); }
        float stroke(float x, float size, float w, float edge) {
            float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);
            return clamp(d, 0.0, 1.0);
        }

        void main() {
            vec2 pixel = 1.0 / u_resolution.xy;
            vec2 st = st0 + 0.5 + u_offset;
            vec2 posMouse = mx * vec2(1., -1.) + 0.5 + u_offset;

            /* sdf Circle params */
            float circleSize = 0.3;
            float circleEdge = 0.5;
            float borderSize = 0.02;

            /* sdf Circle */
            float sdfCircle = fill(
                sdCircle(st, posMouse),
                circleSize,
                circleEdge
            );

            float sdf;
            sdf = sdCircle(st, vec2(0.5));
            sdf = stroke(sdf, 0.6, borderSize, sdfCircle) * 6.0;

            /* Background and border color */
            vec3 backgroundColor = vec3(0.0, 0.0, 0.0);  // Black background
            vec3 borderColor = vec3(0.949, 0.949, 0.949);  // White border

            /* If distance is near 0 (circle border), apply border color, otherwise background */
            vec3 color = mix(backgroundColor, borderColor, sdf); 

            gl_FragColor = vec4(color.rgb, 1.0);
        }
    `;

  // Create shader material with uniforms
  const shaderMaterial = useMemo(
    () => ({
      uniforms: {
        u_mouse: {value: vMouseDamp},
        u_resolution: {value: vResolution},
        u_offset: {value: vOffset},
        u_pixelRatio: {value: pixelRatio}
      },
      vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
      fragmentShader: fragmentShader,
      defines: {
        VAR: 0
      }
    }),
    [vMouseDamp, vResolution, vOffset, pixelRatio, fragmentShader]
  );

  useLayoutEffect(() => {
    // Gestion des mises à jour, comme la position dynamique
    const updateOffset = () => {
      const width = window.innerWidth;

      // Exemple de mise à jour pour repositionner en fonction des dimensions
      if (width < 1024) {
        // Mobile
        vOffset.set(0, -0.7); // En haut-centre
      } else {
        // Desktop
        vOffset.set(0.7, 0); // À droite
      }
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);

    return () => window.removeEventListener('resize', updateOffset);
  }, [vOffset]);

  useLayoutEffect(() => {
    // Manage mouse events
    const onPointerMove = (e) => {
      vMouseDamp.set(e.clientX, e.clientY);
    };

    // Event listeners
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('pointermove', onPointerMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [dimensions, vMouseDamp]);

  // Window size and resolution update
  useLayoutEffect(() => {
    if (dimensions && meshRef.current) {
      const {width, height} = dimensions;
      const dpr = Math.min(window.devicePixelRatio, 2);

      gl.setSize(width, height);
      gl.setPixelRatio(dpr);

      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      meshRef.current.scale.set(width, height, 1);
      vResolution.set(width, height).multiplyScalar(dpr);
    }
  }, [dimensions, gl, camera, vResolution]);

  // Animation frame pour lisser la souris
  useFrame((state, delta) => {
    for (const k in vMouseDamp) {
      if (k === 'x' || k === 'y') {
        vMouseDamp[k] = THREE.MathUtils.damp(
          vMouseDamp[k],
          vMouseDamp[k],
          8,
          delta
        );
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.5, 1.25, 32, 32]} />
      <shaderMaterial {...shaderMaterial} transparent={true} />
    </mesh>
  );
};

export default ShaderLens;
