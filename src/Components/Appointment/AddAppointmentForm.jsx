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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <h1 className="text-xl font-semibold mb-4 border-b pb-2">
        <p
          className="text-blue-600 cursor-pointer inline"
          onClick={() => navigate("/admin/appointments", { replace: true })}
        >
          {"<-  "}
        </p>{" "}
        Add New Appointment
      </h1>

      {/* Patient */}
      <div>
        <label className="block text-sm font-medium">Patient</label>
        <select
          {...register("patientId", { required: true })}
          className="border rounded w-full p-1"
        >
          <option value="">Select a patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          {...register("title", { required: true })}
          className="border rounded w-full p-1"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium">Description</label>
        <input
          {...register("description")}
          className="border rounded w-full p-1"
        />
      </div>

      {/* Appointment Date */}
      <div>
        <label className="block text-sm font-medium">Appointment Date</label>
        <input
          type="datetime-local"
          {...register("appointmentDate", { required: true })}
          className="border rounded w-full p-1"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        Add Appointment
      </button>
    </form>
  );
}
