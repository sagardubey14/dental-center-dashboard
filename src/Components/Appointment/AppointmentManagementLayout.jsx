import React from "react";
import { Outlet } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function AppointmentManagementLayout() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-cyan-100 p-6 md:p-10 animate-fade-in">
  <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-6 md:p-10 transition-all duration-500 hover:shadow-blue-200">
    <h1 className="text-3xl font-semibold text-blue-900 mb-6 border-b border-blue-200 pb-4 flex items-center gap-3">
      <span
        className="text-cyan-600 hover:underline hover:text-cyan-800 cursor-pointer transition-colors duration-300"
        onClick={() => navigate("/admin/dashboard", { replace: true })}
      >
        ← Back
      </span>
      <span className="relative group">
        Appointment Management
        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-cyan-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
      </span>
    </h1>
    <div className="animate-fade-slide-up">
      <Outlet />
    </div>
  </div>
</div>

  );
}  