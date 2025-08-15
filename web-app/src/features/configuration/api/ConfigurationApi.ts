import axios from "axios";
import type { SystemConfiguration } from "@ui/shared-models";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchListSystemConfiguration = async () => {
  try {
    const token = localStorage.getItem("token");

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
    const token = localStorage.getItem("token");

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
    const token = localStorage.getItem("token");

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
    const token = localStorage.getItem("token");

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
    const token = localStorage.getItem("token");

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

export const fetchListSchedulerConfiguration = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${BASE_URL}/public/schedules/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};
export const updateEnabledStatusOnlyAPI = async (
  jobname: string,
  isEnabled: boolean
) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      `${BASE_URL}/public/schedules/${jobname}/toggle?enabled=${isEnabled}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};

export const updateSchedulerAPI = async (
  jobname: string,
  cronExpression: string,
  isEnabled: boolean
) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${BASE_URL}/public/schedules/update/${jobname}?cronExpression=${cronExpression}?&enabled=${isEnabled}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};
