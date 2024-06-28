import styles from '../../style.module.scss';
import Link from 'next/link';

const NavItem = ({title, href}) => {
  return (
    <li className={styles.navbar_item}>
      <Link href={href}>{title}</Link>
    </li>
  );
};

export default NavItem;
