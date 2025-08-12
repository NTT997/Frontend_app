import {
  Box,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

//components
import Header from "../../../components/Header";
import ErrorPopup from "../../../components/ErrorPopup";

//view Model
import useOrderRequestViewModel from "../viewModel/OrderRequestViewModel";

import { useEffect } from "react";
import { tokens } from "../../../theme/theme";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

const OrdeRequest = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "code",
      headerName: "CODE",
      flex: 1,
    },
    {
      field: "createdBy",
      headerName: "CREATED BY",
      flex: 1,
    },
    {
      field: "configId",
      headerName: "CONFIG ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CREATED AT",
      flex: 1,
    },
    {
      field: "action",
      headerName: "ACTION",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => {
              setShowDialog(true);
              const listWithOrderId = params.row.listOrderRequestApproval.map(
                (approver: any) => ({
                  ...approver,
                  orderRequestId: params.row.id, // lấy ID từ bảng cha
                })
              );
              setApproverList(listWithOrderId);
              //setApproverList(params.row.listOrderRequestApproval);
            }}
            sx={{ color: colors.blueAccent[500] }}
          >
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton
            onClick={() => acceptOrderRequestStatus(params.row.id, "")}
            sx={{ color: colors.greenAccent[500] }}
          >
            <CheckCircleOutlineIcon />
          </IconButton>
          <IconButton sx={{ color: colors.redAccent[500] }}>
            <DoDisturbIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const subApproverColumns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "approvedBy", headerName: "APPROVED BY", flex: 1 },
    { field: "approvedTime", headerName: "APPROVED TIME", flex: 1 },
    { field: "orders", headerName: "ORDER" },
    { field: "status", headerName: "STATUS" },
    { field: "approvedNotes", headerName: "APPROVED NOTES", flex: 1 },
    {
      field: "actions",
      headerName: "ACTIONS",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => {
              acceptOrderRequestStatus(
                params.row.orderRequestId,
                params.row.approvedNotes
              );
            }}
            sx={{ color: colors.greenAccent[500] }}
          >
            <CheckCircleOutlineIcon />
          </IconButton>
          <IconButton sx={{ color: colors.redAccent[500] }}>
            <DoDisturbIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const {
    orderRequests,
    getListOrderRequestByEmail,
    showDialog,
    setShowDialog,
    approverList,
    setApproverList,
    acceptOrderRequestStatus,
    error,
    setOpenError,
    openError,
  } = useOrderRequestViewModel();

  useEffect(() => {
    getListOrderRequestByEmail();
  }, []);

  return (
    <Box m="20px">
      <Header title="ORDER REQUEST" subtitle="Manage the Order Request here!" />
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
        <DataGrid columns={columns} rows={orderRequests} />
      </Box>

      {error && (
        <ErrorPopup
          onClose={() => setOpenError(false)}
          errorMessage={error}
          open={openError}
        />
      )}

      {/* Show dialog when click View Details */}
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Approver List</DialogTitle>
        <DialogContent sx={{ width: "100%" }}>
          {" "}
          {approverList.length === 0 ? (
            <Typography>No approvers found.</Typography>
          ) : (
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid columns={subApproverColumns} rows={approverList} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrdeRequest;
