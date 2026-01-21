import api from "./axios";

// OPEN
export const getOpenTickets = async () => {
  const res = await api.get("/api/staff/stats/open");
  return res.data.data; // { count, rooms }
};

// IN-PROGRESS
export const getInProgressTickets = async () => {
  const res = await api.get("/api/staff/stats/in-progress");
  return res.data.data; // { count, rooms }
};

// RESOLVED
export const getResolvedTickets = async () => {
  const res = await api.get("/api/staff/stats/resolved");
  return res.data.data; // { count, rooms }
};
export const updateTicketStatus = async (roomId, status) => {
  const res = await api.patch("/api/chat/admin/status", {
    roomId,
    status,
  });
  return res.data.data;
};
