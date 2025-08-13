import axios from "axios";
import { fetchUserById } from "../../../services/UserService";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

export const fetchListOrderRequestByEmail = async (
  userId: string,
  status: string
) => {
  try {
    const user = await fetchUserById(Number(userId));

    const res = await axios.get(
      `${BASE_URL}/private/ordering/orders/requests/approver`,
      {
        params: { email: user.emailAddress, status: status },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};

// export const fetchListOrderRequestPendingByEmail = async (userId: string) => {
//   try {
//     const user = await fetchUserById(Number(userId));

//     const res = await axios.get(`${BASE_URL}/private/orders/requests/pending`, {
//       params: { approverEmail: user.emailAddress },
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(res.data);

//     return res.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(error.response?.data?.message || error.message);
//     }
//     throw new Error("unknown error");
//   }
// };

export const updateOrderRequestStatusApprovers = async (
  requestId: number,
  userId: string,
  notes?: string
) => {
  try {
    const user = await fetchUserById(Number(userId));

    const res = await axios.patch(
      `${BASE_URL}/private/ordering/orders/requests/${requestId}/accept`,
      notes ? { notes } : {},
      {
        params: { approverEmail: user.emailAddress },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
    throw new Error("unknown error");
  }
};

export const rejectOrderRequest = async (
  requestId: number,
  userId: string,
  notes?: string
) => {
  try {
    const user = await fetchUserById(Number(userId));
    const data = notes ? JSON.stringify(notes) : "";

    const res = await axios.patch(
      `${BASE_URL}/private/ordering/orders/requests/${requestId}/reject`,
      data,
      {
        params: { approverEmail: user.emailAddress },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
    throw new Error("unknown error");
  }
};
