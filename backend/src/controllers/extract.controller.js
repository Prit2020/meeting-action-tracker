import Transcript from "../models/Transcript.model.js";
import { extractTasksFromTranscript } from "../services/gemini.service.js";
import { saveTasks } from "../services/task.service.js";

export const extractActionItems = async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript || transcript.trim() === "") {
      return res.status(400).json({
        message: "Transcript is required",
      });
    }

    // Save transcript first
    const savedTranscript = await Transcript.create({
      text: transcript,
    });

    // Extract tasks using Gemini
    const extractedTasks = await extractTasksFromTranscript(transcript);

    // Save extracted tasks
    const savedTasks = await saveTasks(
      extractedTasks,
      savedTranscript._id
    );

    return res.status(201).json({
      message: "Action items extracted successfully",
      transcriptId: savedTranscript._id,
      tasks: savedTasks,
    });
  } catch (error) {
    console.error("Extract controller error:", error.message);

    return res.status(500).json({
      message: "Failed to extract action items",
    });
  }
};
