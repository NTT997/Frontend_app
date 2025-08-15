const BASE_URL = import.meta.env.VITE_BASE_URL;

import axios from "axios";

export const fetchListCustomer = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(
      `${BASE_URL}/private/admin-customer-service/customers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
    return res.data.customers;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};
