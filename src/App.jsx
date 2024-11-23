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
    const [area, setArea] = useState(20); // m² disponíveis para painéis
    const [dailyConsumption, setDailyConsumption] = useState(8); // kWh/dia da residência
    const [solarRoiData, setSolarRoiData] = useState(null);
    const [hydroRoiData, setHydroRoiData] = useState(null);
    const [solarChartType, setSolarChartType] = useState("line");
    const [hydroChartType, setHydroChartType] = useState("line");
    const [comparisonChartType, setComparisonChartType] = useState("line");
    const [loadingGemini, setLoadingGemini] = useState(false);
    const [geminiData, setGeminiData] = useState(null);

    // Função para calcular ROI da energia solar
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

    // Função para calcular ROI da energia hidrelétrica
    const calculateROIHydro = (annualCost, duration, growthRate = 0) => {
        const roiData = [];
        let cumulativeCost = 0;

        for (let year = 1; year <= duration; year++) {
            if (year > 1) annualCost *= 1 + growthRate;
            cumulativeCost += annualCost;
            const roi = -cumulativeCost; // ROI sempre negativo
            roiData.push({ year, roi });
        }

        return roiData;
    };

    // Simulação principal
    const handleSimulate = async (event) => {
        event?.preventDefault();

        if (area <= 0 || dailyConsumption <= 0) {
            alert("Área e consumo diário devem ser maiores que zero.");
            return;
        }

        setLoadingGemini(true);

        const solarIrradiation = 4.5; // kWh/m²/dia
        const panelEfficiency = 0.18; // Eficiência do painel
        const systemLoss = 0.85; // Perdas no sistema
        const solarCostPerKWp = 6000; // R$/kWp instalado
        const electricityCost = 0.9; // R$/kWh
        const solarMaintenancePerKWp = 200; // R$/ano por kWp
        const solarDuration = 25; // Vida útil dos painéis (anos)
        const solarGrowthRate = 0.02; // Inflação energética
        const hydroGrowthRate = 0.08; // Inflação maior para a rede elétrica

        const solarCapacity = area * panelEfficiency * systemLoss; // Capacidade instalada em kW
        const solarDailyGeneration = solarCapacity * solarIrradiation; // Geração diária em kWh
        const solarAnnualSavings = Math.min(
            solarDailyGeneration * 365 * electricityCost, // Economia total
            dailyConsumption * 365 * electricityCost // Limitada pelo consumo diário
        );
        const solarCost = solarCapacity * solarCostPerKWp; // Investimento inicial
        const solarRoi = calculateROI(
            solarCost,
            solarAnnualSavings,
            solarDuration,
            solarMaintenancePerKWp * solarCapacity,
            solarGrowthRate
        );

        const hydroAnnualCost = dailyConsumption * 365 * electricityCost; // Conta anual de luz
        const hydroDuration = 25; // Prazo de comparação
        const hydroRoi = calculateROIHydro(
            hydroAnnualCost,
            hydroDuration,
            hydroGrowthRate
        );

        setSolarRoiData(solarRoi);
        setHydroRoiData(hydroRoi);

        await fetchGemini(
            {
                solarCost: solarCost,
                solarAnnualSavings: solarAnnualSavings,
                solarDuration: solarDuration,
                solarMaintenance: solarMaintenancePerKWp * solarCapacity,
                solarCapacity: solarCapacity,
                solarGrowthRate: solarGrowthRate,
                solarPanelsArea: area,  
            },
            {
                hydroAnnualCost: hydroAnnualCost,
                hydroDuration: hydroDuration,
                hydroGrowthRate: hydroGrowthRate,
            }
        );
    };

    const fetchGemini = async (solarData, hydroData) => {
        try {
            const [
                solarProsResponse,
                solarConsResponse,
                hydroProsResponse,
                hydroConsResponse,
                conclusionResponse,
            ] = await Promise.all([
                gemini(
                    "prós do uso da energia solar (sem necessidade de colocar 'Energia solar:' ao inciar a resposta)",
                    solarData,
                    dailyConsumption
                ),
                gemini(
                    "contras do uso da energia solar",
                    solarData,
                    dailyConsumption
                ),
                gemini(
                    "prós do uso da energia hidrelétrica",
                    hydroData,
                    dailyConsumption
                ),
                gemini(
                    "contras do uso da energia hidrelétrica",
                    hydroData,
                    dailyConsumption
                ),
                gemini(
                    "conclusão entre o uso da energia solar e o uso da energia hidrelétrica proveniente das grande redes nacionais",
                    { solar: solarData, hydro: hydroData },
                    dailyConsumption
                ),
            ]);

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

            setGeminiData(response);
            console.log(response);
        } catch (error) {
            console.error("Erro ao buscar dados do Gemini:", error);
            throw error;
        } finally {
            setLoadingGemini(false);
        }
    };

    const solarChartData = solarRoiData && {
        labels: solarRoiData.map((d) => `Ano ${d.year}`),
        datasets: [
            {
                label: "ROI Energia Solar (R$)",
                data: solarRoiData.map((d) => d.roi),
                borderColor: "hsla(34, 100%, 50%, 0.8)",
                backgroundColor: "hsla(34, 100%, 50%, 0.6)",
                borderWidth: 4,
            },
        ],
    };

    const hydroChartData = hydroRoiData && {
        labels: hydroRoiData.map((d) => `Ano ${d.year}`),
        datasets: [
            {
                label: "ROI Hidrelétrica (R$)",
                data: hydroRoiData.map((d) => d.roi),
                borderColor: "hsla(212, 100%, 66%, 0.8)",
                backgroundColor: "hsla(212, 100%, 66%, 0.5)",
                borderWidth: 4,
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
                    borderColor: "hsla(34, 100%, 50%, 0.8)",
                    backgroundColor: "hsla(34, 100%, 50%, 0.6)",
                    borderWidth: 4,
                },
                {
                    label: "ROI Hidrelétrica (R$)",
                    data: hydroRoiData.map((d) => d.roi),
                    borderColor: "hsla(212, 100%, 50%, 0.8)",
                    backgroundColor: "hsla(212, 100%, 50%, 0.5)",
                    borderWidth: 4,
                },
            ],
        };

    // useEffect(() => handleSimulate(), []);

    return (
        <>
            <Header />
            <div className={styles.home}>
                <div className={styles.textContainer}>
                    <h1>
                        Simulador de ROI de{" "}
                        <span className={styles.solar}>Energia Solar</span> x{" "}
                        <span className={styles.hydro}>Hidrelétrica</span>
                    </h1>
                    <p>
                        Através deste simulador, você pode comparar o retorno
                        sobre investimento (ROI) de sistemas de energia solar e
                        hidrelétrica. Com base nos dados fornecidos sobre área
                        disponível e consumo diário, será possível entender como
                        cada opção pode influenciar seus custos ao longo do
                        tempo.
                    </p>
                </div>

                <Form
                    area={area}
                    setArea={setArea}
                    dailyConsumption={dailyConsumption}
                    setDailyConsumption={setDailyConsumption}
                    handleSimulate={handleSimulate}
                />

                {solarRoiData && hydroRoiData && (
                    <>
                        <ChartComponent
                            title="Comparação entre as duas fontes de energia"
                            chartData={comparisonChartData}
                            chartType={comparisonChartType}
                            setChartType={setComparisonChartType}
                        />

                        {loadingGemini ? (
                            <p>Carregando prós e contras...</p>
                        ) : (
                            <Feedback
                                solar={geminiData.solar}
                                hydro={geminiData.hydro}
                                conclusion={geminiData.conclusion}
                            />
                        )}

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

                <section className={styles.moreInfo}>
                    <h2>
                        Ficou curioso de como é o funcionamento da energia
                        solar?
                    </h2>
                    <p>
                        Neste espaço, você encontrará uma vasta gama de
                        informações, curiosidades e descobertas fascinantes
                        sobre essa fonte de energia renovável, natural e
                        abundante em todo o planeta. A energia solar tem um
                        enorme potencial para transformar nosso futuro, e aqui,
                        você poderá explorar artigos completos, pesquisas e
                        análises sobre como ela pode ser utilizada de forma mais
                        eficiente e sustentável. Para se aprofundar no tema,
                        acesse nossos <a href="#">Artigos</a> e saiba mais sobre
                        as vantagens e inovações dessa fonte de energia.
                    </p>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default App;
