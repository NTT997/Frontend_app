import {
  Box,
  useTheme,
  Switch,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { tokens } from "../../../theme/theme";
import useJobScheduleViewModel from "../viewModel/jobSchedulerViewModel";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";

const cronOptionsReadable = [
  { label: "2 AM daily", value: "0+0+2+*+*+" },
  { label: "Every 5 minutes", value: "0+*/5+*+*+*+" },
  { label: "Every 1 minute", value: "0+*/1+*+*+*+" },
  { label: "1 AM daily", value: "0+0+1+*+*+" },
  { label: "Every 6 hours", value: "0+0+*/6+*+*+" },
];

const JobSchedulerConfiguration = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    configurations,
    getListSystemConfiguration,
    updateSchedulerAPI,
    updateEnabledStatusOnly,
  } = useJobScheduleViewModel();

  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    getListSystemConfiguration();
  }, []);

  // Keep rows in sync with ViewModel data
  useEffect(() => {
    setRows(configurations);
  }, [configurations]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "jobName", headerName: "JOB NAME", flex: 1 },
    {
      field: "description",
      headerName: "Periodic",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: cronOptionsReadable.map(opt => ({
        label: opt.label,
        value: opt.label // Store label in UI
      })),
      renderCell: (params) => {
        const match = cronOptionsReadable.find(opt => opt.value === params.value || opt.label === params.value);
        return match ? match.label : params.value;
      }
    },
    {
      field: "statusIcon",
      headerName: "Status",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const isEnabled = params.row.enabled;

        return (
          <AutorenewIcon
            sx={{
              color: isEnabled ? "#001b0bff" : "#ff1744",
              animation: isEnabled ? "spin 1.2s linear infinite" : "none",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />
        );
      },
    },

    {
      field: "enabled",
      headerName: "Enabled",
      width: 120,
      renderCell: (params) => (
        <Switch
          checked={!!params.row.enabled}
          onChange={async (e) => {
            const newStatus = e.target.checked;
            // Update immediately in local state for UI feedback
            setRows(prev =>
              prev.map(row =>
                row.id === params.row.id ? { ...row, enabled: newStatus } : row
              )
            );
            // Update backend
            await updateEnabledStatusOnly(params.row.jobName, newStatus);
            // Refresh data from server to stay in sync
            await getListSystemConfiguration();
          }}
          color="success"
        />
      ),
    },
    { field: "lastUpdated", headerName: "Last updated", flex: 1 },
  ];

  const handleProcessRowUpdate = async (newRow: any, oldRow: any) => {
    try {
      // Convert label back to cron expression
      const cronValue = cronOptionsReadable.find(
        opt => opt.label === newRow.description
      )?.value || newRow.description;

      const updatedRow = {
        ...newRow,
        cronExpression: cronValue,
        lastUpdated: new Date().toISOString(),
      };

      await updateSchedulerAPI(
        updatedRow.jobName,
        updatedRow.cronExpression,
        updatedRow.enabled
      );

      return updatedRow;
    } catch (error) {
      console.error("Update failed", error);
      return oldRow;
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Scheduler Configuration"
        subtitle="Manage the configuration here!"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgba(224, 224, 224, 1)"
          },
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: "bold",
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400]
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[800],
            color: "#fff",
          },
        }}
      >
        <DataGrid
          columns={columns}
          rows={rows}
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={(error) => console.error(error)}
        />
      </Box>
    </Box>
  );
};

export default JobSchedulerConfiguration;
