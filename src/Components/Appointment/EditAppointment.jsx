import React from "react";
import { useParams } from "react-router-dom";
import { mockData } from "../../data/seedUsers";

export default function EditAppointment() {
  const { appointmentId } = useParams();
  const incident = mockData.incidents.find(i => i.id === appointmentId);

  if (!incident) return <p>Appointment not found</p>;

  return (
    <div className="border p-4">
      <h2 className="font-semibold mb-2">Edit Appointment</h2>
      <p><strong>Title:</strong> {incident.title}</p>
      <p><strong>Description:</strong> {incident.description}</p>
      <p><strong>Date/Time:</strong> {new Date(incident.appointmentDate).toLocaleString()}</p>
      <p><strong>Status:</strong> {incident.status}</p>
      <p><strong>Treatment:</strong> {incident.comments}</p>
      <p className="mt-2 text-gray-600">(This would be a form in a real app)</p>
    </div>
  );
}
