import api from "./axios";

// GET /api/staff/notifications
export const getMyStaffNotifications = async () => {
  const res = await api.get("/api/staff/notifications");
  return res.data.data;
};

// PATCH /api/staff/notifications/:id/read
export const markStaffNotificationRead = async (id) => {
  const res = await api.patch(`/api/staff/notifications/${id}/read`);
  return res.data;
};

// DELETE /api/staff/notifications/:id
export const deleteStaffNotification = async (id) => {
  const res = await api.delete(`/api/staff/notifications/${id}`);
  return res.data;
};

// PATCH /api/staff/notifications/read-all
export const markAllStaffNotificationsRead = async () => {
  const res = await api.patch("/api/staff/notifications/read-all");
  return res.data;
};

// DELETE /api/staff/notifications
export const deleteAllStaffNotifications = async () => {
  const res = await api.delete("/api/staff/notifications");
  return res.data;
};
// 🔔 UNREAD COUNT
export const getStaffUnreadCount = async () => {
  const res = await api.get("/api/staff/notifications/unread-count");
  return res.data.data.unreadCount;
};

