import { BiSolidLike, BiSolidDislike  } from "react-icons/bi";
import styles from "./Feedback.module.css";

function Feedback({ data }) {
    return (
        <section className={styles.feedbackContainer}>
            <div className={styles.pros}>
                <h2>Prós <BiSolidLike /></h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repudiandae perferendis quisquam fugit placeat quos ducimus.
                    Error ducimus dolor, maxime sapiente eos deleniti ratione
                    pariatur reiciendis assumenda totam exercitationem ad neque
                    cum a sint impedit inventore minima repellat? Repudiandae
                    totam facere eos autem rem minus. Explicabo expedita hic
                    tempore aspernatur ullam?
                </p>
            </div>
            <div className={styles.cons}>
                <h2>Contras <BiSolidDislike /></h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur eveniet quam laboriosam suscipit laudantium
                    officia nihil? Cumque soluta commodi culpa, eius dolorum
                    deserunt aperiam cupiditate temporibus itaque. Voluptatem
                    odio commodi temporibus velit. Reiciendis rem itaque non
                    aut? Eaque enim amet incidunt nisi sequi libero, odit
                    beatae. In adipisci temporibus est.
                </p>
            </div>
        </section>
    );
}

export default Feedback;
