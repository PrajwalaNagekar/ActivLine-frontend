import api from "./axios";

const cleanParams = (params = {}) => {
  const out = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      out[key] = value;
    }
  });
  return out;
};

export const getGraphSummary = async ({ months = 6 } = {}) => {
  const params = cleanParams({ months });
  const res = await api.get("/api/dashboard/graph-summary", { params });
  return res.data?.data;
};

export const getAssignedCustomersGraphSummary = async ({ months = 6 } = {}) => {
  const params = cleanParams({ months });
  const res = await api.get("/api/dashboard/assigned-customers", { params });
  return res.data?.data;
};

