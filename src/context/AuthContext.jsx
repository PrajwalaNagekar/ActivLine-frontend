import React, { createContext, useContext, useEffect, useState } from "react";
import { logoutApi } from "../api/auth.api";
const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- LOAD FROM STORAGE ON REFRESH ---------- */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        // 🔥 ROLE NORMALIZATION HERE
        const normalizedUser = {
          ...parsedUser,
          role:
            parsedUser.role === "SUPER_ADMIN"
              ? "ADMIN"
              : parsedUser.role,
        };

        setUser(normalizedUser);
        setToken(storedToken);

        localStorage.setItem("user", JSON.stringify(normalizedUser));
      } catch {
        localStorage.clear();
      }
    }

    setLoading(false);
  }, []);

  /* ---------- LOGIN ---------- */
  const login = (userData, tokenValue) => {
    const normalizedUser = {
      ...userData,
      role:
        userData.role === "SUPER_ADMIN"
          ? "ADMIN"
          : userData.role,
    };

    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(normalizedUser));

    setUser(normalizedUser);
    setToken(tokenValue);
  };

  /* ---------- LOGOUT ---------- */


const logout = async () => {
  try {
    await logoutApi(); // 🔥 BACKEND LOGOUT
  } catch (err) {
    // even if API fails, continue logout
    console.error("Logout API failed", err);
  } finally {
    localStorage.clear();
    setUser(null);
    setToken(null);
  }
};


  return (
    <AuthContext.Provider
      value={{
        user,
        token, // ✅ IMPORTANT (YOU MISSED THIS)
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        isAdmin: () =>
          ["admin", "admin_staff"].includes(
            user?.role?.toLowerCase()
          ),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
