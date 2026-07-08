import { Routes, Route } from "react-router-dom";
import Home from "./pages/homepage/Home"
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";

export default function AppRouter() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  );
}