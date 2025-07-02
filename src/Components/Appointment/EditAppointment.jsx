import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { mockData } from "../../data/seedUsers";
import { useApp } from "../../context/AppContext";

export default function EditAppointment() {
  const { appointmentId } = useParams();
  const incident = mockData.incidents.find((i) => i.id === appointmentId);
  const { navigate } = useApp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: incident ? incident.title : "",
      description: incident ? incident.description : "",
      appointmentDate: incident
        ? new Date(incident.appointmentDate).toISOString().slice(0, 16)
        : "",
      status: incident ? incident.status : "Scheduled",
    },
  });

  const [formStatus, setFormStatus] = useState("");

  const onSubmit = (data) => {
    const updatedIncidents = mockData.incidents.map((inc) =>
      inc.id === appointmentId ? { ...inc, ...data } : inc
    );
    mockData.incidents = updatedIncidents;

    setFormStatus("Appointment details updated successfully!");
  };

  if (!incident) return <p>Appointment not found</p>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
    <h1 className="text-xl font-bold text-blue-800 mb-6 border-b pb-3 flex items-center gap-2">
      <span
        className="text-blue-600 cursor-pointer hover:underline"
        onClick={() => navigate("/admin/appointments", { replace: true })}
      >
        ← Back
      </span>
      Edit Appointment
    </h1>
  
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-gray-700">
      <p className="font-semibold text-blue-800 mb-2">Current Appointment Details:</p>
      <p><strong>Title:</strong> {incident.title}</p>
      <p><strong>Description:</strong> {incident.description}</p>
      <p><strong>Date/Time:</strong> {new Date(incident.appointmentDate).toLocaleString()}</p>
      <p>
        <strong>Status:</strong>{" "}
        <span className={`font-semibold ${
          incident.status === "Completed" ? "text-green-600" :
          incident.status === "Scheduled" ? "text-yellow-600" :
          "text-red-600"
        }`}>
          {incident.status}
        </span>
      </p>
    </div>
  
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
        )}
      </div>
  
      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          rows="4"
          {...register("description", { required: "Description is required" })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>
  
      {/* Date & Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date & Time</label>
        <input
          id="appointmentDate"
          type="datetime-local"
          {...register("appointmentDate", { required: "Appointment date is required" })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
        {errors.appointmentDate && (
          <p className="text-red-500 text-xs mt-1">{errors.appointmentDate.message}</p>
        )}
      </div>
  
      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          id="status"
          {...register("status", { required: "Status is required" })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
        )}
      </div>
  
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
        >
          💾 Save Changes
        </button>
        {formStatus && (
          <p className="text-green-600 text-sm">{formStatus}</p>
        )}
      </div>
    </form>
  </div>
  );
}  