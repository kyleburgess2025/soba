import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// Routes
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Onboard from "./pages/onboard";

/**
 * Router for dashboard.
 *
 * @returns {Object} - Switch router for all url paths.
 * */
const Router = () => (
  <Routes>
    {/* <PrivateRoute exact path="/" component={Dashboard}>
      <Navigate to="/dashboard" />
    </PrivateRoute> */}
    <Route exact path="/" element={<Dashboard />} />
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/register" element={<Register />} />
    <Route exact path="/onboard" element={<Onboard />} />
  </Routes>
);

export default Router;
