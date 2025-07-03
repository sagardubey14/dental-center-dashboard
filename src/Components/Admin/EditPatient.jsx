import React from "react";
import { useParams } from "react-router-dom";
import AddPatient from "./AddPatient";
import { useApp } from "../../context/AppContext";

export default function EditPatient() {
  const { patientId } = useParams();
  const { patients, users}= useApp();
  const patient = patients.find((p) => p.id === patientId);
  const user = users.find((u) => u.patientId === patientId);
  console.log(patient, user);
  const { navigate } = useApp();

  if (!patient) return <p>Patient not found</p>;
  const existingUser = {
    ...patient,
    email: user.email,
  };


  
    return (
      <div className="bg-white rounded-xl shadow-lg p-1 mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2 ml-5">
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/admin/patients", { replace: true })}
          >
            ← Back
          </span>
          Edit Patient Info
        </h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 px-6 text-sm mb-6">
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>DOB:</strong> {patient.dob}</p>
          <p><strong>Contact:</strong> {patient.contact}</p>
          <p><strong>Health Info:</strong> {patient.healthInfo}</p>
        </div>
  
        <AddPatient data={existingUser} />
      </div>
    );
  }
