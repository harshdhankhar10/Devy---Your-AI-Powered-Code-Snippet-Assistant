
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    throw new Error("Missing API KEY in environment variables");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });


const getAILabResponse = async (prompt: string) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ]
        });

        return response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } catch (error) {
        console.error("AI Error:", error);
        return "Sorry, something went wrong while generating the response.";
    }
};

export default getAILabResponse;
