import api from "./axios";

// GET ALL STAFF (ADMIN)
export const getAllAdminStaff = async () => {
  const res = await api.get("api/staff/admin-staff");
  return res.data;
};

// CREATE ADMIN STAFF
export const createAdminStaff = async (payload) => {
  const res = await api.post("api/auth/create-admin-staff", payload);
  return res.data;
};

// UPDATE ADMIN STAFF
export const updateAdminStaff = async (id, payload) => {
  const res = await api.put(`api/staff/admin-staff/${id}`, payload);
  return res.data;
};

// DELETE ADMIN STAFF
export const deleteAdminStaff = async (id) => {
  const res = await api.delete(`api/staff/admin-staff/${id}`);
  return res.data;
};
