export function calculateCost(area) {
    const costPerSqMeter = 1000; // Custo por metro quadrado (exemplo)
    return area * costPerSqMeter;
}

export function calculateROI(area, years = 10) {
    const energyPerSqMeter = 400; // Geração anual de energia (kWh/m²)
    const energyCost = 0.5; // Custo por kWh
    const cost = calculateCost(area);

    const roiData = [];
    let cumulativeSavings = 0;

    for (let year = 1; year <= years; year++) {
        const savings = area * energyPerSqMeter * energyCost;
        cumulativeSavings += savings;
        roiData.push({ year, savings, cumulativeSavings });
    }

    return { cost, roiData };
}
