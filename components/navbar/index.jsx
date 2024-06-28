import styles from './style.module.scss';
import NavList from './nav-list';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavList />
    </nav>
  );
};

export default Navbar;
