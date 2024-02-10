import api from "../utils/api";

export const getDashboardData = async () =>
  (await api.get("/ownerdashboard")).data;
