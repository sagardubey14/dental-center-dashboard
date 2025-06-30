import React from "react";
import { useParams } from "react-router-dom";   
import { mockData } from "../../data/seedUsers";

export default function AddCost() {
  const { appointmentId } = useParams();
  const incident = mockData.incidents.find(i => i.id === appointmentId);

  if (!incident) return <p>Appointment not found</p>;

  return (
    <div className="border p-4">
      <h2 className="font-semibold mb-2">Add Cost / Treatment Details</h2>
      <p><strong>Current Cost:</strong> ${incident.cost}</p>
      <p><strong>Treatment Notes:</strong> {incident.comments}</p>
      <p className="mt-2 text-gray-600">(Add form here to update cost and treatment info)</p>
    </div>
  );
}
