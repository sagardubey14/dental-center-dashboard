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
      const patientIndex = patients.findIndex(
        (p) => p.id === data.patientId || data.id
      );
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
      console.log(formData.email.split("@")[0]);

      const newUser = {
        id: newUserId,
        role: "Patient",
        email: formData.email,
        password: `${formData.email.split("@")[0]}123`,
        patientId: newPatientId,
      };
      users.push(newUser);

      alert(
        `Patient Added:\n${JSON.stringify(
          newPatient,
          null,
          2
        )}\nUser:\n${JSON.stringify(newUser, null, 2)}`
      );
    }

    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-white to-sky-100 flex items-center justify-center p-6">
      <div className="">
        <div className="mb-8 border-b border-sky-200 pb-4 flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-teal-700 tracking-wide">
            {data ? "📝 Edit Patient" : "Add New Patient"}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              className="peer w-full bg-transparent border border-teal-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              {...register("name", { required: true })}
            />
            <label className="absolute left-4 top-2 text-sm text-teal-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-teal-600">
              Full Name *
            </label>
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">Name is required</p>
            )}
          </div>

          <div className="relative">
            <input
              type="date"
              placeholder=" "
              className="peer w-full bg-transparent border border-teal-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              {...register("dob", { required: true })}
            />
            <label className="absolute left-4 top-2 text-sm text-teal-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-teal-600">
              Date of Birth *
            </label>
            {errors.dob && (
              <p className="text-xs text-red-500 mt-1">
                Date of Birth is required
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder=" "
              className="peer w-full bg-transparent border border-teal-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              {...register("contact", { required: true })}
            />
            <label className="absolute left-4 top-2 text-sm text-teal-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-teal-600">
              Contact Number *
            </label>
            {errors.contact && (
              <p className="text-xs text-red-500 mt-1">Contact is required</p>
            )}
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="user@domain.com"
              disabled
              className="w-full bg-gray-100 border border-gray-300 text-gray-500 rounded-xl px-4 py-3 cursor-not-allowed"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">Valid email required</p>
            )}
          </div>

          <div className="relative">
            <textarea
              rows={3}
              placeholder=" "
              className="peer w-full bg-transparent border border-teal-300 rounded-xl px-4 pt-6 pb-2 text-gray-800 placeholder-transparent resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              {...register("healthInfo")}
            ></textarea>
            <label className="absolute left-4 top-2 text-sm text-teal-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-teal-600">
              Health Information
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300 flex items-center gap-2 justify-center"
            >
              {data ? "✅ Update Patient" : "➕ Add Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
