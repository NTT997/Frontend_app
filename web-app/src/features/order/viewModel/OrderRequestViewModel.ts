import { useState } from "react";
import {
  fetchListOrderRequestByEmail,
  updateOrderRequestStatusApprovers,
} from "../api/orderRequestApi";

const useOrderRequestViewModel = () => {
  const [orderRequests, setOrderRequests] = useState([]);
  const email = "admin1@gmail.com"; //dung redux luu user roi lay email ra sau
  const [approverList, setApproverList] = useState([]);

  const getListOrderRequestByEmail = async () => {
    const data = await fetchListOrderRequestByEmail(email);
    if (data) setOrderRequests(data);
  };

  const acceptOrderRequestStatus = async (id: number, notes: string) => {
    await updateOrderRequestStatusApprovers(id, notes);
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
  };
};

export default useOrderRequestViewModel;
