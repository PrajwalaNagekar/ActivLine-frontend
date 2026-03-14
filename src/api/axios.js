import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000",
});

api.interceptors.request.use(
  (config) => {
    const tokenStorageKey = import.meta.env.VITE_TOKEN_STORAGE_KEY || "token";
    const token =
      localStorage.getItem(tokenStorageKey) ||
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
