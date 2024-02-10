import api from "../utils/api";

export const getBookingsData = async () =>
  (await api.get("/dashboard")).data;
