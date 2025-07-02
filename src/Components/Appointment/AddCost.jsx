import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { mockData } from "../../data/seedUsers";
import { useApp } from "../../context/AppContext";

export default function AddCost() {
  const { appointmentId } = useParams();
  const incident = mockData.incidents.find((i) => i.id === appointmentId);
  const { navigate } = useApp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cost: incident ? incident.cost : 0,
      treatmentNotes: incident ? incident.comments : "",
    },
  });

  const [formStatus, setFormStatus] = useState("");

  const onSubmit = (data) => {
    const updatedIncidents = mockData.incidents.map((inc) =>
      inc.id === appointmentId
        ? { ...inc, cost: data.cost, comments: data.treatmentNotes }
        : inc
    );
    mockData.incidents = updatedIncidents;

    setFormStatus("Cost and treatment details updated successfully!");
  };

  if (!incident) return <p>Appointment not found</p>;
return(
  <div className="bg-white rounded-xl shadow-lg p-6">
  <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
    <span
      className="text-blue-600 hover:underline cursor-pointer"
      onClick={() => navigate("/admin/appointments", { replace: true })}
    >
      ← Back
    </span>
    Add Cost
  </h2>

  <div className="text-sm mb-4">
    <p><strong>Current Cost:</strong> ${incident.cost}</p>
    <p><strong>Notes:</strong> {incident.comments}</p>
  </div>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
    {/* New Cost */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">New Cost</label>
      <input
        type="number"
        step="0.01"
        {...register("cost", {
          required: "Cost is required",
          min: { value: 0, message: "Cost must be positive" },
        })}
        className="w-full border border-gray-300 rounded-lg px-4 py-2"
      />
      {errors.cost && (
        <p className="text-xs text-red-500 mt-1">{errors.cost.message}</p>
      )}
    </div>

    {/* Notes */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Notes</label>
      <textarea
        rows="4"
        {...register("treatmentNotes", {
          required: "Treatment notes are required",
        })}
        className="w-full border border-gray-300 rounded-lg px-4 py-2"
      />
      {errors.treatmentNotes && (
        <p className="text-xs text-red-500 mt-1">{errors.treatmentNotes.message}</p>
      )}
    </div>

    <div className="flex justify-between items-center">
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
      >
        💾 Save
      </button>
      {formStatus && (
        <p className="text-green-600 text-sm">{formStatus}</p>
      )}
    </div>
  </form>
</div>
);
}