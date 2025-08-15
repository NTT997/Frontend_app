import { useCallback, useState } from "react";
//model
import type { Approver, ReadableOrderV2 } from "@ui/shared-models";
//api
import { fetchListOrderRejected, fetchOrderById } from "../api/orderApi";
//redux
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { fetchOrderRequestByOrderId } from "../api/orderRequestApi";

const useOrderRejectViewModel = () => {
  //orderRejected
  const [rejectedOrders, setRejetedOrders] = useState<ReadableOrderV2[]>([]);

  const getListRejectedOrders = async () => {
    if (email == null) return;
    const data = await fetchListOrderRejected(email);
    if (data) setRejetedOrders(data);
  };

  //selected order
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDrawer, setShowOrderDrawer] = useState(false);
  const [draft, setDraft] = useState("");

  //approval
  const [orderRequest, setOrderRequest] = useState(null);
  const [approvals, setApprovals] = useState([]);
  const [showDialogOrderRequest, setShowDialogOrdeRequest] = useState(false);
  //loading
  const [loading, setLoading] = useState(false);

  const handleViewOrderDetail = useCallback(async (id: number) => {
    setLoading(true);

    const data = await fetchOrderById(id);
    if (data == null) return;

    console.log("order: ", data);

    setSelectedOrder(data);
    setShowOrderDrawer(true);

    setLoading(false);
  }, []);

  const handleViewOrderRequest = useCallback(async (id: number) => {
    setLoading(true);

    const data = await fetchOrderRequestByOrderId(id);
    if (data == null) return;
    setOrderRequest(data);
    setShowDialogOrdeRequest(true);

    setLoading(false);
  }, []);

  //redux
  const email = useSelector((state: RootState) => state.user.email);

  return {
    //rejected list order
    getListRejectedOrders,
    rejectedOrders,
    //loading
    loading,
    setLoading,
    //selected order
    selectedOrder,
    setSelectedOrder,
    showOrderDrawer,
    setShowOrderDrawer,
    draft,
    setDraft,
    //order request
    orderRequest,
    setOrderRequest,
    approvals,
    setApprovals,
    showDialogOrderRequest,
    setShowDialogOrdeRequest,
    //open another screen
    handleViewOrderDetail,
    handleViewOrderRequest,
  };
};
export default useOrderRejectViewModel;
