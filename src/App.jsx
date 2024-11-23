import { useEffect, useState } from "react";
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
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import Feedback from "./components/Feedback/Feedback";
import ChartComponent from "./components/ChartComponent/ChartComponent";
import Footer from "./components/Footer/Footer";
import { gemini } from "./utils/api";

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
    const [geminiData, setGeminiData] = useState(null);

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

    const handleSimulate = async (event) => {
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

        // parametros
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

        await fetchGemini(
            {
                cost: solarCost,
                annualSavings: solarAnnualSavings,
                duration: solarDuration,
                maintenance: solarMaintenancePerKWp * solarCapacity,
                capacity: solarCapacity,
                growthRate: solarGrowthRate,
            },
            {
                annualCost: hydroAnnualCost,
                duration: hydroDuration,
                growthRate: hydroGrowthRate,
            }
        );
    };

    const solarChartData = solarRoiData && {
        labels: solarRoiData.map((d) => `Ano ${d.year}`),
        datasets: [
            {
                label: "ROI Energia Solar (R$)",
                data: solarRoiData.map((d) => d.roi),
                borderColor: "hsla(54, 100%, 66%, 0.7)",
                backgroundColor: "hsla(54, 100%, 66%, 0.3)",
                borderWidth: 2,
            },
        ],
    };

    const hydroChartData = hydroRoiData && {
        labels: hydroRoiData.map((d) => `Ano ${d.year}`),
        datasets: [
            {
                label: "ROI Hidrelétrica (R$)",
                data: hydroRoiData.map((d) => d.roi),
                borderColor: "hsla(212, 100%, 66%, 0.7)",
                backgroundColor: "hsla(212, 100%, 66%, 0.3)",
                borderWidth: 2,
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
                    borderColor: "hsla(54, 100%, 66%, 0.7)",
                    backgroundColor: "hsla(54, 100%, 66%, 0.3)",
                    borderWidth: 2,
                },
                {
                    label: "ROI Hidrelétrica (R$)",
                    data: hydroRoiData.map((d) => d.roi),
                    borderColor: "hsla(212, 100%, 66%, 0.7)",
                    backgroundColor: "hsla(212, 100%, 66%, 0.3)",
                    borderWidth: 2,
                },
            ],
        };

    const formatSolarData = (data) => ({
        cost: data.cost,
        annualSavings: data.annualSavings,
        duration: data.duration,
        maintenance: data.maintenance,
        capacity: data.capacity,
        growthRate: data.growthRate,
    });

    const formatHydroData = (data) => ({
        annualCost: data.annualCost,
        duration: data.duration,
        maintenance: data.maintenance,
        capacity: data.capacity,
        growthRate: data.growthRate,
    });

    const fetchGemini = async (solarData, hydroData) => {
        try {
            // Dados formatados
            const formattedSolarData = formatSolarData(solarData);
            const formattedHydroData = formatHydroData(hydroData);

            // Solicitações assíncronas
            const [
                solarProsResponse,
                solarConsResponse,
                hydroProsResponse,
                hydroConsResponse,
                conclusionResponse,
            ] = await Promise.all([
                gemini("prós do uso da energia solar", formattedSolarData),
                gemini("contras do uso da energia solar", formattedSolarData),
                gemini(
                    "prós do uso da energia hidrelétrica",
                    formattedHydroData
                ),
                gemini(
                    "contras do uso da energia hidrelétrica",
                    formattedHydroData
                ),
                gemini("conclusão entre energia solar e hidrelétrica", {
                    solar: formattedSolarData,
                    hydro: formattedHydroData,
                }),
            ]);

            // 

            // Resposta consolidada
            const response = {
                solar: {
                    pros: solarProsResponse,
                    cons: solarConsResponse,
                },
                hydro: {
                    pros: hydroProsResponse,
                    cons: hydroConsResponse,
                },
                conclusion: conclusionResponse,
            };

            setGeminiData(response); // Atualiza o estado
            console.log(response); // Teste

            // return response; // Retorno opcional para uso posterior
        } catch (error) {
            console.error("Erro ao buscar dados do Gemini:", error);
            throw error; // Propaga o erro para manipulação em outro lugar, se necessário
        }
    };

    return (
        <div className={styles.home}>
            <Header />

            <div className={styles.textContainer}>
                <h1>
                    Simulador de ROI de <span>Energia Solar</span> x{" "}
                    <span>Hidrelétrica</span>
                </h1>
                <p>
                    Através deste simulador, você pode comparar o retorno sobre
                    investimento (ROI) de sistemas de energia solar e
                    hidrelétrica. Com base nos dados fornecidos sobre área
                    disponível e consumo diário, será possível entender como
                    cada opção pode influenciar seus custos ao longo do tempo.
                </p>
            </div>

            <Form
                area={area}
                setArea={setArea}
                dailyConsumption={dailyConsumption}
                setDailyConsumption={setDailyConsumption}
                handleSimulate={handleSimulate}
            />

            <hr />

            {solarRoiData && hydroRoiData && (
                <>
                    <div className={styles.feedbackContainer}>
                        {" "}
                        <ChartComponent
                            title="Comparação entre as duas"
                            chartData={comparisonChartData}
                            chartType={comparisonChartType}
                            setChartType={setComparisonChartType}
                        />
                        {/* <Feedback /> */}
                        <Feedback geminiData={geminiData} />
                    </div>
                    <hr />
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
                    </section>
                </>
            )}

            <Footer />
        </div>
    );
};

export default App;
