import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// Routes
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Onboard from "./pages/onboard";
import Admin from "./pages/admin";
import Explore from "./pages/explore"

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
    <Route exact path="/onboard" element={<Onboard />} />
    <Route exact path="/admin" element={<Admin />} />
    <Route exact path="/explore" element={<Explore />} />
  </Routes>
);

export default Router;
