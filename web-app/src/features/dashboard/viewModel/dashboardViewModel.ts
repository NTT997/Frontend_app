import { useState } from "react";
import { fetchListOrderOfAdmin } from "../../order/api/orderApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { tokens } from "../../../theme/theme";
import { useTheme } from "@mui/material";

const useDashBoardVM = () => {
  //redux
  const email = useSelector((state: RootState) => state.user.email);

  //theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //list orders
  const [orders, setOrders] = useState([]);
  const getListOrderOfAdmin = async () => {
    if (email) {
      const data = await fetchListOrderOfAdmin(email);
      setOrders(data);
    }
  };

  //pieData
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(statusCounts).map(([status, value]) => {
    let color = "#888888";
    if (status === "PENDING") color = colors.status.pending;
    else if (status === "PROCESSED") color = colors.status.processed;
    else if (status === "PROCESSING") color = colors.status.processing;
    else if (status === "APPROVED") color = colors.status.approved;
    else if (status === "REJECTED") color = colors.status.reject;

    return {
      id: status,
      label: status,
      value,
      color,
    };
  });

  return { getListOrderOfAdmin, pieData };
};

export default useDashBoardVM;
