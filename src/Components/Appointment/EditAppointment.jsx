import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";

export default function EditAppointment() {
  const { appointmentId } = useParams();
  const { incidents, setIncidents, navigate } = useApp();

  const incident = incidents.find((i) => i.id === appointmentId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: incident?.title || "",
      description: incident?.description || "",
      appointmentDate: incident
        ? new Date(incident.appointmentDate).toISOString().slice(0, 16)
        : "",
      status: incident?.status || "Scheduled",
    },
  });

  const [formStatus, setFormStatus] = useState("");

  const onSubmit = (data) => {
    const updated = incidents.map((inc) =>
      inc.id === appointmentId ? { ...inc, ...data } : inc
    );
    setIncidents(updated);
    setFormStatus("✅ Appointment details updated successfully!");
  };

  if (!incident)
    return <p className="text-red-600 font-semibold">Appointment not found</p>;

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
            Edit Appointment
          </h1>
        </div>

        <div className="bg-white border border-teal-200 rounded-lg p-4 mb-6 text-sm text-gray-700 shadow-sm">
          <p className="font-semibold text-teal-700 mb-2">
            Current Appointment Details:
          </p>
          <p>
            <strong>Title:</strong> {incident.title}
          </p>
          <p>
            <strong>Description:</strong> {incident.description}
          </p>
          <p>
            <strong>Date/Time:</strong>{" "}
            {new Date(incident.appointmentDate).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`font-semibold ${
                incident.status === "Completed"
                  ? "text-green-600"
                  : incident.status === "Scheduled"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {incident.status}
            </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-gradient-to-br from-[#BBE3E1] to-[#88B8BC] bg-opacity-90 p-6 rounded-lg shadow-lg"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Appointment Title"
              className="peer w-full bg-transparent border border-teal-300 rounded-lg px-3 py-2 text-gray-800 placeholder-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="relative">
            <textarea
              rows="3"
              placeholder="Appointment Description"
              className="peer w-full bg-transparent border border-teal-300 rounded-lg px-3 py-2 text-gray-800 placeholder-teal-600 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="datetime-local"
              className="peer w-full bg-transparent border border-teal-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              {...register("appointmentDate", {
                required: "Appointment date is required",
              })}
            />
            {errors.appointmentDate && (
              <p className="text-xs text-red-500 mt-1">
                {errors.appointmentDate.message}
              </p>
            )}
          </div>

          <div className="relative">
            <select
              className="peer w-full bg-transparent border border-teal-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              {...register("status", { required: "Status is required" })}
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
            {errors.status && (
              <p className="text-xs text-red-500 mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="pt-4 flex justify-between items-center gap-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-3 rounded-lg shadow-md transition duration-300"
            >
              💾 Save Changes
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
