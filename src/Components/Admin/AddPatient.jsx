import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { mockData } from "../../data/seedUsers";

export default function AddPatient({ data }) {
  const { users, patients } = mockData;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: data || {},
  });

  useEffect(() => {
    if (data) {
      for (const key in data) {
        setValue(key, data[key]);
      }
    }
  }, [data, setValue]);

  const onSubmit = (formData) => {
    if (data) {
      const patientIndex = patients.findIndex(p => p.id === data.patientId || data.id);
      if (patientIndex !== -1) {
        patients[patientIndex] = {
          ...patients[patientIndex],
          name: formData.name,
          dob: formData.dob,
          contact: formData.contact,
          healthInfo: formData.healthInfo,
        };
      }

      alert(`Patient Updated:\n${JSON.stringify(formData, null, 2)}`);
    } else {
      const lastUserId = Math.max(...users.map((u) => parseInt(u.id)));
      const newUserId = (lastUserId + 1).toString();

      const lastPatientIdNum = Math.max(
        ...patients.map((p) => parseInt(p.id.replace("p", "")))
      );
      const newPatientId = `p${lastPatientIdNum + 1}`;

      const newPatient = {
        id: newPatientId,
        name: formData.name,
        dob: formData.dob,
        contact: formData.contact,
        healthInfo: formData.healthInfo,
      };
      patients.push(newPatient);
      console.log(formData.email.split('@')[0]);
      
      const newUser = {
        id: newUserId,
        role: "Patient",
        email: formData.email,
        password: `${formData.email.split('@')[0]}123`,
        patientId: newPatientId,
      };
      users.push(newUser);

      alert(`Patient Added:\n${JSON.stringify(newPatient, null, 2)}\nUser:\n${JSON.stringify(newUser, null, 2)}`);
    }

    reset();
  };

  return (
    <div className="border p-4">
      <h2 className="font-semibold mb-2">{data ? "Edit Patient" : "Add New Patient"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            className="border p-2 w-full"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
        </div>

        <div>
          <label className="block mb-1">Date of Birth</label>
          <input
            type="date"
            className="border p-2 w-full"
            {...register("dob", { required: true })}
          />
          {errors.dob && <p className="text-red-500 text-sm">Date of Birth is required</p>}
        </div>

        <div>
          <label className="block mb-1">Contact</label>
          <input
            className="border p-2 w-full"
            {...register("contact", { required: true })}
          />
          {errors.contact && <p className="text-red-500 text-sm">Contact is required</p>}
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="border p-2 w-full bg-gray-100 cursor-not-allowed"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            disabled
          />
          {errors.email && <p className="text-red-500 text-sm">Valid email is required</p>}
        </div>

        <div>
          <label className="block mb-1">Health Info</label>
          <textarea
            className="border p-2 w-full"
            {...register("healthInfo")}
          ></textarea>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {data ? "Update Patient" : "Add Patient"}
        </button>
      </form>
    </div>
  );
}
