import api from "./axios";
import { getFcmToken } from "../components/firebase";

export const adminLogin = async ({ email, password }) => {
  let fcmToken = null;

  try {
    // 🔔 Ask permission only if supported
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        fcmToken = await getFcmToken();
      }
    }
  } catch (err) {
    console.warn("FCM token skipped:", err);
    // ❗ Do NOT block login
  }

  const deviceId = `${navigator.platform}_${navigator.userAgent}`;

  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
      fcmToken,     // may be null → backend handles it
      deviceId,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logoutApi = () => {
  return api.post("/api/auth/logout");
};
