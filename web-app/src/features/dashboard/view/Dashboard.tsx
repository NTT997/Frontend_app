import type React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

import Header from "../../../components/Header";
import PieChart from "../components/PieChart";
import useDashBoardVM from "../viewModel/dashboardViewModel";
import { useEffect } from "react";

const Dashboard: React.FC = () => {
  const { getListOrderOfAdmin, pieData } = useDashBoardVM();

  useEffect(() => {
    getListOrderOfAdmin();
  }, []);

  return (
    <Box m="20px">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboar !" />
      <Box
        display={"flex"}
        flexDirection={"row"}
        sx={{ height: "70vh", width: "70wh" }}
      >
        <PieChart pieData={pieData} />
        {/* <LineChart /> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
