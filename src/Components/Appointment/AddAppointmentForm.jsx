import React from "react";
import { useForm } from "react-hook-form";
import { mockData } from "../../data/seedUsers";
import { useApp } from "../../context/AppContext";

export default function AddAppointmentForm() {
  const { navigate } = useApp();

  const patients = mockData.patients;
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const newId = Number(mockData.incidents.at(-1).id.replace(/^\D+/, "")) + 1;
    // alert(JSON.stringify({...data, id:'i'+newId, comments:'', status: "Scheduled", files:[], treatment:'', cost:''}));
    mockData.incidents.push({
      ...data,
      id: "i" + newId,
      comments: "",
      status: "Scheduled",
      files: [],
      treatment: "",
      cost: "",
    });
    reset();
  };
  return (
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-xl shadow p-6">
  <h2 className="text-xl font-bold text-blue-800 border-b pb-3 flex items-center gap-2">
    <span
      className="text-blue-600 hover:underline cursor-pointer"
      onClick={() => navigate("/admin/appointments", { replace: true })}
    >
      ← Back
    </span>
    Add New Appointment
  </h2>

  {/* Patient Select */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Select Patient</label>
    <select
      {...register("patientId", { required: true })}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
    >
      <option value="">-- Choose --</option>
      {patients.map((p) => (
        <option key={p.id} value={p.id}>{p.name}</option>
      ))}
    </select>
  </div>

  {/* Title */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
    <input
      {...register("title", { required: true })}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
      placeholder="e.g., Tooth Extraction"
    />
  </div>

  {/* Description */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
    <input
      {...register("description")}
      className="w-full border border-gray-300 rounded-lg px-4 py-2"
      placeholder="Brief notes (optional)"
    />
  </div>

  {/* Appointment Date */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
    <input
      type="datetime-local"
      {...register("appointmentDate", { required: true })}
      className="w-full border border-gray-300 rounded-lg px-4 py-2"
    />
  </div>

  {/* Submit */}
  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
  >
    ➕ Add Appointment
  </button>
</form>
  );
}