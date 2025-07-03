import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";

export default function AddCost() {
  const { appointmentId } = useParams();
  const { incidents, setIncidents, navigate } = useApp();
  const incident = incidents.find((i) => i.id === appointmentId);

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
    const updated = incidents.map((inc) =>
      inc.id === appointmentId
        ? { ...inc, cost: data.cost, comments: data.treatmentNotes }
        : inc
    );
    setIncidents(updated);
    setFormStatus("✅ Cost and treatment details updated successfully!");
  };

  if (!incident) return <p className="text-red-600 font-semibold">Appointment not found</p>;

  return (
    <div
      className="bg-cover bg-no-repeat bg-center flex items-center justify-start rounded-2xl p-4 sm:p-6"
      style={{ backgroundImage: "url('/patientpage.jpg')" }}
    >
      <div className="w-full max-w-lg">
        <div className="mb-6 border-b border-sky-200 pb-3 flex items-center justify-between">
          <h1 className="text-4xs font-bold text-teal-800 mb-6 border-b pb-3 flex items-center gap-2">
            <span
              className="text-teal-700 cursor-pointer hover:underline"
              onClick={() => navigate("/admin/appointments", { replace: true })}
            >
              ← Back
            </span>
            Add Appointment Cost
          </h1>
        </div>

        <div className="text-sm mb-4 bg-white p-3 rounded shadow-sm border border-teal-100">
          <p><strong>Current Cost:</strong> ${incident.cost || 0}</p>
          <p><strong>Notes:</strong> {incident.comments || "No previous notes"}</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-gradient-to-br from-[#BBE3E1] to-[#88B8BC] bg-opacity-90 p-6 rounded-lg shadow-lg"
        >
          <div className="relative">
            <input
              type="number"
              step="0.01"
              placeholder="Enter New Cost"
              className="peer w-full bg-transparent border border-teal-300 rounded-lg px-3 py-2 text-gray-800 placeholder-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              {...register("cost", {
                required: "Cost is required",
                min: { value: 0, message: "Cost must be positive" },
              })}
            />
            {errors.cost && (
              <p className="text-xs text-red-500 mt-1">{errors.cost.message}</p>
            )}
          </div>

          <div className="relative">
            <textarea
              rows="4"
              placeholder="Enter Treatment Notes"
              className="peer w-full bg-transparent border border-teal-300 rounded-lg px-3 py-2 text-gray-800 placeholder-teal-600 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              {...register("treatmentNotes", {
                required: "Treatment notes are required",
              })}
            />
            {errors.treatmentNotes && (
              <p className="text-xs text-red-500 mt-1">{errors.treatmentNotes.message}</p>
            )}
          </div>

          <div className="pt-4 flex justify-between items-center gap-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-3 rounded-lg shadow-md transition duration-300"
            >
              💾 Save
            </button>
            {formStatus && (
              <p className="text-green-700 text-sm">{formStatus}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
