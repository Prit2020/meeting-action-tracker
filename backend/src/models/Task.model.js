import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    transcriptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transcript",
      required: true,
    },

    task: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: String,
      default: null,
      trim: true,
    },

    dueDate: {
      type: String,
      default: null,
      trim: true,
    },

    status: {
      type: String,
      enum: ["open", "done"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;