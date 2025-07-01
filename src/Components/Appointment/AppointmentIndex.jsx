import React from "react";
import { Link } from "react-router-dom";
import { mockData } from "../../data/seedUsers";

export default function AppointmentIndex() {
  const incidents = mockData.incidents;

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <div className="flex-1 border p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Incident List</h1>
            <Link
              to="/admin/appointments/add"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Add Appointment
            </Link>
          </div>
          <ul className="space-y-2">
            {incidents.map((incident) => (
              <li key={incident.id} className="border p-2 rounded">
                <p>
                  <strong>{incident.title}</strong>{" "}
                  <span className="text-gray-500">({incident.id})</span>
                </p>
                <p className="text-sm text-gray-700">
                  Appointment Date:{" "}
                  <span className="font-semibold">
                    {new Date(incident.appointmentDate).toLocaleString()}
                  </span>
                </p>
                <p className="text-sm text-gray-700">
                  Status:{" "}
                  <span
                    className={`${
                      incident.status === "Completed"
                        ? "text-green-600"
                        : incident.status === "Scheduled"
                        ? "text-yellow-600"
                        : "text-red-600"
                    } font-semibold`}
                  >
                    {incident.status}
                  </span>
                </p>
                <div className="space-x-3 text-sm mt-1">
                  <Link
                    to={`edit/${incident.id}`}
                    className="text-blue-600 underline"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`add-cost/${incident.id}`}
                    className="text-green-600 underline"
                  >
                    Add Cost
                  </Link>
                  <Link
                    to={`uploads/${incident.id}`}
                    className="text-purple-600 underline"
                  >
                    Uploads
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
