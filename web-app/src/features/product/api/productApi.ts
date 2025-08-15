import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchListProductWithParams = async (
  page: number,
  count: number
) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/public/v2/products?page=${page}&count=${count}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data.products;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};

export const fetchListProduct = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/public/v2/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.products;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};
