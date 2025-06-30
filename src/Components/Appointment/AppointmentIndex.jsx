import React from "react";
import { Link } from "react-router-dom";
import { mockData } from "../../data/seedUsers";

export default function AppointmentIndex() {
  const patients = mockData.patients;
  const incidents = mockData.incidents;

  return (
    <div className="flex gap-4 mb-6">
      {/* Patient List */}
      <div className="flex-1 border p-4">
        <h2 className="font-semibold mb-2">Patient List</h2>
        <ul className="space-y-2">
          {patients.map((patient) => {
            const incident = incidents.find(i => i.patientId === patient.id);
            return (
              <li key={patient.id} className="border p-2 rounded">
                <p><strong>{patient.name}</strong></p>
                {incident ? (
                  <div className="space-x-3 text-sm mt-1">
                    <Link to={`edit/${incident.id}`} className="text-blue-600 underline">Edit</Link>
                    <Link to={`add-cost/${incident.id}`} className="text-green-600 underline">Add Cost</Link>
                    <Link to={`uploads/${incident.id}`} className="text-purple-600 underline">Uploads</Link>
                  </div>
                ) : (
                  <p className="text-gray-500">No incident yet</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Add New Incident */}
      <div className="flex-1 border p-4">
        <h2 className="font-semibold mb-2">Add New Incident</h2>
        <p>(Form to add new appointment/incidents — optional enhancement)</p>
      </div>
    </div>
  );
}
