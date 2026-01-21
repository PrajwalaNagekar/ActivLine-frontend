import api from "./axios";

export const getAssignedRoomsCount = async () => {
  const res = await api.get("/api/admin/dashboard/assigned-rooms");
  return res.data.data.assignedRooms;
};
