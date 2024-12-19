'use client';

import useMediaQueries from '@/hooks/useMediaQueries';

const SvgBackground = () => {
  const {mobile, tablet} = useMediaQueries();

  return (
    <svg
      viewBox="-100 -100 200 200"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="0"
        cy="0"
        r={mobile ? '100' : tablet ? '60' : '80'}
        stroke="white"
        strokeWidth={mobile ? '1.5' : '1'}
        fill="none"
      />

      <circle
        cx={mobile ? '0' : tablet ? '-60' : '-80'}
        cy={mobile ? '-160' : '0'}
        r={mobile ? '100' : tablet ? '60' : '80'}
        stroke="white"
        strokeWidth={mobile ? '1.5' : '1'}
        fill="none"
      />
      <circle
        cx={mobile ? '0' : '-30'}
        cy={mobile ? '-80' : '0'}
        r={mobile ? '100' : tablet ? '60' : '80'}
        stroke="white"
        strokeWidth={mobile ? '1.5' : '1'}
        fill="none"
      />

      <circle
        cx={mobile ? '0' : tablet ? '60' : '80'}
        cy={mobile ? '160' : '0'}
        r={mobile ? '100' : tablet ? '60' : '80'}
        stroke="white"
        strokeWidth={mobile ? '1.5' : '1'}
        fill="none"
      />
      <circle
        cx={mobile ? '0' : '30'}
        cy={mobile ? '80' : '0'}
        r={mobile ? '100' : tablet ? '60' : '80'}
        stroke="white"
        strokeWidth={mobile ? '1.5' : '1'}
        fill="none"
      />
    </svg>
  );
};

export default SvgBackground;
