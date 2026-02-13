import Task from "../models/Task.model.js";
import mongoose from "mongoose";


export const saveTasks = async (tasks, transcriptId) => {
  if (!tasks || tasks.length === 0) {
    return [];
  }

  const formattedTasks = tasks.map((item) => ({
    transcriptId,
    task: item.task,
    owner: item.owner || null,
    dueDate: item.dueDate || null,
  }));

  const savedTasks = await Task.insertMany(formattedTasks);

  return savedTasks;
};

/* GET ALL TASKS */
export const getAllTasks = async (status) => {
  let filter = {};
  if (status && ["open", "done"].includes(status)) {
    filter.status = status;
  }
  return await Task.find(filter).sort({ createdAt: -1 });
};

/* UPDATE TASK */
export const updateTaskById = async (id, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid task ID");
  }

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );

  if (!updatedTask) {
    throw new Error("Task not found");
  }

  return updatedTask;
};

/* DELETE TASK */
export const deleteTaskById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid task ID");
  }

  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) {
    throw new Error("Task not found");
  }

  return deletedTask;
};