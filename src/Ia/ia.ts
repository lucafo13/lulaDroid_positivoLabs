import { GoogleGenAI } from "@google/genai";
import { prompt } from "./prompt";
const ia = new GoogleGenAI({
  apiKey: import.meta.env.VITE_APIKEY
});

type Ihist = {
  role: "user" | "system" | "assistant";
  content: string;
};

export const IaResponde = async (hist: Ihist[]) => {
console.log("começando");

  const systemInstruction = [
    prompt,
    ...hist
      .filter(msg => msg.role === "system")
      .map(msg => msg.content)
  ].join("\n\n");
  console.log("meio")
  const contents = hist
    .filter(msg => msg.role !== "system")
    .map(msg => ({
      role: msg.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: msg.content }]
    }));
console.log("chgando");

  const res = await ia.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents,
    config: {
      systemInstruction,
       maxOutputTokens: 150,
  temperature: 0.9
    }
  });
  console.log("Auraxxxs");
  
console.log(res.text);

  return res.text ?? "";
};