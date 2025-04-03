/* 'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const usePreviousPathname = () => {
  const pathname = usePathname();
  const prevPathRef = useRef(null);
  const [prevPath, setPrevPath] = useState(null);

  useEffect(() => {
    setPrevPath(prevPathRef.current); // Stocke l'ancienne valeur avant de la mettre à jour
    prevPathRef.current = pathname; // Met à jour la valeur pour le prochain changement
  }, [pathname]);

  return prevPath;
};

export default usePreviousPathname; */



/* 'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const usePreviousPathname = () => {
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(null);

  useEffect(() => {
    setPrevPath(pathname);
  }, [pathname]);

  return prevPath;
};

export default usePreviousPathname; */





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
