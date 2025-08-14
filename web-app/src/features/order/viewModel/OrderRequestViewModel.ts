import { useState } from "react";
import {
  fetchListOrderRequestByEmail,
  rejectOrderRequest,
  updateOrderRequestStatusApprovers,
} from "../api/orderRequestApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

//models
const useOrderRequestViewModel = () => {
  const [orderRequests, setOrderRequests] = useState([]);
  const [approverList, setApproverList] = useState([]);

  //filter
  const [statusFilter, setStatusFilter] = useState("PENDING");

  //redux
  const userId = useSelector((state: RootState) => state.user.userId);
  const email = useSelector((state: RootState) => state.user.email);

  //error
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);

  const getListOrderRequestByEmail = async (status: string) => {
    if (userId !== null) {
      const data = await fetchListOrderRequestByEmail(userId, status);
      if (data) setOrderRequests(data);
    }
  };

  const acceptOrderRequestStatus = async (id: number, notes: string) => {
    try {
      if (userId !== null) {
        const result = await updateOrderRequestStatusApprovers(
          id,
          userId,
          notes
        );
        confirm(result.message);
        await getListOrderRequestByEmail("PENDING");
      }
    } catch (err) {
      setError(err.message);
      setOpenError(true);
    }
  };

  const rejectOrderRequestStatus = async (id: number, notes: string) => {
    try {
      if (userId !== null) {
        const result = await rejectOrderRequest(id, userId, notes);
        confirm(result.message);
        await getListOrderRequestByEmail("PENDING");
      }
    } catch (err) {
      setError(err.message);
      setOpenError(true);
    }
  };

  const currentApprover = approverList.find(
    (approver) => approver.approvedBy === email && approver.status === "PENDING"
  );

  const [showDialog, setShowDialog] = useState(false);

  return {
    orderRequests,
    setOrderRequests,
    getListOrderRequestByEmail,
    showDialog,
    setShowDialog,
    approverList,
    setApproverList,
    //execute order request
    acceptOrderRequestStatus,
    rejectOrderRequestStatus,
    error,
    openError,
    setOpenError,
    //email from redux
    email,
    userId,
    currentApprover,
    //filter
    statusFilter,
    setStatusFilter,
  };
};

export default useOrderRequestViewModel;
