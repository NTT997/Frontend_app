import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchStoreInfo = async () => {
  const res = await axios.get(`${BASE_URL}/public/store/DEFAULT`);
  if (!res) {
    throw new Error("Failed to fetch store info");
  }
  return res.data;
};
