import type React from "react";
import { Box } from "@mui/material";

import Header from "../../../components/Header";

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Header title="DASHBOARD" subtitle="Welcome to your dashboar !" />
    </Box>
  );
};

export default Dashboard;
