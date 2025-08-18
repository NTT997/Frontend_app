const BASE_URL = import.meta.env.VITE_BASE_URL;

import axios from "axios";
const token = localStorage.getItem("token");

export const fetchUserLogin = async (userId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/private/user-service/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};

export const fetchUserById = async (userId: number) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/private/user-service/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBzaG9waXplci5jb20iLCJhdWQiOiJhcGkiLCJwZXJtaXNzaW9uIjpbeyJhdXRob3JpdHkiOiJST0xFX0FVVEgifSx7ImF1dGhvcml0eSI6IkFVVEgifSx7ImF1dGhvcml0eSI6IlNVUEVSQURNSU4ifSx7ImF1dGhvcml0eSI6IkFETUlOIn0seyJhdXRob3JpdHkiOiJQUk9EVUNUUyJ9LHsiYXV0aG9yaXR5IjoiT1JERVIifSx7ImF1dGhvcml0eSI6IkNPTlRFTlQifSx7ImF1dGhvcml0eSI6IlNUT1JFIn0seyJhdXRob3JpdHkiOiJUQVgifSx7ImF1dGhvcml0eSI6IlBBWU1FTlQifSx7ImF1dGhvcml0eSI6IkNVU1RPTUVSIn0seyJhdXRob3JpdHkiOiJTSElQUElORyJ9XSwiZXhwIjoxNzU1Nzg5MDY5LCJpYXQiOjE3NTUxODQyNjl9.ymoLSZfSxbAh1JsObUcaHR-XZxPvIJ4HjaU-3smhAnuH-vLekwNpPPaZkdjB1iDq6SN-LdBpkVUi5o2sJHrLdw`,
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};

export const fetchListUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/private/user-service/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};
