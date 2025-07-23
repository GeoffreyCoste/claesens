'use client'

import { useThree } from "@react-three/fiber";
import useMediaQueries from "@/hooks/useMediaQueries";
import ModelsManager from "./models-manager";
import { computeUvPosition } from "@/utils/computeUvPosition";
import { uvToWorld } from "@/utils/uvToWorld";

const ModelsPositionWrapper = ({ bounds, uRadius1, uRadius2, slidesRef, tweenRef, activeIndex, isDotNavigationScrolling  }) => {
  const { camera } = useThree();

  const {desktop} = useMediaQueries();

  const { u, v, z } = computeUvPosition({ bounds, uRadius1, uRadius2, position: desktop ? 'right' : 'bottom', isDesktop: desktop });
  const modelPos = uvToWorld(u, v, z, camera, bounds.width, bounds.height);

  return (
    <ModelsManager
      slidesRef={slidesRef}
      tweenRef={tweenRef}
      activeIndex={activeIndex}
      isDotNavigationScrolling={isDotNavigationScrolling}
      position={modelPos}
      scale={desktop ? [1.5, 1.5, 1.5] : [0.75, 0.75, 0.75]}
      rotation={[0, -Math.PI / 6, 0]}
    />
  );
};

export default ModelsPositionWrapper;