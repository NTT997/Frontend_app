const BASE_URL = import.meta.env.VITE_BASE_URL;

import axios from "axios";

export const fetchListCustomer = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(
      `${BASE_URL}/private/admin-customer-service/customers`,
      {
        headers: {
          // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBzaG9waXplci5jb20iLCJhdWQiOiJhcGkiLCJwZXJtaXNzaW9uIjpbeyJhdXRob3JpdHkiOiJST0xFX0FVVEgifSx7ImF1dGhvcml0eSI6IkFVVEgifSx7ImF1dGhvcml0eSI6IlNVUEVSQURNSU4ifSx7ImF1dGhvcml0eSI6IkFETUlOIn0seyJhdXRob3JpdHkiOiJQUk9EVUNUUyJ9LHsiYXV0aG9yaXR5IjoiT1JERVIifSx7ImF1dGhvcml0eSI6IkNPTlRFTlQifSx7ImF1dGhvcml0eSI6IlNUT1JFIn0seyJhdXRob3JpdHkiOiJUQVgifSx7ImF1dGhvcml0eSI6IlBBWU1FTlQifSx7ImF1dGhvcml0eSI6IkNVU1RPTUVSIn0seyJhdXRob3JpdHkiOiJTSElQUElORyJ9XSwiZXhwIjoxNzU1MTU1MTM0LCJpYXQiOjE3NTQ1NTAzMzR9.VuTiI7PegIGBkmKd2Wdw_OP085mfF4KJEBmpG7WGhsRn7k8xiC6bbWcykx2uUcN87PuJp02aY9UVMpGaIX_UxA`,
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
