// src/components/PatientDashboard.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function PatientDashboard() {
  return (
    <div className="p-4 max-w-4xl mx-auto border border-gray-300">
      <h1 className="text-xl font-semibold mb-4 border-b pb-2">
        Patient Dashboard
      </h1>

      <nav className="flex gap-4 mb-6">
        <NavLink
          to="/patient/dashboard"
          end
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "text-gray-600"
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="appointments"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600"
              : "text-gray-600"
          }
        >
          Appointments
        </NavLink>
      </nav>

      {/* Nested routes will render here */}
      <Outlet />
    </div>
  );
}
