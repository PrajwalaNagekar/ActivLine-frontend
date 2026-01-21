import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || "/api",
});

export const adminLogin = async (arg1, arg2) => {
  // Handle both ({ email, password }) and (email, password) signatures
  const { email, password } = typeof arg1 === 'object' ? arg1 : { email: arg1, password: arg2 };

  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const logoutApi = () => {
  return api.post("/auth/logout");
};