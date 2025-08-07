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

import Sidebar from "./global/Sidebar";
import Topbar from "./global/Topbar";

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
          <Route path="/order" element={<Order />} />
          <Route path="/customer" element={<Customer />} />
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
