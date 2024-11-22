import { GoogleGenerativeAI } from "@google/generative-ai";
// import "dotenv/config";

export const gemini = async (solarData, hydroData) => {
    // const apiKey = process.env.GEMINI_KEY;
    const genAI = new GoogleGenerativeAI(
        "apiKey" // Chave da API
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Com base nos seguintes dados de ROI:
    Energia Solar: 
      - Custo Inicial: ${solarData.cost}
      - Economia Anual: ${solarData.annualSavings}
      - Duração: ${solarData.duration} anos
      - Manutenção: ${solarData.maintenance}
      - Capacidade: ${solarData.capacity} kWp
      - Taxa de Crescimento: ${solarData.growthRate * 100}%
    
    Energia Hidrelétrica: 
      - Custo Anual: ${hydroData.annualCost}
      - Duração: ${hydroData.duration} anos
      - Taxa de Crescimento: ${hydroData.growthRate * 100}%
    
    Responda exclusivamente em JSON com a seguinte estrutura:
    {
      "pros": "Descrição breve dos prós de cada tipo de energia, com até 50 palavras.",
      "cons": "Descrição breve dos contras de cada tipo de energia, com até 50 palavras."
    }
    Não adicione texto adicional ou formatação como Markdown. Apenas retorne o JSON válido.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
};
