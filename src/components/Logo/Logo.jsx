import styles from "./Logo.module.css";
import { TbSunFilled } from "react-icons/tb";

function Logo() {
    return (
        <h1 className={styles.logo}>
            <TbSunFilled /> SolarMates
        </h1>
    );
}

export default Logo;
