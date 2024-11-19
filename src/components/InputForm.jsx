import { useState } from "react";

function InputForm({ onSubmit }) {
    const [area, setArea] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(area);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Área disponível (m²):
                <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Calcular</button>
        </form>
    );
}

export default InputForm;
