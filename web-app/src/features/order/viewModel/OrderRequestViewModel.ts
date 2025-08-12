import { useState } from "react";
import {
  fetchListOrderRequestByEmail,
  updateOrderRequestStatusApprovers,
} from "../api/orderRequestApi";

const useOrderRequestViewModel = () => {
  const [orderRequests, setOrderRequests] = useState([]);
  const email = "admin1@gmail.com"; //dung redux luu user roi lay email ra sau
  const [approverList, setApproverList] = useState([]);

  //error
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);

  const getListOrderRequestByEmail = async () => {
    const data = await fetchListOrderRequestByEmail(email);
    if (data) setOrderRequests(data);
  };

  const acceptOrderRequestStatus = async (id: number, notes: string) => {
    try {
      await updateOrderRequestStatusApprovers(id, notes);
    } catch (err) {
      setError(err.message);
      setOpenError(true);
    }
  };

  const [showDialog, setShowDialog] = useState(false);

  return {
    orderRequests,
    setOrderRequests,
    getListOrderRequestByEmail,
    showDialog,
    setShowDialog,
    approverList,
    setApproverList,
    acceptOrderRequestStatus,
    error,
    openError,
    setOpenError,
  };
};

export default useOrderRequestViewModel;
