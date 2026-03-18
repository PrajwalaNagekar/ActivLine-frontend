import api from "../axios";

const cleanParams = (params = {}) => {
  const out = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      out[key] = value;
    }
  });
  return out;
};

export const getAssignedPaymentHistory = async ({
  page = 1,
  limit = 10,
  status,
  planName,
  date,
  fromDate,
  toDate,
  profileId,
  customerId,
} = {}) => {
  const params = cleanParams({
    page,
    limit,
    status,
    planName,
    date,
    fromDate,
    toDate,
    profileId,
    customerId,
  });

  const response = await api.get(
    "/api/staff/admin-staff/assigned-payment-history",
    { params }
  );

  return response.data;
};

export const getAssignedPaymentHistoryDetails = async (paymentId) => {
  if (!paymentId) {
    throw new Error("paymentId is required to fetch payment details");
  }

  const response = await api.get(
    `/api/staff/admin-staff/assigned-payment-history/${encodeURIComponent(paymentId)}`
  );

  return response.data;
};
