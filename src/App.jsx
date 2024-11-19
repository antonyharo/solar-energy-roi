import React, { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./App.module.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const App = () => {
    const [area, setArea] = useState(20); // Área em m²
    const [dailyConsumption, setDailyConsumption] = useState(30); // Consumo diário em kWh
    const [solarRoiData, setSolarRoiData] = useState(null); // Dados do ROI Solar
    const [hydroRoiData, setHydroRoiData] = useState(null); // Dados do ROI Hidrelétrica

    const calculateROI = (
        initialCost,
        annualSavings,
        duration,
        maintenanceCost = 0,
        growthRate = 0
    ) => {
        const roiData = [];
        let cumulativeSavings = 0;

        for (let year = 1; year <= duration; year++) {
            annualSavings *= 1 + growthRate; // Crescimento anual
            const netSavings = annualSavings - maintenanceCost; // Economia líquida
            cumulativeSavings += Math.max(netSavings, 0); // Acumular apenas valores positivos
            const roi = cumulativeSavings - initialCost; // ROI acumulado
            roiData.push({ year, roi });
        }

        return roiData;
    };

    const calculateROIHydro = (annualCost, duration, growthRate = 0) => {
        const roiData = [];
        let cumulativeCost = 0;

        for (let year = 1; year <= duration; year++) {
            if (year > 1) annualCost *= 1 + growthRate; // Aplicar inflação anual
            cumulativeCost += annualCost; // Acumular custos anuais
            const roi = -cumulativeCost; // ROI é sempre negativo
            roiData.push({ year, roi });
        }

        return roiData;
    };

    const handleSimulate = (event) => {
        event.preventDefault();

        // Parâmetros fixos
        const solarIrradiation = 4.5; // kWh/m²/dia (média Brasil)
        const panelEfficiency = 0.18; // 18% eficiência
        const systemLoss = 0.85; // 85% eficiência do sistema após perdas
        const solarCostPerKWp = 6000; // R$/kWp
        const electricityCost = 0.9; // R$/kWh
        const solarMaintenancePerKWp = 200; // R$/ano/kWp

        // Energia solar
        const solarCapacity = area * panelEfficiency * systemLoss; // kWp instalados
        const solarDailyGeneration = solarCapacity * solarIrradiation; // Geração diária (kWh)
        const solarAnnualSavings = Math.min(
            solarDailyGeneration * 365 * electricityCost,
            dailyConsumption * 365 * electricityCost
        ); // Economia anual
        const solarCost = solarCapacity * solarCostPerKWp; // Custo inicial
        const solarDuration = 25; // Vida útil (anos)
        const solarGrowthRate = 0.02; // Crescimento anual na economia
        const solarRoi = calculateROI(
            solarCost,
            solarAnnualSavings,
            solarDuration,
            solarMaintenancePerKWp * solarCapacity,
            solarGrowthRate
        );

        // Energia hidrelétrica
        const hydroAnnualCost = dailyConsumption * 365 * electricityCost; // Custo anual
        const hydroDuration = 25; // Simulado por 25 anos
        const hydroGrowthRate = 0.08; // Inflação de energia
        const hydroRoi = calculateROIHydro(
            hydroAnnualCost,
            hydroDuration,
            hydroGrowthRate
        );

        setSolarRoiData(solarRoi);
        setHydroRoiData(hydroRoi);
    };

    const solarChartData = solarRoiData && {
        labels: solarRoiData.map((d) => `Ano ${d.year}`),
        datasets: [
            {
                label: "ROI Energia Solar (R$)",
                data: solarRoiData.map((d) => d.roi),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
        ],
    };

    const hydroChartData = hydroRoiData && {
        labels: hydroRoiData.map((d) => `Ano ${d.year}`),
        datasets: [
            {
                label: "ROI Hidrelétrica (R$)",
                data: hydroRoiData.map((d) => d.roi),
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
        ],
    };

    const comparisonChartData = solarRoiData &&
        hydroRoiData && {
            labels: solarRoiData.map((d) => `Ano ${d.year}`),
            datasets: [
                {
                    label: "ROI Energia Solar (R$)",
                    data: solarRoiData.map((d) => d.roi),
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                },
                {
                    label: "ROI Hidrelétrica (R$)",
                    data: hydroRoiData.map((d) => d.roi),
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                },
            ],
        };

    return (
        <div className={styles.home}>
            <h1 className={styles.title}>Simulador de ROI de Energia</h1>
            <form className={styles.form} onSubmit={handleSimulate}>
                <div className={styles.inputs}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="area">
                            <strong>Área disponível (m²):</strong>
                        </label>
                        <input
                            type="number"
                            value={area}
                            id="area"
                            onChange={(e) => setArea(Number(e.target.value))}
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="daily-consuption">
                            <strong>Consumo diário (kWh):</strong>
                        </label>
                        <input
                            type="number"
                            value={dailyConsumption}
                            id="daily-consuption"
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

            {solarRoiData && hydroRoiData && (
                <div className={styles.chartsContainer}>
                    <Line
                        data={solarChartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: "top" },
                            },
                        }}
                    />
                    <Line
                        data={hydroChartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: "top" },
                            },
                        }}
                    />
                    <Line
                        data={comparisonChartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: "top" },
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default App;
