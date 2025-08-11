import { useState } from "react";
import { fetchListOrder } from "../api/orderApi";

const useOrderViewModel = () => {
  const [orders, setOrders] = useState([]);

  const getListOrder = async () => {
    const data = await fetchListOrder();
    if (data) {
      setOrders(data);
    }
  };

  return {
    orders,
    setOrders,
    getListOrder,
  };
};

export default useOrderViewModel;
