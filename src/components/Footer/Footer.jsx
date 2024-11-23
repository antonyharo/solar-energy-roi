import styles from "./Footer.module.css";
import Logo from "../Logo/Logo";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.left}>
                <Logo />
                <p>
                    <strong>© 2024 SolarMates.</strong> Todos os direitos
                    reservados.
                </p>
                <p className={styles.developers}>
                    Desenvolvido por{" "}
                    <a href="https://github.com/antonyharo">Antony Haro</a> e{" "}
                    <a href="https://github.com/fellipecastro">
                        Fellipe Castro
                    </a>
                </p>
            </div>
            <hr />
            <div className={styles.right}>
                <div>
                    <p>Siga-nos nas redes sociais:</p>
                    <nav>
                        <a href="#">Instagram</a>|<a href="#">Twitter</a>|
                        <a href="#">Facebook</a>
                    </nav>
                </div>
                <div>
                    <p>Dúvidas? Acesse:</p>
                    <nav>
                        <a href="#">Suporte</a>|
                        <a href="#">Termos de Serviço</a>|
                        <a href="#">Políticas de Privacidade</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
