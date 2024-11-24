import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo.jsx";

function Header() {
    return (
        <header className={styles.header}>
            <Logo />
            <ul>
                <li>
                    <Link to="/about">Sobre nós</Link>
                </li>
                <li>
                    <Link to="/">Simulador</Link>
                </li>
                <li>
                    <Link to="/articles">Artigos</Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;
