import React from "react";
import { useParams } from "react-router-dom";
import { mockData } from "../../data/seedUsers";

export default function EditPatient() {
  const { patientId } = useParams();
  const patient = mockData.patients.find(p => p.id === patientId);

  if (!patient) return <p>Patient not found</p>;

  return (
    <div className="border p-4 mb-4">
      <h2 className="font-semibold mb-2">Edit Patient Info</h2>
      <p>Name: {patient.name}</p>
      <p>DOB: {patient.dob}</p>
      <p>Contact: {patient.contact}</p>
      <p>Health Info: {patient.healthInfo}</p>
    </div>
  );
}
