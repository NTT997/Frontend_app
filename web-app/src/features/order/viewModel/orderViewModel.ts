import { useState } from "react";
//api
import { fetchListOrder } from "../api/orderApi";
//redux
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

const useOrderViewModel = () => {
  const [orders, setOrders] = useState([]);

  //redux
  const email = useSelector((state: RootState) => state.user.email);

  const getListOrder = async () => {
    if (email == null) return;

    const data = await fetchListOrder(email);
    if (data) {
      setOrders(data);
    }
  };

  return {
    orders,
    getListOrder,
  };
};

export default useOrderViewModel;
