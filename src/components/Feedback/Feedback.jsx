import { BiSolidLike, BiSolidDislike  } from "react-icons/bi";
import styles from "./Feedback.module.css";

function Feedback({ geminiData }) {
    return (
        <section className={styles.feedbackContainer}>
            <div className={styles.pros}>
                <h2>Prós <BiSolidLike /></h2>
                <p>{geminiData?.pros || "Nenhum dado disponível."}</p>
            </div>
            <div className={styles.cons}>
                <h2>Contras <BiSolidDislike /></h2>
                <p>{geminiData?.cons || "Nenhum dado disponível."}</p>
            </div>
        </section>
    );
}

export default Feedback;
