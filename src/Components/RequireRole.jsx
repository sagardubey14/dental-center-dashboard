import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function RequireRole({ role }) {
  const { user } = useApp();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) {
    return user.role === "Admin"
      ? <Navigate to="/admin/dashboard" replace />
      : user.role === "Patient"
      ? <Navigate to="/patient/dashboard" replace />
      : <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
