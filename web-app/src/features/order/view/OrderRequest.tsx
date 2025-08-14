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
  FormControl,
  MenuItem,
  InputLabel,
  Select,
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

// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import StatusDisplay from "../../../components/StatusDisplay";

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
      field: "status",
      headerName: "STATUS",
      flex: 1,
      renderCell: (params) => {
        return <StatusDisplay status={params.value} />;
      },
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
        </Box>
      ),
    },
  ];

  const subApproverColumns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "approvedBy", headerName: "APPROVED BY", flex: 1 },
    { field: "approvedTime", headerName: "APPROVED TIME", flex: 1 },
    { field: "orders", headerName: "ORDER" },
    {
      field: "status",
      headerName: "STATUS",
      flex: 1,
      renderCell: (params) => {
        return <StatusDisplay status={params.value} />;
      },
    },
    { field: "approvedNotes", headerName: "APPROVED NOTES", flex: 1 },
    // {
    //   field: "actions",
    //   headerName: "ACTIONS",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Box>
    //       <IconButton
    //         onClick={() => {
    //           acceptOrderRequestStatus(
    //             params.row.orderRequestId,
    //             params.row.approvedNotes
    //           );
    //         }}
    //         sx={{ color: colors.greenAccent[500] }}
    //       >
    //         <CheckCircleOutlineIcon />
    //       </IconButton>
    //       <IconButton sx={{ color: colors.redAccent[500] }}>
    //         <DoDisturbIcon />
    //       </IconButton>
    //     </Box>
    //   ),
    // },
  ];

  const {
    orderRequests,
    getListOrderRequestByEmail,
    showDialog,
    setShowDialog,
    approverList,
    setApproverList,
    // excecute OrderStatus
    acceptOrderRequestStatus,
    rejectOrderRequestStatus,
    //error
    error,
    setOpenError,
    openError,
    //check current user
    currentApprover,
    //filter
    statusFilter,
    setStatusFilter,
  } = useOrderRequestViewModel();

  useEffect(() => {
    console.log(statusFilter);
    getListOrderRequestByEmail(statusFilter);
  }, [statusFilter]);

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
        <FormControl sx={{ minWidth: 150, mb: 2 }}>
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
            size="small"
            sx={{
              backgroundColor: colors.primary[400],
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.blueAccent[700],
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.blueAccent[500],
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.greenAccent[500],
              },
              color: colors.grey[100],
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="ACCEPTED">Approved</MenuItem>
            <MenuItem value="REJECTED">Rejected</MenuItem>
          </Select>
        </FormControl>

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
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box>
              {currentApprover && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() =>
                      acceptOrderRequestStatus(
                        currentApprover.orderRequestId,
                        ""
                      )
                    }
                    sx={{ mr: 1 }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      rejectOrderRequestStatus(
                        currentApprover.orderRequestId,
                        "Please Submit Again!"
                      );
                    }}
                  >
                    Reject
                  </Button>
                </>
              )}
            </Box>

            <Box>
              <Button onClick={() => setShowDialog(false)}>Close</Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrdeRequest;
