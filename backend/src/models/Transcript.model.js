import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
  },
  {
    timestamps: true, 
  }
);

const Transcript = mongoose.model("Transcript", transcriptSchema);

export default Transcript;