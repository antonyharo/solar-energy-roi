import { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import styles from "./App.module.css";
import Form from "./components/Form/Form";
import ChartComponent from "./components/ChartComponent/ChartComponent";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const App = () => {
    const [area, setArea] = useState(20);
    const [dailyConsumption, setDailyConsumption] = useState(30);
    const [solarRoiData, setSolarRoiData] = useState(null);
    const [hydroRoiData, setHydroRoiData] = useState(null);
    const [solarChartType, setSolarChartType] = useState("line");
    const [hydroChartType, setHydroChartType] = useState("line");
    const [comparisonChartType, setComparisonChartType] = useState("line");

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
            annualSavings *= 1 + growthRate;
            const netSavings = annualSavings - maintenanceCost;
            cumulativeSavings += Math.max(netSavings, 0);
            const roi = cumulativeSavings - initialCost;
            roiData.push({ year, roi });
        }

        return roiData;
    };

    const calculateROIHydro = (annualCost, duration, growthRate = 0) => {
        const roiData = [];
        let cumulativeCost = 0;

        for (let year = 1; year <= duration; year++) {
            if (year > 1) annualCost *= 1 + growthRate;
            cumulativeCost += annualCost;
            const roi = -cumulativeCost;
            roiData.push({ year, roi });
        }

        return roiData;
    };

    const handleSimulate = (event) => {
        event.preventDefault();

        const solarIrradiation = 4.5;
        const panelEfficiency = 0.18;
        const systemLoss = 0.85;
        const solarCostPerKWp = 6000;
        const electricityCost = 0.9;
        const solarMaintenancePerKWp = 200;

        const solarCapacity = area * panelEfficiency * systemLoss;
        const solarDailyGeneration = solarCapacity * solarIrradiation;
        const solarAnnualSavings = Math.min(
            solarDailyGeneration * 365 * electricityCost,
            dailyConsumption * 365 * electricityCost
        );
        const solarCost = solarCapacity * solarCostPerKWp;
        const solarDuration = 25;
        const solarGrowthRate = 0.02;
        const solarRoi = calculateROI(
            solarCost,
            solarAnnualSavings,
            solarDuration,
            solarMaintenancePerKWp * solarCapacity,
            solarGrowthRate
        );

        const hydroAnnualCost = dailyConsumption * 365 * electricityCost;
        const hydroDuration = 25;
        const hydroGrowthRate = 0.08;
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
            <p>
                Através deste simulador, você pode comparar o retorno sobre
                investimento (ROI) de sistemas de energia solar e hidrelétrica.
                Com base nos dados fornecidos sobre área disponível e consumo
                diário, será possível entender como cada opção pode influenciar
                seus custos ao longo do tempo.
            </p>

            <Form
                area={area}
                setArea={setArea}
                dailyConsumption={dailyConsumption}
                setDailyConsumption={setDailyConsumption}
                handleSimulate={handleSimulate}
            />

            {solarRoiData && hydroRoiData && (
                <section className={styles.chartsContainer}>
                    <ChartComponent
                        title="ROI Energia Solar"
                        chartData={solarChartData}
                        chartType={solarChartType}
                        setChartType={setSolarChartType}
                    />
                    <ChartComponent
                        title="ROI Energia Hidrelétrica"
                        chartData={hydroChartData}
                        chartType={hydroChartType}
                        setChartType={setHydroChartType}
                    />
                    <ChartComponent
                        title="Comparação entre as duas"
                        chartData={comparisonChartData}
                        chartType={comparisonChartType}
                        setChartType={setComparisonChartType}
                    />
                </section>
            )}
        </div>
    );
};

export default App;
