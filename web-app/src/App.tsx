import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { ColorModeContext, useMode } from "./theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import LoginScreen from "./features/auth/view/Login";
import Dashboard from "./features/dashboard/view/Dashboard";
import Customer from "./features/customer/view/Customer";

import Order from "./features/order/view/Order";
import OrderRequests from "./features/order/view/OrderRequest";
import CreateOrder from "./features/order/view/CreateOrder";

import Configuration from "./features/configuration/view/Configuration";
import CreateConfiguration from "./features/configuration/view/CreateConfiguration";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import JobSchedulerConfiguration from "./features/configuration/view/JobSchedulerConfiguration";

function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === "/";

  return (
    <div className="app">
      {!hideLayout && <Sidebar />}
      <main className="content">
        {!hideLayout && <Topbar />}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<LoginScreen />} />
          <Route path="/order">
            <Route index element={<Order />} />
            <Route path="order-requests" element={<OrderRequests />} />{" "}
            <Route path="create-order" element={<CreateOrder />} />{" "}
          </Route>

          <Route path="/customer" element={<Customer />} />
          <Route path="/configuration">
            <Route path="" element={<Configuration />} />
            <Route
              path="create-configuration/:idParams?"
              element={<CreateConfiguration />}
            />
            <Route
              path="scheduler"
              element={<JobSchedulerConfiguration />}
            />
          </Route>
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
