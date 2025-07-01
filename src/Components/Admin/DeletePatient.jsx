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
    <div className="border p-4">
      <h2 className="font-semibold mb-2">
        {" "}
        <p className="text-blue-600 cursor-pointer inline" onClick={()=>navigate("/admin/patients",{ replace:true})}>
          {"<-  "}
        </p>
        Delete Patient
      </h2>
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
