import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

export const fetchListSystemConfiguration = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/private/system/configuration`, {
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

export const fetchSystemConfigurationById = async (id: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/private/system/configuration/${id}`,
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

export const createSystemConfiguration = async (data: SystemConfiguration) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/private/system/configuration`,
      data,
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

export const updateSystemConfiguration = async (data: SystemConfiguration) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/private/system/configuration/${data.id}`,
      data,
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

export const deleteSystemConfiguration = async (id: string) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/private/system/configuration/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Delete failed:", error);
    throw error;
  }
};

interface Approver {
  approverEmail: string;
  order: number;
}

interface SystemConfiguration {
  id: number;
  key: string;
  value: string;
  totalApprovers: number;
  visible: boolean;
  approvers: Approver[];
  min: number;
  max: number;
}
