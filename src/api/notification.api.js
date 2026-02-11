import api from "./axios";

/* EXISTING – KEEP AS IS */
export const getNotificationsApi = async () => {
  const res = await api.get("/api/notifications");
  return res.data.data;
};

export const markNotificationReadApi = async (id) => {
  return api.patch(`/api/notifications/${id}/read`);
};

/* ========================= */
/* 🔥 NEW APIs – ADD ONLY 🔥 */
/* ========================= */

// Delete single notification
export const deleteNotificationApi = async (id) => {
  return api.delete(`/api/notifications/${id}`);
};

// Delete all notifications (role-based)
export const deleteAllNotificationsApi = async () => {
  return api.delete("/api/notifications");
};

// Mark ALL notifications as read (frontend helper)
export const markAllNotificationsReadApi = async (notifications) => {
  const unread = notifications.filter((n) => !n.isRead);

  return Promise.all(
    unread.map((n) =>
      api.patch(`/api/notifications/${n._id}/read`)
    )
  );
};
export const getUnreadCountApi = async () => {
  const res = await api.get("/api/notifications/unread-count");
  return res.data.data.unreadCount;
};
