import { GoogleGenerativeAI } from "@google/generative-ai";
// import "dotenv/config";

export const gemini = async (context, roi) => {
    const apiKey = import.meta.env.VITE_GEMINI_API;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Você está gerando conteúdo para um site que compara energia solar com outras fontes de energia para uso residencial. 
    ⚠️ **Instruções importantes**:
    - Leve em consideraçõo consumo diário para dar uma resposta assertiva.
    - Não mencione ou considere a instalação de usinas hidrelétricas em residências.
    - Considere que as residências usam energia hidrelétrica diretamente da rede elétrica.
    - A análise deve focar apenas no contexto dado e não fugir do tema do consumo residencial.
    - Não inclua nenhuma formatação markdown ou texto adicional. Retorne uma resposta objetiva.

    Contexto: ${context}
    Dados personalizados (ROI): ${roi}

    Gere uma resposta em até 40 palavras.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
};

// - Custo Inicial (apenas considere para a energia solar): ${roi.cost}
// - Economia Anual: ${roi.annualSavings}
// - Duração: ${roi.duration} anos
// - Manutenção (apenas considere para a energia solar): ${roi.maintenance}
// - Capacidade (apenas considere para a energia solar): ${roi.capacity} kWp
// - Taxa de Crescimento: ${roi.growthRate * 100}%`;
