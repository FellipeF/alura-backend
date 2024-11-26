import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function generateDescriptionWithGemini(imageBuffer) {
  const prompt =
    "Generate a description for the following image:";

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Alt-text not available.";
  } catch (error) {
    console.error("Error obtaining alt-text:", error.message, error);
    throw new Error("Error obtaining alt-text from Gemini.");
  }
}