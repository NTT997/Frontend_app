import { useEffect } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
//components
import Header from "../../../components/Header";
import StatusDisplay from "../../../components/StatusDisplay";
import OrderDetailDrawer from "../components/OrderDetailDrawer";

import { tokens } from "../../../theme/theme";
//icon
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ReportIcon from "@mui/icons-material/Report";
// ViewModel
import useOrderRejectViewModel from "../viewModel/orderRejectedViewModel";

const RejectedOrders: React.FC = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ORDER ID", flex: 1 },
    { field: "datePurchased", headerName: "DATE", flex: 1 },
    {
      field: "total",
      headerName: "TOTAL",
      flex: 1,
      renderCell: (params) => <span>{params.row.total ?? 0}</span>,
    },
    {
      field: "customer",
      headerName: "CUSTOMER",
      flex: 1,
      renderCell: (params) => <span>{params.row.customer}</span>,
    },
    {
      field: "orderStatus",
      headerName: "STATUS",
      flex: 1,
      renderCell: (params) => <StatusDisplay status={params.value} />,
    },
    {
      field: "createdBy",
      headerName: "CREATED BY",
      flex: 1,
      renderCell: (params) => <span>{params.row.createdBy}</span>,
    },
    {
      field: "action",
      headerName: "ACTION",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleViewOrderDetail(params.row.id)}>
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton onClick={() => handleViewOrderRequest(params.row.id)}>
            <ReportIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    //rejected list order
    getListRejectedOrders,
    rejectedOrders,
    //order
    selectedOrder,
    //loading
    loading,
    setLoading,
    //selected order
    getOrderById,
    orderRequest,
    setOrderRequest,
    approvals,
    setApprovals,
    showDialogOrderRequest,
    setShowDialogOrdeRequest,
    //open another screen
    showOrderDrawer,
    setShowOrderDrawer,
    handleViewOrderDetail,
    handleViewOrderRequest,
  } = useOrderRejectViewModel();

  useEffect(() => {
    getListRejectedOrders();
  }, []);

  return (
    <Box m="20px">
      <Header
        title="REJECTED ORDERS"
        subtitle="Orders that have been rejected"
      />

      {rejectedOrders && rejectedOrders.length > 0 ? (
        <DataGrid
          rows={rejectedOrders}
          columns={columns}
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
              backgroundColor: `${colors.blueAccent[700]} !important`,
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          color={colors.grey[100]}
        >
          No rejected orders found
        </Box>
      )}

      {/* Dialog hiển thị chi tiết order */}
      <OrderDetailDrawer
        open={showOrderDrawer}
        onClose={() => setShowOrderDrawer(false)}
        order={selectedOrder}
      />

      {/* Modal hiển thị danh sách approver & lý do reject */}
      {/* <OrderRequestModal
        open={showDialogOrderRequest}
        onClose={() => setShowDialogOrderRequest(false)}
        orderRequest={orderRequest}
        approvals={approvals}
      /> */}
    </Box>
  );
};

export default RejectedOrders;
