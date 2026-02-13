import { useState } from "react";
import { showError, showSuccess } from "../../utils/toast";
import { extractTranscript } from "../../services/transcript.service";
import type { Task } from "../../types/task.types";
import Button from "../ui/Button";
import { Wand2 } from "lucide-react";

interface TranscriptFormProps {
  onExtracted: (tasks: Task[]) => void;
}

const TranscriptForm = ({ onExtracted }: TranscriptFormProps) => {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtract = async () => {
    if (!transcript.trim()) {
      setError("Transcript cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await extractTranscript(transcript);
      onExtracted(response.tasks);
      showSuccess("Action items extracted successfully");
      setTranscript("");
    } catch (err: any) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Paste Meeting Transcript
      </h2>

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows={6}
        placeholder="Paste meeting transcript here..."
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        variant="primary"
        size="sm"
        onClick={handleExtract}
        className="flex items-center gap-2"
      >
        <Wand2 className="w-4 h-4" />
        {loading ? "Extracting..." : "Extract Action Items"}
      </Button>
    </div>
  );
};

export default TranscriptForm;
