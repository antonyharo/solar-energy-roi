import styles from "./Header.module.css";
import Logo from "../Logo/Logo.jsx";

function Header() {
    return (
        <header className={styles.header}>
            <Logo />
            <ul>
                <li>Sobre nós</li>
                <li>Simulador</li>
                <li>Artigos</li>
            </ul>
        </header>
    );
}

export default Header;
