import { GoogleGenerativeAI } from "@google/generative-ai";
// import "dotenv/config";

export const gemini = async (context, roi) => {
    const apiKey = import.meta.env.VITE_GEMINI_API;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Você está sendo diretamente usado dentro de um website, gerando conteúdo que compara o uso da energia solar x energia de outras fontes em residências, levando em consideração que os custos de instalação da energia hidrelétrica são indefinidos pois residências possuem apenas o circuito elétrico e consomem a energia hidrelétrica das grandes redes elétricas nacionais, pagando contas de energia, portanto, desconsidere dados vazios e retorne uma resposta assertiva, mesmo sem dados suficientes. Sua resposta não deve ter nenhum tipo de formatação markdown.
    Com base nos seguintes dados personalizados ROI, gere, em até 40 palavras, ${context}:
    ROI: 
      - Custo Inicial (apenas considere para a energia solar): ${roi.cost}
      - Economia Anual: ${roi.annualSavings}
      - Duração: ${roi.duration} anos
      - Manutenção (apenas considere para a energia solar): ${roi.maintenance}
      - Capacidade (apenas considere para a energia solar): ${roi.capacity} kWp
      - Taxa de Crescimento: ${roi.growthRate * 100}%`;

    const result = await model.generateContent(prompt);
    return result.response.text();
};
