
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "API_KEY" });

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: String(prompt),
  });
  console.log(response.text);
  return response.text;
}

export default main;

// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node


