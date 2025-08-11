import React, { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import Header from "../../../components/Header";
import useCreateConfigViewModel from "../viewModel/createConfigViewModel";
import { useParams } from "react-router-dom";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { tokens } from "../../../theme/theme";

const CreateConfiguration: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    configKey,
    setConfigKey,
    configName,
    setConfigName,
    minValue,
    maxValue,
    setMinValue,
    setMaxValue,
    emails,
    // setEmails,
    handleSelectEmail,
    getListEmailUser,
    approvers,
    // setApprovers,
    handleSubmitConfiguration,
    handleRemoveApprover,

    searchEmail,
    setSearchEmail,
    filteredEmails,
    setFilteredEmails,
    showSuggestions,
    setShowSuggestions,
    debounceTimeout,
    //update config
    selectedConfig,
    getSystemConfigurationById,
    // id,
    // setId,
  } = useCreateConfigViewModel();

  useEffect(() => {
    if (!searchEmail.trim()) {
      setFilteredEmails([]);
      setShowSuggestions(false);
      return;
    }
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      const filtered = emails.filter((email) =>
        email.toLowerCase().includes(searchEmail.toLowerCase())
      );
      setFilteredEmails(filtered);
      setShowSuggestions(true);
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [searchEmail, emails]);

  //get Id from params
  const { idParams } = useParams();

  useEffect(() => {
    getListEmailUser();

    if (idParams) {
      console.log("idParams: " + idParams);
      getSystemConfigurationById(idParams);
    }
  }, []);

  return (
    <Box p={3}>
      <Header
        title="System Configuration"
        subtitle="Create System Configuration"
      />
      <Box mb={2}>
        <TextField
          label="Config Key"
          value={configKey}
          onChange={(e) => setConfigKey(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Config Name / Value"
          value={configName}
          onChange={(e) => setConfigName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box display="flex" gap={2} marginY={2}>
          <TextField
            label="Min Value"
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="Max Value"
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(Number(e.target.value))}
            fullWidth
          />
        </Box>
        <Box position="relative" mb={2}>
          <TextField
            label="Search & Select Approver Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            fullWidth
            autoComplete="off"
            onFocus={() => {
              if (filteredEmails.length > 0) setShowSuggestions(true);
            }}
            onBlur={() => {
              // Delay 200ms để xử lý click chọn trước khi ẩn
              setTimeout(() => setShowSuggestions(false), 200);
            }}
          />
          {showSuggestions && filteredEmails.length > 0 && (
            <Paper
              sx={{
                position: "absolute",
                zIndex: 10,
                width: "100%",
                maxHeight: 200,
                overflowY: "auto",
              }}
            >
              <List dense>
                {filteredEmails.map((email, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemButton onClick={() => handleSelectEmail(email)}>
                      <ListItemText primary={email} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      </Box>
      {/* Approvers List */}
      <Typography variant="h6" gutterBottom>
        Approvers
      </Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Order</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Approver Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {approvers.map((approver, index) => (
              <TableRow key={index}>
                <TableCell>{approver.order}</TableCell>
                <TableCell>{approver.approverEmail}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => handleRemoveApprover(index)}
                  >
                    <DeleteOutlinedIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {approvers.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No approvers added
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={3}>
        <Button
          sx={{ background: colors.greenAccent[400] }}
          variant="contained"
          onClick={handleSubmitConfiguration}
        >
          {selectedConfig ? "UPDATE" : "CREATE"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateConfiguration;
