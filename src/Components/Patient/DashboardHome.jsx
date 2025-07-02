// src/components/DashboardHome.jsx
import React from "react";
import { mockData } from "../../data/seedUsers";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function DashboardHome() {

  const navigate = useNavigate();
  const {user} = useApp();
  if(!user){
    navigate("/");
  }
  const patient = mockData.patients.find(p=> user.patientId===p.id);
  const patientIncidents = mockData.incidents.filter(
    (i) => i.patientId === patient.id
  );

  
  const now = new Date();
  const upcoming = patientIncidents.filter(
    (i) => new Date(i.appointmentDate) >= now
  );
  const past = patientIncidents.filter(
    (i) => new Date(i.appointmentDate) < now
  );

  return (
    <div>
    <h2 className="text-xl font-semibold text-gray-800 mb-6">Welcome, {patient.name}</h2>
  
    <div className="grid md:grid-cols-2 gap-6">
      {/* Upcoming */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm">
        <h3 className="text-md font-bold text-blue-700 mb-2">Upcoming Appointments</h3>
        {upcoming.length === 0 ? (
          <p className="text-sm text-gray-600">No upcoming appointments</p>
        ) : (
          <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
            {upcoming.map((app) => (
              <li key={app.id}>
                {app.title} – {new Date(app.appointmentDate).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
  
      {/* History */}
      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm">
        <h3 className="text-md font-bold text-gray-700 mb-2">Medical History</h3>
        {past.length === 0 ? (
          <p className="text-sm text-gray-600">No past treatments</p>
        ) : (
          <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
            {past.map((incident) => (
              <li key={incident.id}>
                {incident.title} – {new Date(incident.appointmentDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
  )
};  