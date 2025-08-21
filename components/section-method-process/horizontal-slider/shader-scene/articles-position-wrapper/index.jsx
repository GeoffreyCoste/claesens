'use client'

import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import useMediaQueries from "@/hooks/useMediaQueries";
import { computeUvPosition } from "@/utils/computeUvPosition";
import { uvToWorld } from "@/utils/uvToWorld";
import ScrollableArticle from "./scrollable-article";
import { STAGES } from "./data";
import {useEffect} from 'react';

const ArticlesPositionWrapper = ({
  bounds,
  uRadius1,
  uRadius2,
  activeIndex,
  isDotNavigationScrolling,
  shouldFadeOut
}) => {
  const {camera} = useThree();

  const {desktop} = useMediaQueries();

  const {u, v, z} = computeUvPosition({
    bounds,
    uRadius1,
    uRadius2,
    position: desktop ? 'left' : 'top',
    isDesktop: desktop
  });
  const articlePos = uvToWorld(u, v, z, camera, bounds.width, bounds.height);

  return (
    <Html position={articlePos} center zIndexRange={[10, 0]}>
      <ScrollableArticle
        datas={STAGES}
        activeIndex={activeIndex}
        isDotNavigationScrolling={isDotNavigationScrolling}
        shouldFadeOut={shouldFadeOut}
      />
    </Html>
  );
};

export default ArticlesPositionWrapper;