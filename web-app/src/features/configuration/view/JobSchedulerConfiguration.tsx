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


const JobSchedulerConfiguration = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "jobname",
      headerName: "JOB NAME",
      flex: 1,
    },
    {
      field: "periodic",
      headerName: "PERIODIC",
      flex: 1,
    },
    {
      field: "is_enabled",
      headerName: "IS_ENABLED",
      flex: 1,
    }
  ];



  const {
    configurations,
    // setConfigurations,
    getListSystemConfiguration,
    listApprovers,
    setShowDialog,
    showDialog,
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

export default JobSchedulerConfiguration;
