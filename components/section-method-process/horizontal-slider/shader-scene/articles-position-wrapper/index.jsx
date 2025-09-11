'use client'

import {useMemo} from 'react';
import {useThree} from '@react-three/fiber';
import {Html} from '@react-three/drei';
import {useMedia} from '@/hooks/useMedia';
import {computeUvPosition} from '@/utils/computeUvPosition';
import {uvToWorld} from '@/utils/uvToWorld';
import ScrollableArticle from './scrollable-article';
import {STAGES} from './data';

const ArticlesPositionWrapper = ({
  bounds,
  uRadius1,
  uRadius2,
  activeIndex,
  isDotNavigationScrolling,
  shouldFadeOut
}) => {
  const {camera} = useThree();

  const {isHydrated, matches} = useMedia();
  const {desktop} = matches;

  const articlePos = useMemo(() => {
    const {u, v, z} = computeUvPosition({
      bounds,
      uRadius1,
      uRadius2,
      position: desktop ? 'left' : 'top',
      isDesktop: desktop
    });
    return uvToWorld(u, v, z, camera, bounds.width, bounds.height);
  }, [bounds, uRadius1, uRadius2, desktop, camera]);

  if (!isHydrated) return null;

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