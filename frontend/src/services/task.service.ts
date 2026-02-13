import api from "./api";

export const fetchTasks = async (status?: string) => {
  const response = await api.get("/api/tasks", {
    params: status ? { status } : {},
  });
  return response.data;
};

export const updateTask = async (id: string, updateData: any) => {
  const response = await api.patch(`/api/tasks/${id}`, updateData);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/api/tasks/${id}`);
  return response.data;
};