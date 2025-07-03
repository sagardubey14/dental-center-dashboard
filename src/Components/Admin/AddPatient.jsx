import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";

export default function AddPatient({ data }) {
  const { users, patients, setUsers, setPatients, notify } = useApp();

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
        const updatedPatients = [...patients];
        updatedPatients[patientIndex] = {
          ...updatedPatients[patientIndex],
          name: formData.name,
          dob: formData.dob,
          contact: formData.contact,
          healthInfo: formData.healthInfo,
        };

        setPatients(updatedPatients);
        notify("success", `Patient ${data.patientId} Updated`);
      }
    } else {
      const newPatientId = "p"+Date.now();
      const newPatient = {
        id: newPatientId,
        name: formData.name,
        dob: formData.dob,
        contact: formData.contact,
        healthInfo: formData.healthInfo,
      };
      const newUserId = String(Date.now());
      const newUser = {
        id: newUserId,
        role: "Patient",
        email: formData.email,
        password: `${formData.email.split("@")[0]}123`,
        patientId: newPatientId,
      };

      setPatients([...patients, newPatient]);
      setUsers([...users, newUser]);
      notify("success", `Patient ${newUserId} Added`);
    }

    reset();
  };

  return (
    <div
      className=" bg-cover bg-no-repeat bg-center flex items-center justify-start rounded-2xl p-4 sm:p-6"
      style={{ backgroundImage: "url('/patientpage.jpg')" }}
    >
      <div className="w-full max-w-lg">
        <div className="mb-6 border-b border-sky-200 pb-3 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-teal-700 tracking-wide">
            {data ? "📝 Edit Patient" : "Add New Patient"}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-gradient-to-br from-[#BBE3E1] to-[#88B8BC] bg-opacity-90 p-6 rounded-lg shadow-lg"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name *"
              className="peer w-full bg-transparent border border-teal-300 rounded-lg px-3 py-2 text-gray-800 placeholder-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">Name is required</p>
            )}
          </div>

          <div className="relative">
            <input
              type="date"
              placeholder="Date of Birth *"
              className="peer w-full bg-transparent border border-teal-300 rounded-lg px-3 py-2 text-gray-800 placeholder-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              {...register("dob", { required: true })}
            />
            {errors.dob && (
              <p className="text-xs text-red-500 mt-1">
                Date of Birth is required
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Contact Number *"
              className="peer w-full bg-transparent border border-teal-300 rounded-lg px-3 py-2 text-gray-800 placeholder-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              {...register("contact", { required: true })}
            />
            {errors.contact && (
              <p className="text-xs text-red-500 mt-1">Contact is required</p>
            )}
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email Address *"
              disabled={data ? false : false}
              className="peer w-full bg-transparent border border-teal-300 rounded-lg px-3 py-2 text-gray-800 placeholder-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
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
              placeholder="Health Information"
              className="peer w-full bg-transparent border border-teal-300 rounded-lg px-3 py-2 text-gray-800 placeholder-teal-600 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              {...register("healthInfo")}
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-3 rounded-lg shadow-md transition duration-300 flex items-center gap-2 justify-center"
            >
              {data ? "✅ Update Patient" : "➕ Add Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
