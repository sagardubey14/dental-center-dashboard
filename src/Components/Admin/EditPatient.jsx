import React from "react";
import { useParams } from "react-router-dom";
import { mockData } from "../../data/seedUsers";
import AddPatient from "./AddPatient";
import { useApp } from "../../context/AppContext";

export default function EditPatient() {
  const { patientId } = useParams();
  const patient = mockData.patients.find((p) => p.id === patientId);
  const user = mockData.users.find((u) => u.patientId === patientId);
  console.log(patient, user);
  const { navigate } = useApp();

  if (!patient) return <p>Patient not found</p>;
  const existingUser = {
    ...patient,
    email: user.email,
  };

  return (
    <div className="border p-4 mb-4">
      <h2 className="font-semibold mb-2">
        {" "}
        <p
          className="text-blue-600 cursor-pointer inline"
          onClick={() => navigate("/admin/patients", { replace: true })}
        >
          {"<-  "}
        </p>{" "}
        Edit Patient Info
      </h2>
      <p>Name: {patient.name}</p>
      <p>DOB: {patient.dob}</p>
      <p>Contact: {patient.contact}</p>
      <p>Health Info: {patient.healthInfo}</p>
      <AddPatient data={existingUser} />
    </div>
  );
}
