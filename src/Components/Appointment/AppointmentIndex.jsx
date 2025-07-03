import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function AppointmentIndex() {
  const {incidents}= useApp()
  return (
    <div className="max-h-screen overflow-auto rounded-2xl shadow-lg p-2"
          style={{ backgroundImage: "url('/bglist.jpg')" }}
    >
      <div className="flex flex-row sm:flex-row  items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <h2 className="md:text-2xl text-4xs font-bold text-blue-800">Appointments</h2>
        <Link
          to="/admin/appointments/add"
          className="bg-blue-600 md:ml-5 md:text-2xl text-4xs text-white p-2 md:px-4 md:py-2 rounded shadow hover:bg-blue-700 whitespace-nowrap"
        >
          ➕ Add Appointment
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="bg-blue-50 border border-blue-100 rounded-xl p-5 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-blue-900 mb-1">
              {incident.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">ID: {incident.id}</p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Appointment:</strong>{" "}
              {new Date(incident.appointmentDate).toLocaleString()}
            </p>
            <p className="text-sm mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  incident.status === "Completed"
                    ? "text-green-600"
                    : incident.status === "Scheduled"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {incident.status}
              </span>
            </p>
            <div className="flex flex-wrap justify-between mt-3 text-sm text-blue-700 gap-2">
              <Link
                to={`edit/${incident.id}`}
                className="hover:underline whitespace-nowrap"
              >
                ✏️ Edit
              </Link>
              <Link
                to={`add-cost/${incident.id}`}
                className="hover:underline text-green-700 whitespace-nowrap"
              >
                💰 Add Cost
              </Link>
              <Link
                to={`uploads/${incident.id}`}
                className="hover:underline text-purple-700 whitespace-nowrap"
              >
                📎 Uploads
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
