import { GoogleGenerativeAI } from "@google/generative-ai";
// import "dotenv/config";

export const gemini = async (context, roi, dailyConsumption) => {
    const apiKey = import.meta.env.VITE_GEMINI_API;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    Você está gerando conteúdo para um site que compara energia solar com outras fontes de energia para uso residencial. 
    ⚠️ **Instruções importantes**:
    - Leve em consideraçõo consumo diário para dar uma resposta assertiva.
    - Não mencione ou considere a instalação de usinas hidrelétricas em residências.
    - Considere que as residências usam energia hidrelétrica diretamente da rede elétrica.
    - A análise deve focar apenas no contexto dado e não fugir do tema do consumo residencial.
    - Considere os dados ROI, ainda que falte infomações, use o bom senso para responder.
    - Avalie o alto investimento x consumo diário, 8kWh diários para um custo elevadíssimo de instalação de paíneis solares em uma área enorme não vale a pena, por exemplo.
    - Não inclua nenhuma formatação markdown ou texto adicional. Retorne uma resposta objetiva.
    - Não inclua na sua resposta que há a ausência de dados ou que seria necessário dados mais refinados. USE O BOM SENSO.
    - Leve em consideração os benefícios a longo prazo.

    Contexto: ${context}
    Dados personalizados (ROI): ${roi}
    Consumo diário (kWh): ${dailyConsumption}

    Gere uma resposta em 40 palavras.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
};
