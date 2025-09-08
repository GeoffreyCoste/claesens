import { useMemo, useRef } from 'react';

/**
 * Hook transforming initial datas into an array of "tripled" slides
 * and rotating them according to the current index.
 *
 * @param {Object} params
 * @param {Array} params.datas - Initial datas.
 * @param {number} params.minSlides - Minimum required number of slides.
 * @param {number} params.currentIndex - Current index to be used for rotation.
 * @param {string|null} params.slug - Slug (can be null or undefined).
 *
 * @returns {Object} - Object containing:
 *  - slidesData: array of transformed slides.
 *  - triplets: array of triplets associated to slides.
 */
const useSliderData = ({ datas, minSlides, currentIndex, slug }) => {
  // Refs memorizing the last slug encountered, the associated offset,
  // and the value of the currentIndex when slug was used.
  const lastSlugRef = useRef(null);
  const lastOffsetRef = useRef(null);
  const baseCurrentIndexRef = useRef(currentIndex);

  return useMemo(() => {
    if (!datas || datas.length < minSlides) {
      return { slidesData: [], triplets: [] };
    }

    // Creation of triplets
    const triplets = [];
    for (let i = 0; i < datas.length; i++) {
      triplets.push([i, i + datas.length, i + 2 * datas.length]);
    }

    // Creation of "tripled" array: three copies of datas
    const tripled = [...datas, ...datas, ...datas].map((item, index) => {
      const originalIndex = index % datas.length;
      const dupIndex = Math.floor(index / datas.length);
      return {
        ...item,
        tripletIndex: index, // initial value (will be eventually reevaluated)
        key: `${originalIndex}-${dupIndex}`,
      };
    });

    // Calculate central index in an initial copy (size of a copy = datas.length)
    const isEven = datas.length % 2 === 0;
    const centerIndex = isEven
      ? Math.floor(datas.length / 2)
      : Math.ceil(datas.length / 2) - 1;

    // Rotation utilitary function
    const arrayRotate = (arr, n) => {
      const len = arr.length;
      const normalized = ((n % len) + len) % len;
      return [...arr.slice(normalized), ...arr.slice(0, normalized)];
    };

    let effectiveOffset;
    let slidesData;

    if (slug) {
      // Case when slug is provided
      if (lastSlugRef.current !== slug) {
        // New slug encountered: find in the entire 'tripled' array
        const matchingIndices = tripled
          .map((slide, index) => (slide.path === slug ? index : -1))
          .filter((index) => index !== -1);

        if (matchingIndices.length > 0) {
          // Choose nearest index from currentIndex (element currently centered)
          const foundIndex = matchingIndices.reduce((prev, curr) =>
            Math.abs(curr - currentIndex) < Math.abs(prev - currentIndex)
              ? curr
              : prev
          );
          // Calculate the offset so that the found element ends up at the centerIndex position
          const newOffset = foundIndex - centerIndex;
          // Memorization
          lastSlugRef.current = slug;
          lastOffsetRef.current = newOffset;
          baseCurrentIndexRef.current = currentIndex;
          effectiveOffset = newOffset;
        } else {
          // No corresponding element: return to default rotation
          effectiveOffset = currentIndex - centerIndex;
        }
      } else {
        // Same slug as before: adjust offset subject to scroll delta
        effectiveOffset =
          lastOffsetRef.current + (currentIndex - baseCurrentIndexRef.current);
      }
      slidesData = arrayRotate(tripled, effectiveOffset);
    } else {
      // Case when no slug is provided
      if (lastSlugRef.current !== null) {
        // If no slug was already used, keep its offset and adjust by scroll
        effectiveOffset =
          lastOffsetRef.current + (currentIndex - baseCurrentIndexRef.current);
        slidesData = arrayRotate(tripled, effectiveOffset);
      } else {
        // Rotation by default
        slidesData = arrayRotate(tripled, currentIndex - centerIndex);
      }
    }

    return { slidesData, triplets };
  }, [datas, minSlides, currentIndex, slug]);
};

export default useSliderData;


