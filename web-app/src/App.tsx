import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginScreen from "./features/auth/view/Login";
import Dashboard from "./features/dashboard/view/DashBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
