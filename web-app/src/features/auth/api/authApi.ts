import type { userLogin } from "@ui/shared-models";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const authenticate = async (data: userLogin) => {
  try {
    const res = await axios.post(`${BASE_URL}/user/login`, {
      password: data.password,
      username: data.username,
    });

    if (res.data) {
      return res.data;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};
