import React from "react";
import { Outlet } from "react-router-dom";

export default function AppointmentManagementLayout() {
  return (
    <div className="p-4 border border-gray-300 max-w-5xl mx-auto">
      <h1 className="text-xl font-semibold mb-4 border-b pb-2">
        Appointment / Incident Management
      </h1>
      <Outlet />
    </div>
  );
}
