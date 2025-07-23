export const computeUvPosition = ({ bounds, uRadius1, uRadius2, z = 4.5, isDesktop, position }) => {
  const aspect = bounds.width / bounds.height;

  const w1 = uRadius1.x;
  const w2 = uRadius2.x;
  const h1 = uRadius1.y;
  const h2 = uRadius2.y;
  const xGap = 0.22 * aspect;
  const yGap = 0.02 * aspect;

  const leftShift = 0.05 * aspect;
  
  const totalWidth = w1 + w2 + xGap;
  const totalHeight = h1 + h2 + yGap;

  const offset =
    isDesktop
      ? position === "right"
        ? ((totalWidth + leftShift /* + rightShift */) / 2) - w2 / 2
        : (totalWidth / 2) - w1 / 2
      : position === "bottom"
        ? (totalHeight / 2) - h2 / 2
        : (totalHeight / 2) - h1 / 2;

  const u = isDesktop
    ? position === "right"
      ? 0.5 * aspect + offset
      : 0.5 * aspect - offset
    : 0.5 * aspect;

  const v = isDesktop
    ? 0.5
    : position === "bottom"
      ? 0.5 * aspect - offset + 0.17 / 4
      : 0.5 * aspect + offset + 0.12

  return { u, v, z };
}

/* export const computeUvPosition = ({ bounds, uRadius1, uRadius2, z = 4.5, side = 'right' }) => {
  const aspect = bounds.width / bounds.height;

  const w1 = uRadius1.x;
  const w2 = uRadius2.x;
  const gap = 0.22 * aspect;
  // const rightShift = 0.06 * aspect;
  const leftShift = 0.05 * aspect;

  const totalWidth = w1 + w2 + gap;

  const offset =
    side === 'right'
      ? ((totalWidth + leftShift /* + rightShift *) / 2) - w2 / 2
      : (totalWidth / 2) - w1 / 2;

  const u = side === 'right'
    ? 0.5 * aspect + offset
    : 0.5 * aspect - offset;

  const v = 0.5;

  return { u, v, z };
} */