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

  return (
    <div className="border p-4">
      <h1 className="text-xl font-semibold mb-4 border-b pb-2">
        <p
          className="text-blue-600 cursor-pointer inline"
          onClick={() => navigate("/admin/appointments", { replace: true })}
        >
          {"<-  "}
        </p>{" "}
        Add Cost
      </h1>
      <h2 className="font-semibold mb-2">Add Cost / Treatment Details</h2>
      <p>
        <strong>Current Cost:</strong> ${incident.cost}
      </p>
      <p>
        <strong>Treatment Notes:</strong> {incident.comments}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="cost"
            className="block text-sm font-medium text-gray-700"
          >
            New Cost
          </label>
          <input
            id="cost"
            type="number"
            step="0.01"
            {...register("cost", {
              required: "Cost is required",
              min: { value: 0, message: "Cost cannot be negative" },
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {errors.cost && (
            <span className="text-red-500 text-xs">{errors.cost.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="treatmentNotes"
            className="block text-sm font-medium text-gray-700"
          >
            Treatment Notes
          </label>
          <textarea
            id="treatmentNotes"
            rows="4"
            {...register("treatmentNotes", {
              required: "Treatment notes are required",
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {errors.treatmentNotes && (
            <span className="text-red-500 text-xs">
              {errors.treatmentNotes.message}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
          {formStatus && <p className="text-sm text-green-600">{formStatus}</p>}
        </div>
      </form>
    </div>
  );
}
