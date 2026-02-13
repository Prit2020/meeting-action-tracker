import api from "./api";

// Sends transcript to backend
export const extractTranscript = async (transcript: string) => {
  const response = await api.post("/api/extract", {
    transcript,
  });

  return response.data;
};