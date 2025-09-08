export const computeUvPosition = ({ bounds, uRadius1, uRadius2, z = 4.5, isDesktop, position }) => {
  const aspect = bounds.width / bounds.height;

  const w1 = uRadius1.x;
  const w2 = uRadius2.x;
  const h1 = uRadius1.y;
  const h2 = uRadius2.y;
  const xGap = 0.22 * aspect;
  const yGap = 0.02 * aspect;

  const leftShift = 0.05 * aspect;
  const topShift = 0.25 * aspect
  
  const totalWidth = w1 + w2 + xGap;
  const totalHeight = h1 + h2 + yGap;

  const offset =
    isDesktop
      ? position === "right"
        ? ((totalWidth + leftShift) / 2) - w2 / 2
        : (totalWidth / 2) - w1 / 2
      : position === "bottom"
        ? (totalHeight / 2) - h2 / 2
        : (totalHeight / 2) - h1 / 4;

  const u = isDesktop
    ? position === "right"
      ? 0.5 * aspect + offset
      : 0.5 * aspect - offset
    : 0.5 * aspect;

  const v = isDesktop
    ? 0.5
    : position === "bottom"
      ? 0.5 - offset - topShift: 0.5

  return { u, v, z };
}