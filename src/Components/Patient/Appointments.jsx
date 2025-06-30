// src/components/Appointments.jsx
import React from "react";
import { Link } from "react-router-dom";
import { mockData } from "../../data/seedUsers";

export default function Appointments() {
  const patientId = "p1"; // hardcoded for demo, get from logged-in user in real app

  const upcomingAppointments = mockData.incidents.filter(
    (incident) =>
      incident.patientId === patientId &&
      new Date(incident.appointmentDate) >= new Date()
  );

  if (upcomingAppointments.length === 0) {
    return <p>No upcoming appointments found.</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
      <ul className="list-disc pl-5">
        {upcomingAppointments.map((appointment) => (
          <li key={appointment.id} className="mb-2">
            <Link
              to={`${appointment.id}`}
              className="text-blue-600 hover:underline"
            >
              {appointment.title} -{" "}
              {new Date(appointment.appointmentDate).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
