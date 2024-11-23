import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { TbAlignBoxBottomCenterFilled } from "react-icons/tb";
import styles from "./Feedback.module.css";

function Feedback({ solar, hydro, conclusion }) {
    return (
        <section className={styles.feedbackContainer}>
            <div className={`${styles.feedback} ${styles.pros}`}>
                <h2>
                    Prós da Energia Solar <BiSolidLike />
                </h2>
                <p>{solar.pros || "Nenhum dado disponível."}</p>
            </div>

            <div className={`${styles.feedback} ${styles.cons}`}>
                <h2>
                    Contras da Energia Solar <BiSolidDislike />
                </h2>
                <p>{solar.cons || "Nenhum dado disponível."}</p>
            </div>

            <div className={`${styles.feedback} ${styles.pros}`}>
                <h2>
                    Prós da Energia Hidrelétrica <BiSolidLike />
                </h2>
                <p>{hydro.pros || "Nenhum dado disponível."}</p>
            </div>

            <div className={`${styles.feedback} ${styles.cons}`}>
                <h2>
                    Contras da Energia Hidrelétrica <BiSolidDislike />
                </h2>
                <p>{hydro.cons || "Nenhum dado disponível."}</p>
            </div>

            <div className={`${styles.feedback} ${styles.conclusion}`} style={{gridColumn: "span 2"}}>
                <h2>
                    Conclusão entre o uso das duas fontes
                    <TbAlignBoxBottomCenterFilled />
                </h2>
                <p>{conclusion || "Nenhum dado disponível."}</p>
            </div>
        </section>
    );
}

export default Feedback;
