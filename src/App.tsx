import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import AdminPage from "./pages/admin/AdminPage";
import ResetPage from "./pages/login/components/ResetPage";
import UpdatePassword from "./pages/login/components/UpdatePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="reset" element={<ResetPage />} />
        <Route path="update" element={<UpdatePassword />} />
        <Route path="*" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
