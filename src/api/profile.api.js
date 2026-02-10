import api from "../api/axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    const res = await api.get("/api/auth/profile");
    setUser(res.data.data);
    return res.data.data;
  };

  const updateProfile = async (payload) => {
    const res = await api.put("/api/auth/edit", payload);
    setUser(res.data.data); // IMPORTANT
    return res.data.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        fetchProfile,
        updateProfile, // 🔥 THIS WAS MISSING
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
