import api from "./axios";

/**
 * 🔹 Get ALL activity logs
 * Roles: ADMIN | SUPER_ADMIN | ADMIN_STAFF
 */
export const getAllLogs = (params = {}) => {
  // params can include: role, module, action, limit
  return api.get("/api/logs/activity", { params });
};

/**
 * 🔹 Get logs of a SINGLE USER by userId
 * Roles: ADMIN | SUPER_ADMIN
 */
export const getLogsByUserId = (userId, params = {}) => {
  return api.get(`/api/logs/activity/user/${userId}`, { params });
};

/**
 * 🔹 Get MY logs (Staff / Customer / Any user)
 */
export const getMyLogs = (params = {}) => {
  return api.get("/api/logs/activity/me", { params });
};
