import { useEffect, useState } from "react";
import type { Transcript } from "../types/transcript.types";
import api from "../services/api";
import Header from "../components/layout/Header";
import { showError } from "../utils/toast";

const History = () => {
  const [history, setHistory] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      const response = await api.get("/api/history");
      setHistory(response.data);
    } catch (error) {
      showError("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-shrink-0 bg-white z-10">
        <Header
          title="Transcript History"
          subTitle="Review your recently processed meeting transcripts."
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="w-full mx-auto py-10 px-4 space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            {loading ? (
              <p className="text-gray-500">Loading history...</p>
            ) : history.length === 0 ? (
              <p className="text-gray-500">No history available.</p>
            ) : (
              <ul className="space-y-4">
                {history.map((item) => (
                  <li key={item._id} className="border rounded-md p-4">
                    <p className="text-gray-800">
                      {item.text.length > 120
                        ? item.text.substring(0, 120) + "..."
                        : item.text}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
