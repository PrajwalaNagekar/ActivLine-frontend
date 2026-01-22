import api from "./axios"; // your existing axios instance

/**
 * 🔹 GET General Settings
 * Admin panel (view)
 */
export const getGeneralSettings = async () => {
  const response = await api.get("/api/admin/settings/general");
  return response.data; // { success, message, data }
};

/**
 * 🔹 UPDATE General Settings
 * Super Admin only
 */
export const updateGeneralSettings = async (payload) => {
  const response = await api.put(
    "/api/admin/settings/general",
    payload
  );
  return response.data;
};
