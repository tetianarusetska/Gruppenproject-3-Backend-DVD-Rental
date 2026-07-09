import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage"
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import DashboardPage from "./pages/dashboard/DashboardPage";

export default function AppRouter() {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardPage />} />

    </Routes>
  );
}