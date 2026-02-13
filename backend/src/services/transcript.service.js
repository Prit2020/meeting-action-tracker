import Transcript from "../models/Transcript.model.js";

/* GET LAST 5 TRANSCRIPTS */
export const getLastFiveTranscripts = async () => {
  return await Transcript.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("_id text createdAt");
};
