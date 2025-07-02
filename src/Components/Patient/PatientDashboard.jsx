import { Outlet, NavLink } from "react-router-dom";

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-blue-800 mb-8 border-b pb-4">
          🦷 Patient Dashboard
        </h1>

        {/* Navigation Tabs */}
        <nav className="flex gap-6 mb-10 text-base font-semibold">
          <NavLink
            to="/patient/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 border-b-2 border-blue-700 pb-1 transition"
                : "text-gray-500 hover:text-blue-700 hover:border-b hover:border-blue-300 pb-1 transition"
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="appointments"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 border-b-2 border-blue-700 pb-1 transition"
                : "text-gray-500 hover:text-blue-700 hover:border-b hover:border-blue-300 pb-1 transition"
            }
          >
            Appointments
          </NavLink>
        </nav>

        {/* Content */}
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
