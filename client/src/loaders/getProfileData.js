import api from "../utils/api";

export const getProfileData = async () => (await api.get("/user")).data.data;
