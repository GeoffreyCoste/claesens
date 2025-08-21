'use client';

import {useRef, useLayoutEffect, useMemo} from 'react';
import * as THREE from 'three';
import {useFrame, useThree} from '@react-three/fiber';

const ShaderLens = ({dimensions}) => {
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
        precision highp float; // Precision to avoid errors on some devices

        varying vec2 vUv;

        uniform vec2 u_mouse;
        uniform vec2 u_resolution;
        uniform float u_pixelRatio;
        uniform vec2 u_offset;
        uniform float u_time;
        uniform float u_circleSize;
        uniform float u_sphereRadius;

        /* common constants */
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

        /* Signed Distance Circle */
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

        /* Intersection Sphere for raymarching */
        float intSphere(in vec3 ro, in vec3 rd, in vec4 sph) {
            // ro: Ray origin
            // rd: Ray direction
            // sph: vec4(centerX, centerY, centerZ, radius)
            vec3 oc = ro - sph.xyz;
            float b = 2.0*dot(oc, rd);
            float c = dot(oc, oc) - sph.w*sph.w;
            float h = b*b - 4.0*c;
            if (h < 0.0) return -1.0; // No intersection

            float t = (-b - sqrt(h)) / 2.0; // Distance to intersection
            return t;
        }

        vec4 sph1 = vec4(0.0, 0.0, 0.0, 0.15);

        vec3 normSphere(in vec3 pos, in vec4 sph) {
            return (pos - sph.xyz) / sph.w;
        }

        float intersect (in vec3 ro, in vec3 rd, out float resT) {
            resT = 1000.0;
            float id = -1.0;
            float tsph = intSphere(ro, rd, sph1); // intersect with a sphere
            if (tsph > 0.0) {
                id = 1.0;
                resT = tsph;
            }
            return id;
        }

        /* Main Fragment Shader Logic */
        void main() {
            /* Normalize screen coordinates */
            vec2 st = st0 + 0.5 + u_offset;
            vec2 posMouse = mx * vec2(1., -1.) + 0.5 + u_offset;

            // Déclaration locale et modifiable
            // sph1.xy = st;
            sph1.xy = vec2(0.0, 0.0);

            /* Adjust sphere size subject to resolution */
            sph1.w = u_sphereRadius; // Default radius
            /* if (u_resolution.x >= 768.0 && u_resolution.x < 1024.0) { 
                sph1.w = 0.05; // Reduced size on tablet
            } */

            /* Camera setup (ray origin and direction) */
            vec3 ro = vec3(0.0, 0.0, -1.0); // Ray origin
            vec3 rd = normalize(vec3(st - vec2(0.5), 1.0)); // Ray direction

            /* intersect ray with 3d scene */
            float t; // scalar distance to intersection point defined by 'intersect'
            float id = intersect(ro, rd, t);

            /* draw in gray by default */
            vec3 color = vec3(0.9451);

            /* sdf Circle params */
            // float circleSize = 0.3;
            float circleSize = u_circleSize;
            float circleEdge = 0.5;
            float borderSize = 0.02;

            /* Adjust circle size subject to resolution */
            /* if (u_resolution.x >= 768.0 && u_resolution.x < 1024.0) { 
              circleSize = 0.2;  // Reduced size on tablet
            } */

            /* sdf Circle */
            float sdfCircle = fill(
                sdCircle(st, posMouse),
                circleSize,
                circleEdge
            );

            float circle = sdCircle(st, vec2(0.5));
            float sdf = stroke(circle, 0.6, borderSize, sdfCircle) * 6.0;

            // Colors
            vec3 baseColor = vec3(sdf); // Stroke color (white / gray)
            vec3 borderColor = vec3(1.0); // White

            color = mix(color, borderColor, sdf);

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
        u_pixelRatio: {value: pixelRatio},
        u_time: {value: 0.0},
        u_circleSize: {value: 0.3},
        u_sphereRadius: {value: 0.15}
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
      if (width < 768) {
        // Mobile
        vOffset.set(0, 0); // En haut-centre
      } else if (width < 1024) {
        // Tablet
        vOffset.set(0.35, 0); // En haut-centre
      } else if (width < 1440) {
        // Desktop less than 1440px
        vOffset.set(0.4, 0); // En haut-centre
      } else {
        // Desktop
        vOffset.set(0.5, 0); // À droite
      }
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);

    return () => window.removeEventListener('resize', updateOffset);
  }, [vOffset]);

  useLayoutEffect(() => {
    const updateShaderParams = () => {
      const width = window.innerWidth;
      const isTablet = width >= 768 && width < 1024; // Tablets

      // Update shader uniforms subject to resolution
      shaderMaterial.uniforms.u_circleSize.value = isTablet ? 0.1 : 0.3; // Circle
      shaderMaterial.uniforms.u_sphereRadius.value = isTablet ? 0.1 : 0.15; // Sphere
    };

    updateShaderParams();
    window.addEventListener('resize', updateShaderParams);

    return () => window.removeEventListener('resize', updateShaderParams);
  }, [shaderMaterial]);

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
