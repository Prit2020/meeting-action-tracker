import { useEffect, useState } from "react";
import type { BackendStatus } from "../types/status.types";
import { fetchStatus } from "../services/status.service";
import Header from "../components/layout/Header";
import { showError } from "../utils/toast";

const Status = () => {
  const [status, setStatus] = useState<BackendStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStatus = async () => {
    try {
      const data = await fetchStatus();
      setStatus(data);
    } catch (error) {
      showError("Unable to load system status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  return (
    <>
      <Header
        title="System Status"
        subTitle="Check the health of the backend, database, and AI services."
      />
      <div className="w-full mx-auto py-10 px-4 space-y-6">
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          {loading ? (
            <p className="text-gray-500">Checking system status...</p>
          ) : status ? (
            <>
              <StatusItem label="Backend" value={status.backend} />
              <StatusItem label="Database" value={status.database} />
              {status.llm && <StatusItem label="LLM" value={status.llm} />}
            </>
          ) : (
            <p className="text-red-500">Unable to load status</p>
          )}
        </div>
      </div>
    </>
  );
};

const StatusItem = ({ label, value }: { label: string; value: string }) => {
  const isOk =
    value.toLowerCase() === "ok" ||
    value.toLowerCase() === "okay" ||
    value.toLowerCase() === "connected";

  return (
    <div className="flex justify-between items-center py-3 border-b last:border-none">
      <span className="text-gray-700 font-medium">{label}</span>
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          isOk ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {value}
      </span>
    </div>
  );
};

export default Status;