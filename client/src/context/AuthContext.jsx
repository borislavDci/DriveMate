import { createContext, useState } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const getProfileData = async () => {
    try {
      const res = await api.get("/user");
      localStorage.setItem("user", JSON.stringify(res.data.data.username));
      setUser(res.data.data.username);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (userData) => {
    try {
      await api.post("/auth/login", userData);
      getProfileData();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
