'use client';

import styles from './style.module.scss';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useSideMenu} from '@/hooks/useSideMenu';

export default function Brand() {
  const {isOpen, toggleIsOpen} = useSideMenu();

  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (isOpen) {
      toggleIsOpen();
    }
    router.replace('/');
  };

  return (
    <Link href="/" className={styles.brand} onClick={handleClick}>
      <div className={styles.brand_name}>
        <span>clae</span>
        <span>sens</span>
      </div>
      <span className={styles.dot}></span>
    </Link>
  );
}
