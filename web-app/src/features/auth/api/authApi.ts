import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = async (username: string, password: string) => {
  console.log(`${BASE_URL}/user/login`);

  try {
    // const res = await axios.post(`${BASE_URL}/user/login`, {
    //   password: "password",
    //   username: "admin@shopizer.com",
    // });

    const res = await axios.post("http://localhost:8080/api/v1/private/login", {
      password: password,
      username: username,
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
