import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

export const fetchListOrderRequestByEmail = async (email: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/private/ordering/orders/requests/approver`,
      {
        params: { email },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};

export const updateOrderRequestStatusApprovers = async (
  requestId: number,
  notes?: string
) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/private/ordering/orders/requests/${requestId}/accept`,
      notes ? { notes } : {},
      {
        params: { approverEmail: "admin1@gmail.com" },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};
