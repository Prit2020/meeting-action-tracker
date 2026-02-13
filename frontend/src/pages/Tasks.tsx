import { useEffect, useState } from "react";
import { fetchTasks, updateTask, deleteTask } from "../services/task.service";
import type { Task } from "../types/task.types";
import Header from "../components/layout/Header";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import { Check, Pencil, Trash2, Save, X } from "lucide-react";
import { showSuccess, showError } from "../utils/toast";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "open" | "done">("all");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    task: "",
    owner: "",
    dueDate: "",
  });

  const loadTasks = async (status?: string) => {
    setLoading(true);
    try {
      const data = await fetchTasks(status);
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(filter === "all" ? undefined : filter);
  }, [filter]);

  const handleMarkDone = async (id: string) => {
    try {
      await updateTask(id, { status: "done" });
      showSuccess("Task marked as done");
      loadTasks(filter === "all" ? undefined : filter);
    } catch (err) {
      showError(err as string);
    }
  };

  const handleDelete = async (id: string) => {
  try {
    await deleteTask(id);
    showSuccess("Task deleted");
    loadTasks(filter === "all" ? undefined : filter);
  } catch (err) {
    showError(err as string);
  }
};

  const filterDropdown = (
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value as "all" | "open" | "done")}
      className="border rounded-md px-3 py-2 text-sm cursor-pointer"
    >
      <option value="all" className="cursor-pointer">
        All
      </option>
      <option value="open">Open</option>
      <option value="done">Done</option>
    </select>
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-shrink-0 bg-white z-10">
        <Header
          title="Task Manager"
          subTitle="View, update, and track action items extracted from your meetings."
          actions={filterDropdown}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="w-full mx-auto py-10 px-4 space-y-6">
          {/* Task List */}
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 overflow-x-auto">
            {loading ? (
              <p className="text-gray-500">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="text-gray-500">No tasks found.</p>
            ) : (
              <Table
                headers={["Task", "Owner", "Due Date", "Status", "Actions"]}
              >
                {tasks.map((task) => (
                  <tr key={task._id} className="text-sm">
                    <td className="px-4 py-3">
                      {editingId === task._id ? (
                        <input
                          className="border p-2 rounded w-full"
                          value={editData.task}
                          onChange={(e) =>
                            setEditData({ ...editData, task: e.target.value })
                          }
                        />
                      ) : (
                        <span
                          className={
                            task.status === "done"
                              ? "line-through text-gray-400"
                              : "text-gray-800"
                          }
                        >
                          {task.task}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {editingId === task._id ? (
                        <input
                          className="border p-2 rounded w-full"
                          value={editData.owner}
                          onChange={(e) =>
                            setEditData({ ...editData, owner: e.target.value })
                          }
                        />
                      ) : (
                        task.owner || "-"
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {editingId === task._id ? (
                        <input
                          className="border p-2 rounded w-full"
                          value={editData.dueDate}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              dueDate: e.target.value,
                            })
                          }
                        />
                      ) : (
                        task.dueDate || "-"
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.status === "done"
                            ? "bg-green-100 text-green-700 uppercase"
                            : "bg-yellow-100 text-yellow-700 uppercase"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {editingId === task._id ? (
                          <>
                            <Button
                              variant="success"
                              size="sm"
                              onClick={async () => {
                                await updateTask(task._id, editData);
                                showSuccess("Task updated");
                                setEditingId(null);
                                loadTasks(
                                  filter === "all" ? undefined : filter,
                                );
                              }}
                              className="flex items-center gap-1.5"
                            >
                              <Save className="w-4 h-4" />
                              <span className="hidden sm:inline">Save</span>
                            </Button>

                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => setEditingId(null)}
                              className="flex items-center gap-1.5"
                            >
                              <X className="w-4 h-4" />
                              <span className="hidden sm:inline">Cancel</span>
                            </Button>
                          </>
                        ) : (
                          <>
                            {task.status !== "done" && (
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleMarkDone(task._id)}
                                className="flex items-center gap-1.5"
                              >
                                <Check className="w-4 h-4" />
                                <span className="hidden sm:inline">Done</span>
                              </Button>
                            )}

                            {task.status !== "done" && (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => {
                                  setEditingId(task._id);
                                  setEditData({
                                    task: task.task,
                                    owner: task.owner || "",
                                    dueDate: task.dueDate || "",
                                  });
                                }}
                                className="flex items-center gap-1.5"
                              >
                                <Pencil className="w-4 h-4" />
                                <span className="hidden sm:inline">Edit</span>
                              </Button>
                            )}

                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(task._id)}
                              className="flex items-center gap-1.5"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="hidden sm:inline">Delete</span>
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
