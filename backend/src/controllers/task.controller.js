import { getAllTasks, updateTaskById, deleteTaskById} from "../services/task.service.js";

/* GET ALL TASKS */
export const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const tasks = await getAllTasks(status);
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error.message);

    return res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};

/* UPDATE TASK */
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await updateTaskById(id, req.body);

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Update task error:", error.message);

    return res.status(400).json({
      message: error.message,
    });
  }
};

/* DELETE TASK */
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteTaskById(id);

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error.message);

    return res.status(400).json({
      message: error.message,
    });
  }
};
