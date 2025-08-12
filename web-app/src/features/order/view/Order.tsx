import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";

import Header from "../../../components/Header";
import StatusDisplay from "../../../components/StatusDisplay";

import { tokens } from "../../../theme/theme";
import useOrderViewModel from "../viewModel/orderViewModel";
import { useEffect } from "react";

const Order: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { orders, setOrders, getListOrder } = useOrderViewModel();

  useEffect(() => {
    getListOrder();
  }, []);

  return (
    <Box m="20px">
      <Header title="LIST ORDER" subtitle="Managing the Order" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={orders} columns={columns} />
      </Box>
    </Box>
  );
};

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ORDER ID",
    flex: 1,
  },
  {
    field: "totalItem",
    headerName: "PURCHASED",
    renderCell: (params) => (
      <span
        style={{ color: "blue", cursor: "pointer" }}
        onClick={() => console.log("View items of order:", params.row.id)}
      >
        {params.row.products?.length ?? 0}
      </span>
    ),
  },
  {
    field: "datePurchased",
    headerName: "DATE",
    flex: 1,
  },
  {
    field: "total",
    headerName: "TOTAL",
    flex: 1,
    renderCell: (params) => <span>{params.row.total?.value ?? 0}</span>,
  },
  {
    field: "customer",
    headerName: "CUSTOMER",
    flex: 1,
    renderCell: (params) => <span>{params.row.billing?.phone}</span>,
  },
  {
    field: "orderStatus",
    headerName: "STATUS",
    flex: 1,
    renderCell: (params) => {
      console.log(params.value);
      return <StatusDisplay status={params.value} />;
    },
  },
  {
    field: "createdBy",
    headerName: "Created By",
    flex: 1,
  },
];

export default Order;
