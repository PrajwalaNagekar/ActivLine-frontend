import api from "./axios";

/* =========================
   CATEGORY APIs
========================= */

/**
 * Get all canned response categories
 * Roles: SUPER_ADMIN, ADMIN, ADMIN_STAFF
 */
export const getCannedCategories = () => {
  return api.get("/api/admin/settings/canned/categories");
};

/**
 * Create category
 * Role: SUPER_ADMIN
 */
export const createCannedCategory = (data) => {
  return api.post("/api/admin/settings/canned/categories", data);
};

/**
 * Update category
 * Role: SUPER_ADMIN
 */
export const updateCannedCategory = (id, data) => {
  return api.put(`/api/admin/settings/canned/categories/${id}`, data);
};

/**
 * Delete category
 * Role: SUPER_ADMIN
 */
export const deleteCannedCategory = (id) => {
  return api.delete(`/api/admin/settings/canned/categories/${id}`);
};


/* =========================
   RESPONSE APIs
========================= */

/**
 * Get responses by category
 * Roles: SUPER_ADMIN, ADMIN, ADMIN_STAFF
 */
export const getResponsesByCategory = (categoryId) => {
  return api.get(`/api/admin/settings/canned/responses/${categoryId}`);
};

/**
 * Create response
 * Role: SUPER_ADMIN
 */
export const createCannedResponse = (data) => {
  return api.post("/api/admin/settings/canned/responses", data);
};

/**
 * Update response
 * Role: SUPER_ADMIN
 */
export const updateCannedResponse = (id, data) => {
  return api.put(`/api/admin/settings/canned/responses/${id}`, data);
};

/**
 * Delete response
 * Role: SUPER_ADMIN
 */
export const deleteCannedResponse = (id) => {
  return api.delete(`/api/admin/settings/canned/responses/${id}`);
};
