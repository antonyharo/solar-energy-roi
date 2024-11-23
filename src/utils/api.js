import { GoogleGenerativeAI } from "@google/generative-ai";
// import "dotenv/config";

export const gemini = async (context, roi) => {
    // const apiKey = process.env.GEMINI_KEY;
    const genAI = new GoogleGenerativeAI(
        ""
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Você está sendo diretamente usado dentro de um website, gerando conteúdo que compara o uso da energia solar x energia hidrelétrica, retorne sua resposta sem nenhum tipo de formatação markdown.
    Com base nos seguintes dados de ROI, gere, em até 40 palavras, ${context}:
    ROI: 
      - Custo Inicial: ${roi.cost}
      - Economia Anual: ${roi.annualSavings}
      - Duração: ${roi.duration} anos
      - Manutenção: ${roi.maintenance}
      - Capacidade: ${roi.capacity} kWp
      - Taxa de Crescimento: ${roi.growthRate * 100}%`;

    const result = await model.generateContent(prompt);
    return result.response.text();
};

