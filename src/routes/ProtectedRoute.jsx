import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const role = user?.role?.toUpperCase();

  // 🔥 ADMIN & SUPER_ADMIN → FULL ACCESS
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    return children;
  }

  // 🔐 Other roles → check allowedRoles
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.map(r => r.toUpperCase()).includes(role)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;



