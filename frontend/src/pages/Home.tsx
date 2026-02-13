import { useState } from "react";
import TranscriptForm from "../components/transcript/TranscriptForm";
import type { Task } from "../types/task.types";
import Header from "../components/layout/Header";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-shrink-0 bg-white z-10">
        <Header
          title="Meeting Action Extractor"
          subTitle="Paste a meeting transcript to automatically identify action items, owners, and deadlines."
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="w-full mx-auto py-10 px-4 space-y-8">
          {/* Transcript Input */}
          <TranscriptForm onExtracted={setTasks} />

          {/* Extracted Tasks Display */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Extracted Action Items
            </h2>

            {tasks.length === 0 ? (
              <p className="text-gray-500">No action items extracted yet.</p>
            ) : (
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task._id}
                    className="border border-gray-200 rounded-md p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{task.task}</p>

                      {task.owner && (
                        <p className="text-sm text-gray-600">
                          Owner: {task.owner}
                        </p>
                      )}

                      {task.dueDate && (
                        <p className="text-sm text-gray-600">
                          Due: {task.dueDate}
                        </p>
                      )}
                    </div>

                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        task.status === "done"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.status}
                    </span>
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

export default Home;
