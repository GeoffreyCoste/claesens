'use client';

import {usePathname} from 'next/navigation';
import {useEffect, useRef} from 'react';

const usePreviousPathname = () => {
  const pathname = usePathname();
  const previousPathRef = useRef(null);

  useEffect(() => {
    previousPathRef.current = pathname;
  }, [pathname]);

  return previousPathRef.current;
};

export default usePreviousPathname;
