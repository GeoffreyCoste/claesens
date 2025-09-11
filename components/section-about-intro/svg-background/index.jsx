'use client';

import {useMedia} from '@/hooks/useMedia';

const SvgBackground = () => {
  const {isHydrated, matches} = useMedia();
  const {mobile, tablet} = matches;

  const r = isHydrated ? (mobile ? 100 : tablet ? 60 : 80) : 0;
  const strokeWidth = isHydrated ? (mobile ? 1.5 : 1) : 0;
  const cxValues = isHydrated
    ? [0, tablet ? -60 : -80, -30, tablet ? 60 : 80, 30]
    : [0, 0, 0, 0, 0];
  const cyValues = isHydrated
    ? [0, 0, 0, 0, 0].map((v, i) => {
        if (mobile) return [0, -160, -80, 160, 80][i];
        if (tablet) return 0;
        return 0;
      })
    : [0, 0, 0, 0, 0];

  return (
    <svg
      viewBox="-100 -100 200 200"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      {cxValues.map((cx, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cyValues[i]}
          r={r}
          stroke="white"
          strokeWidth={strokeWidth}
          fill="none"
        />
      ))}
    </svg>
  );
};

export default SvgBackground;
