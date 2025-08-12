import { useState } from "react";
import {
  fetchListOrderRequestByEmail,
  updateOrderRequestStatusApprovers,
} from "../api/orderRequestApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

const useOrderRequestViewModel = () => {
  const [orderRequests, setOrderRequests] = useState([]);
  const [approverList, setApproverList] = useState([]);

  //redux
  const userId = useSelector((state: RootState) => state.user.userId);

  //error
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);

  const getListOrderRequestByEmail = async () => {
    if (userId !== null) {
      const data = await fetchListOrderRequestByEmail(userId);
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
        console.log(result.message);
        confirm(result);
      }
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
