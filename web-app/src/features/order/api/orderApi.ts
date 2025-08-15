import type {
  AddToCart,
  OrderResubmitPayload,
  PersistableOrder,
} from "@ui/shared-models";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchListOrderWithParams = async (page: number, count: number) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${BASE_URL}/private/ordering/orders?page=${page}&count=${count}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
    return res.data.orders;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};

export const fetchListOrder = async (email: string, status: string) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${BASE_URL}/private/ordering/orders?emailAdmin=${email}&status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data.orders;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};

export const fetchListOrderOfAdmin = async (email: string) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${BASE_URL}/private/ordering/orders?emailAdmin=${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data.orders;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};

export const createOrder = async (
  cartCode: string,
  payload: PersistableOrder
) => {
  const token = localStorage.getItem("token");
  console.log("payload: ", payload);
  try {
    const { data } = await axios.post(
      `${BASE_URL}/private/ordering/cart/${cartCode}/checkout`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Backend error:", err.response?.data);
    }
  }
};

export const addToCart = async (productCart: AddToCart) => {
  try {
    console.log("product Cart to addToCart", productCart);

    const res = await axios.post(
      `${BASE_URL}/public/shoppingcart/cart`,
      productCart
    );
    if (res) {
      return res.data;
    }
    return null;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Backend error:", err.response?.data);
    }
  }
};

export const fetchListOrderRejected = async (email: string) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${BASE_URL}/private/ordering/orders/resubmit?email=${email}`,
      {
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

export const fetchOrderById = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}/private/ordering/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};

export const resubmitOrder = async (
  data: OrderResubmitPayload,
  orderId: number
) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.patch(
      `${BASE_URL}/private/ordering/orders/${orderId}/customer`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Backend error:", err.response?.data);
    }
  }
};
