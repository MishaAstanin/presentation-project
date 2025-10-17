import { Link } from "react-router-dom"
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logo}>
          <img src={logo} alt="Логотип" />
        </Link>
        <nav className={styles.header__nav}>
          <Link to="/create-presentation" className={styles.header__link}>Создать презентацию</Link>
          <Link to="/create-template" className={styles.header__link}>Создать шаблон</Link>
          <Link to="/about" className={styles.header__link}>О нас</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;