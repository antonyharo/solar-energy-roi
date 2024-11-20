import React from "react";
import { Line, Bar } from "react-chartjs-2";
import styles from "./ChartComponent.module.css";

const ChartComponent = ({
    title,
    chartData,
    chartType,
    setChartType,
}) => {
    return (
        <div className={styles.chartContainer}>
            <h2>{title}</h2>
            <div className={styles.chartButtons}>
                <button
                    className={
                        chartType === "line"
                            ? styles.activeButton
                            : styles.chartButton
                    }
                    onClick={() => setChartType("line")}
                >
                    Linha
                </button>
                <button
                    className={
                        chartType === "bar"
                            ? styles.activeButton
                            : styles.chartButton
                    }
                    onClick={() => setChartType("bar")}
                >
                    Barra
                </button>
            </div>
            {chartType === "line" && (
                <Line data={chartData} options={{ responsive: true }} />
            )}
            {chartType === "bar" && (
                <Bar data={chartData} options={{ responsive: true }} />
            )}
        </div>
    );
};

export default ChartComponent;
