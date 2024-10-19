'use client';

import styles from '../../style.module.scss';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useSideMenu} from '@/hooks/useSideMenu';

const NavItem = ({title, href}) => {
  const {toggleIsOpen} = useSideMenu();

  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    const path = e.target.href;
    toggleIsOpen();
    router.replace(path);
  };

  return (
    <li className={styles.navbar_item}>
      <Link href={href} onClick={handleClick}>
        {title}
      </Link>
    </li>
  );
};

export default NavItem;
