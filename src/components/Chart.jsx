import { Line } from "react-chartjs-2";

function ROIChart({ roiData }) {
    const data = {
        labels: roiData.map((item) => `Ano ${item.year}`),
        datasets: [
            {
                label: "Economia Acumulada (R$)",
                data: roiData.map((item) => item.cumulativeSavings),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    return <Line data={data} />;
}

export default ROIChart;
