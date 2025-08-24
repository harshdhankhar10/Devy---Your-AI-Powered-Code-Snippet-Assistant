import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const getAILabResponse = async () => {
    console.log("this is ai response")
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "who are you? "
    })
    return response.text
}


export default getAILabResponse;