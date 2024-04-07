import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { useNotion } from "./services/notion";
import { Devices } from "./pages/Devices";
import { Loading } from "./components/Loading";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Calm } from "./pages/Calm";

function AppRoutes() {
  const navigate = useNavigate(); // This is now correctly within the context of <Router>
  const { user, loadingUser } = useNotion();

  useEffect(() => {
    if (!loadingUser && !user) {
      navigate("/login");
    }
  }, [user, loadingUser, navigate]);

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="/" element={<Calm />} />
      <Route path="/devices" element={<Devices />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default AppRoutes; // Don't forget to export your component
