import api from "./api";

export const fetchStatus = async () => {
  const response = await api.get("/api/status");

  return response.data;
};