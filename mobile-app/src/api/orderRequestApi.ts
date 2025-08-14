import axios from "axios";

export const fetchListOrderRequestByEmail = async (
  userId: string,
  status: string
) => {
  try {
    // const user = await fetchUserById(Number(userId));

    const res = await axios.get(
      `http://localhost:8085/private/ordering/orders/requests/approver`,
      {
        params: { email: "admin@shopizer.com", status: status },
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjJAZ21haWwuY29tIiwiYXVkIjoiYXBpIiwicGVybWlzc2lvbiI6W3siYXV0aG9yaXR5IjoiUk9MRV9BVVRIIn0seyJhdXRob3JpdHkiOiJBVVRIIn0seyJhdXRob3JpdHkiOiJBRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUFJPRFVDVFMifSx7ImF1dGhvcml0eSI6Ik9SREVSIn0seyJhdXRob3JpdHkiOiJDT05URU5UIn0seyJhdXRob3JpdHkiOiJTVE9SRSJ9LHsiYXV0aG9yaXR5IjoiVEFYIn0seyJhdXRob3JpdHkiOiJQQVlNRU5UIn0seyJhdXRob3JpdHkiOiJDVVNUT01FUiJ9LHsiYXV0aG9yaXR5IjoiU0hJUFBJTkcifV0sImV4cCI6MTc1NTI0MjQyOSwiaWF0IjoxNzU0NjM3NjI5fQ.lYtgqygZQMIaSfS21mPamSS7JUP7uuxujmhjXwCv8DLTa8PsLxXcNRCH7Xda8ID2oPb7dxhFPToN0dZOoQ4uog`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("unknown error");
  }
};

// export const fetchListOrderRequestPendingByEmail = async (userId: string) => {
//   try {
//     const user = await fetchUserById(Number(userId));

//     const res = await axios.get(`${BASE_URL}/private/orders/requests/pending`, {
//       params: { approverEmail: user.emailAddress },
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(res.data);

//     return res.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(error.response?.data?.message || error.message);
//     }
//     throw new Error("unknown error");
//   }
// };

export const updateOrderRequestStatusApprovers = async (
  requestId: number,
  userId: string,
  notes?: string
) => {
  try {
    const user = await fetchUserById(Number(userId));

    const res = await axios.patch(
      `${BASE_URL}/private/ordering/orders/requests/${requestId}/accept`,
      notes ? { notes } : {},
      {
        params: { approverEmail: user.emailAddress },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
    throw new Error("unknown error");
  }
};

export const rejectOrderRequest = async (
  requestId: number,
  userId: string,
  notes?: string
) => {
  try {
    const user = await fetchUserById(Number(userId));
    const data = notes ? JSON.stringify(notes) : "";

    const res = await axios.patch(
      `${BASE_URL}/private/ordering/orders/requests/${requestId}/reject`,
      data,
      {
        params: { approverEmail: user.emailAddress },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
    throw new Error("unknown error");
  }
};
