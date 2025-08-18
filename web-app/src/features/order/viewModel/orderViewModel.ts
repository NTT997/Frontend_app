import { useState } from "react";
//api
import { fetchListOrder } from "../api/orderApi";
//redux
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

const useOrderViewModel = () => {
  //filter
  const [statusFilter, setStatusFilter] = useState("PROCESSING");
  const [orders, setOrders] = useState([]);

  //redux
  const email = useSelector((state: RootState) => state.user.email);

  const getListOrder = async (status: string) => {
    if (email == null) return;

    const data = await fetchListOrder(email, status);
    if (data) {
      setOrders(data);
    }
  };

  return {
    orders,
    getListOrder,
    statusFilter,
    setStatusFilter,
  };
};

export default useOrderViewModel;
