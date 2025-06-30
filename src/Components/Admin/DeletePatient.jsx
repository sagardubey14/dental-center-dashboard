import React from "react";
import { useParams } from "react-router-dom";

export default function DeletePatient() {
  const { patientId } = useParams();

  const handleDelete = () => {
    alert(`Patient ${patientId} deleted (mock action)`);
  };

  return (
    <div className="border p-4">
      <h2 className="font-semibold mb-2">Delete Patient</h2>
      <p>Are you sure you want to delete patient ID: {patientId}?</p>
      <button
        onClick={handleDelete}
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
      >
        Confirm Delete
      </button>
    </div>
  );
}
