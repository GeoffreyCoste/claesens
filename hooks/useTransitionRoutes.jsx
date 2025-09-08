'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import usePreviousPathname from './usePreviousPathname';

/**
 * This hook triggers a callback when transitioning from '/realisations' to '/realisations/[projectname]'.
 *
 * @param {function} onTransition - Callback executed while route is changing between list page and detail page.
 */
const useTransitionRoutes = ({ slug, slidesData, activeIndex, onTransition }) => {
  const pathname = usePathname();
  const prevPathname = usePreviousPathname();

  const handleTransitionRoutes = useCallback(() => {
    if (!prevPathname && pathname === '/realisations') {
      onTransition && onTransition('first_visit_realizations');
      return;
    }

    if (
      pathname === '/realisations' &&
      prevPathname?.startsWith('/realisations/')
    ) {
      onTransition && onTransition('back_to_realizations');
      return;
    }

    if (
      pathname.startsWith('/realisations/') &&
      !prevPathname &&
      slidesData[activeIndex] &&
      slidesData[activeIndex].path !== slug &&
      slidesData.some(slide => slide.path === slug)
    ) {
      onTransition && onTransition('directly_to_realization');
      return;
    }

    if (
      pathname.startsWith('/realisations/') &&
      prevPathname?.startsWith('/realisations/') &&
      prevPathname !== pathname
    ) {
      const path = slug;
      onTransition && onTransition('navigating_to_realization', path);
      return;
    }

    if (
      pathname.startsWith('/realisations/') &&
      prevPathname === '/realisations' &&
      slidesData[activeIndex] &&
      slidesData[activeIndex].path === slug
    ) {
      onTransition && onTransition('enter_realization');
      return;
    }

    if (pathname.startsWith('/realisations/') && !slidesData.some(slide => slide.path === slug)) {
      onTransition && onTransition('invalid_path_redirect');
    }

    if (
      pathname.startsWith('/realisations/') &&
      prevPathname === '/realisations' &&
      slidesData[activeIndex] &&
      slidesData[activeIndex].path !== slug
    ) {
      const matchingIndexes = slidesData
        .map((slide, index) => (slide.path === slug ? index : -1))
        .filter(index => index !== -1);

      if (matchingIndexes.length > 0) {
        const foundIndex = matchingIndexes.reduce((prev, curr) =>
          Math.abs(curr - activeIndex) < Math.abs(prev - activeIndex) ? curr : prev
        );
      
        onTransition && onTransition('switch_realization', foundIndex);
      }
    }
  }, [pathname, prevPathname, slug, slidesData, activeIndex, onTransition]);

  useEffect(() => {
    handleTransitionRoutes();
  }, [pathname, prevPathname, handleTransitionRoutes]);

};

export default useTransitionRoutes;
