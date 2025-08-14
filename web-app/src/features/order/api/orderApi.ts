import type { AddToCart, PersistableOrder } from "@ui/shared-models";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

export const fetchListOrderWithParams = async (page: number, count: number) => {
  try {
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

export const fetchListOrder = async (email: string) => {
  try {
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
  console.log(token);

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
