import React from "react";
import { useParams } from "react-router-dom";
import { mockData } from "../../data/seedUsers";
import { useApp } from "../../context/AppContext";

export default function DeletePatient() {
  const { patientId } = useParams();
  const {navigate} = useApp();
  const handleDelete = () => {
    const patientIndex = mockData.patients.findIndex((p) => p.id === patientId);
    if (patientIndex !== -1) {
      mockData.patients.splice(patientIndex, 1);
    }

    const userIndex = mockData.users.findIndex(
      (user) => user.patientId === patientId
    );
    if (userIndex !== -1) {
      mockData.users.splice(userIndex, 1);
    }

    mockData.incidents = mockData.incidents.filter(
      (inc) => inc.patientId !== patientId
    );

    alert(`Patient ${patientId} deleted`);
    navigate("/admin/patients",  { replace: true });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => navigate("/admin/patients", { replace: true })}
        >
          ← Back
        </span>
        Delete Patient
      </h2>
      <p className="text-gray-700 mb-4">Are you sure you want to delete patient ID: <strong>{patientId}</strong>?</p>
      <button
        onClick={handleDelete}
        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
      >
        Confirm Delete
      </button>
    </div>
  );
}  