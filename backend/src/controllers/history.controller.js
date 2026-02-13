import { getLastFiveTranscripts } from "../services/transcript.service.js";

export const getHistory = async (req, res) => {
  try {
    const transcripts = await getLastFiveTranscripts();

    return res.status(200).json(transcripts);
  } catch (error) {
    console.error("History fetch error:", error.message);

    return res.status(500).json({
      message: "Failed to fetch transcript history",
    });
  }
};
