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

import Header from "../../../components/Header";

import { useEffect } from "react";
import { tokens } from "../../../theme/theme";

import useConfigurationViewModel from "../viewModel/configurationViewModel";

import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const Configuration = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "key",
      headerName: "CONFIG KEY",
      flex: 0.6,
    },
    {
      field: "value",
      headerName: "CONFIG NAME",
      flex: 1,
    },
    {
      field: "totalApprovers",
      headerName: "TOTAL APPROVERS",
      flex: 1,
    },
    {
      field: "min",
      headerName: "MIN VALUE",
      flex: 1,
    },
    {
      field: "max",
      headerName: "MAX VALUE",
      flex: 1,
    },
    {
      field: "approvers details",
      headerName: "APPROVERS",
      flex: 1,
      renderCell: (params) => (
        <Button
          onClick={() => {
            setShowDialog(true);
            setListApprovers(params.row.approvers);
          }}
          sx={{
            background: colors.greenAccent[700],
            borderRadius: "28px",
            paddingX: "12px",
            gap: "4px",
          }}
        >
          <RemoveRedEyeIcon />
          <Typography>Details</Typography>
        </Button>
      ),
    },
    {
      field: "action",
      headerName: "ACTION",
      flex: 1,
      renderCell: (params) => (
        <Box display={"flex"} flexDirection={"row"} pt={0.5}>
          <IconButton
            sx={{ color: colors.blueAccent[400] }}
            onClick={() => {
              handleUpdateConfiguration(params.row.id);
            }}
          >
            {<UpdateOutlinedIcon />}
          </IconButton>
          <IconButton
            sx={{ color: colors.redAccent[500] }}
            onClick={() => handleDeleteSystemConfiguration(params.row.id)}
          >
            {<DeleteOutlinedIcon />}
          </IconButton>
        </Box>
      ),
    },
  ];

  const subApproverColumns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "approverEmail", headerName: "APPROVER EMAIL", flex: 1 },
    { field: "order", headerName: "ORDER", flex: 1 },
  ];

  const {
    handleUpdateConfiguration,
    configurations,
    // setConfigurations,
    getListSystemConfiguration,
    listApprovers,
    setListApprovers,
    setShowDialog,
    showDialog,
    handleDeleteSystemConfiguration,
  } = useConfigurationViewModel();

  useEffect(() => {
    getListSystemConfiguration();
  }, []);

  return (
    <Box m="20px">
      <Header
        title="System Configuration"
        subtitle="Manage the configuration here!"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            // borderBottom: "none",
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: "bold",

            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[800],
            color: "#fff",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid columns={columns} rows={configurations} />
      </Box>

      {/* Show dialog when click View Details */}
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        disableEnforceFocus
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Approver List</DialogTitle>
        <DialogContent>
          {listApprovers.length === 0 ? (
            <Typography>No approvers found.</Typography>
          ) : (
            <DataGrid
              columns={subApproverColumns}
              rows={listApprovers}
              sx={{
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                  color: colors.primary,
                },
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid rgba(224, 224, 224, 1)",
                },
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Configuration;
