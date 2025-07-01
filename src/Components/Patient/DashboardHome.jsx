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
      <h2 className="text-lg font-semibold mb-4">Welcome, {patient.name}</h2>

      <div className="flex gap-4 mb-4">
        <div className="flex-1 border p-4">
          <h3 className="font-semibold mb-2">Upcoming Appointments</h3>
          {upcoming.length === 0 ? (
            <p>No upcoming appointments</p>
          ) : (
            <ul className="list-disc pl-5">
              {upcoming.map((app) => (
                <li key={app.id}>
                  {app.title} -{" "}
                  {new Date(app.appointmentDate).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex-1 border p-4">
          <h3 className="font-semibold mb-2">Medical History</h3>
          {past.length === 0 ? (
            <p>No past treatments</p>
          ) : (
            <ul className="list-disc pl-5">
              {past.map((incident) => (
                <li key={incident.id}>
                  {incident.title} -{" "}
                  {new Date(incident.appointmentDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
