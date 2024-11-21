import styles from "./Form.module.css"

function Form({ area, setArea, dailyConsumption, setDailyConsumption, handleSimulate }) {
    return (
        <form className={styles.form} onSubmit={handleSimulate}>
            <div className={styles.inputs}>
                <div className={styles.inputContainer}>
                    <label htmlFor="area" className={styles.label}>
                        Área disponível (m²):
                    </label>
                    <input
                        type="number"
                        value={area}
                        id="area"
                        onChange={(e) => setArea(Number(e.target.value))}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="daily-consumption" className={styles.label}>
                        Consumo diário (kWh):
                    </label>
                    <input
                        type="number"
                        value={dailyConsumption}
                        id="daily-consumption"
                        onChange={(e) =>
                            setDailyConsumption(Number(e.target.value))
                        }
                    />
                </div>
            </div>

            <button type="submit" className={styles.submitButton}>
                Simular
            </button>
        </form>
    );
}

export default Form;
