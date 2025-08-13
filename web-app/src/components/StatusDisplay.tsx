import {
  TextField,
  Box,
  IconButton,
  useTheme,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { tokens } from "../theme/theme";

const statusIcons = {
  REJECTED: <CancelIcon />,
  PROCESSED: <CheckCircleIcon />,
  ACCEPTED: <CheckCircleIcon />,
  PENDING: <HourglassEmptyIcon />,
  PROCESSING: <AutorenewIcon />,
  CLOSED: <CancelIcon />,
  APPROVED: <CheckCircleIcon />,
};

const StatusDisplay = ({ status }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const statusColorMap = {
    REJECTED: colors.status.reject,
    PROCESSED: colors.status.processed,
    PENDING: colors.status.pending,
    PROCESSING: colors.status.processing,
    ACCEPTED: colors.status.accepted,
    APPROVED: colors.status.approved,
  };
  const color = statusColorMap[status] || colors.grey[500];

  return (
    <Box
      display="flex"
      alignItems="center"
      borderRadius={8}
      sx={{ width: "fit-content" }}
      paddingRight={1}
      marginTop={0.7}
      bgcolor={statusColorMap[status] || color.grey}
    >
      <IconButton>{statusIcons[status]}</IconButton>
      <Typography>{status}</Typography>
    </Box>
  );
};

export default StatusDisplay;
