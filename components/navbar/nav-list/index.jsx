import styles from '../style.module.scss';
import NavItem from './nav-item';

const navItems = [
  {
    title: 'à propos',
    href: '/apropos'
  },
  {
    title: 'services',
    href: '/services'
  },
  {
    title: 'méthode',
    href: '/methode'
  },
  {
    title: 'réalisations',
    href: '/realisations'
  },
  {
    title: 'contact',
    href: '/contact'
  }
];

const NavList = () => {
  return (
    <ul className={styles.navbar_list}>
      {navItems.map((item, index) => (
        <NavItem key={index} {...item}></NavItem>
      ))}
    </ul>
  );
};

export default NavList;
