import { GoogleGenerativeAI } from "@google/generative-ai";

export const extractTasksFromTranscript = async (transcript) => {
  try {
    // Safety check
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }

    // Initialize Gemini INSIDE function
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an AI assistant that extracts action items from meeting transcripts.

Return ONLY a valid JSON array.

Each item must have:
- task (string)
- owner (string or null)
- dueDate (string or null)

If no action items exist, return an empty array [].

Transcript:
${transcript}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Safely extract JSON
    const jsonStart = responseText.indexOf("[");
    const jsonEnd = responseText.lastIndexOf("]");

    if (jsonStart === -1 || jsonEnd === -1) {
      return [];
    }

    const jsonString = responseText.substring(jsonStart, jsonEnd + 1);

    return JSON.parse(jsonString);

  } catch (error) {
    console.error("Gemini extraction error:", error.message);
    throw new Error("Failed to extract action items");
  }
};