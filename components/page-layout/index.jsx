'use client';

import styles from './style.module.scss';
import {AnimatePresence} from 'framer-motion';
import {useState, useEffect, useRef, Suspense} from 'react';
import {useSideMenu} from '@/hooks/useSideMenu';
import useMediaQueries from '@/hooks/useMediaQueries';
import SideMenu from '../side-menu';
import Header from '../header';
import FooterSticky from '../footer-sticky';
import {Canvas, useFrame} from '@react-three/fiber';
import {
  Environment,
  useScroll,
  ScrollControls,
  Scroll,
  Html
} from '@react-three/drei';
import {Physics} from '@react-three/rapier';
import Pointer from '../sphere3D/pointer';
import {EffectComposer, N8AO} from '@react-three/postprocessing';
import Sphere from '../sphere3D/sphere';

const spheres = [...Array(50)].map(() => ({
  scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)]
}));

const PageLayout = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);

  const stickyElement = useRef(null);
  const releaseSectionRef = useRef(null);

  const {desktop} = useMediaQueries();

  const {isOpen} = useSideMenu();

  const scroll = useScroll();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2000);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && <SideMenu isOpen={isOpen} />}
      </AnimatePresence>
      {/* <Header ref={stickyElement}></Header> */}
      <Canvas
        style={{
          width: '100%',
          height: '100vh'
        }}
        gl={{alpha: true, stencil: false, depth: false, antialias: false}}
        dpr={[1, 1.5]}
        camera={{position: [0, 0, 25], fov: 30, near: 1, far: 40}}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        shadows
        flat
      >
        <ScrollControls pages={isOpen ? 1 : 2} damping={0.25}>
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <spotLight
              position={[20, 20, 25]}
              penumbra={1}
              angle={0.2}
              color="white"
              castShadow
              shadow-mapSize={[512, 512]}
            />
            <directionalLight position={[0, 5, -4]} intensity={4} />
            <directionalLight
              position={[0, -15, -0]}
              intensity={4}
              color="#fce300"
            />

            <Physics gravity={[0, 0, 0]}>
              <Pointer />
              {spheres.map((props, i) => (
                <Sphere key={i} {...props} />
              ))}
            </Physics>
            <Environment preset="studio" />
            <EffectComposer disableNormalPass>
              <N8AO color="red" aoRadius={2} intensity={1} />
            </EffectComposer>
          </Suspense>
          <Scroll html>
            <Header ref={stickyElement}></Header>
            <main style={{width: '100vw', height: '200vh'}}>{children}</main>
            {/* <FooterSticky /> */}
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
};

export default PageLayout;
