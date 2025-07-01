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
    <div className="border p-4">
      <h1 className="text-xl font-semibold mb-4 border-b pb-2">
        <p
          className="text-blue-600 cursor-pointer inline"
          onClick={() => navigate("/admin/appointments", { replace: true })}
        >
          {"<-  "}
        </p>{" "}
        Edit Appointment
      </h1>

      <div className="mt-6">
        <p>
          <strong>Current Appointment Details:</strong>
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
          <strong>Status:</strong> {incident.status}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "Title is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            {...register("description", {
              required: "Description is required",
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {errors.description && (
            <span className="text-red-500 text-xs">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="appointmentDate"
            className="block text-sm font-medium text-gray-700"
          >
            Appointment Date & Time
          </label>
          <input
            id="appointmentDate"
            type="datetime-local"
            {...register("appointmentDate", {
              required: "Appointment date is required",
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {errors.appointmentDate && (
            <span className="text-red-500 text-xs">
              {errors.appointmentDate.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            {...register("status", { required: "Status is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
          {errors.status && (
            <span className="text-red-500 text-xs">
              {errors.status.message}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
          {formStatus && <p className="text-sm text-green-600">{formStatus}</p>}
        </div>
      </form>
    </div>
  );
}
