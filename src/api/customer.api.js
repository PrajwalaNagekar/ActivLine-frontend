import api from "./axios"; // your axios instance

// ✅ Get paginated customers
export const getCustomers = (page = 1, limit = 10) => {
  return api.get(`/api/customer/customers?page=${page}&limit=${limit}`);
};

// ✅ Get single customer
export const getSingleCustomer = (customerId) => {
  return api.get(`/api/customer/customers/${customerId}`);
};

// ✅ Create customer
export const createCustomer = (formData) => {
  return api.post(`/api/customer/create`, formData);
};
