import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";

export default function AddAppointmentForm() {
  const { patients, incidents, setIncidents, notify } = useApp();

  const { register, handleSubmit, reset } = useForm();
    
  const onSubmit = (data) => {

    setIncidents([
      ...incidents,
      {
        ...data,
        id: "i" + Date.now(),
        comments: "",
        status: "Scheduled",
        files: [],
        treatment: "",
        cost: "",
      },
    ]);
    notify("success", `Appointment Added.`);
    reset();
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center flex items-center justify-start rounded-2xl p-2 sm:p-6"
      style={{ backgroundImage: "url('/patientpage.jpg')" }}
    >
      <div className="w-full max-w-lg">
        <div className="mb-6 border-b border-sky-200 pb-3 flex items-center justify-between">
          <h2 className=" ml-auto mr-auto text-xl md:text-2xl font-semibold text-teal-700 tracking-wide">
            Add New Appointment
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-gradient-to-br from-[#BBE3E1] to-[#88B8BC] bg-opacity-90 p-6 rounded-lg shadow-lg"
        >
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Patient</label>
            <select
              {...register("patientId", { required: true })}
              className="w-full border border-teal-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
            >
              <option value="">-- Choose --</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              {...register("title", { required: true })}
              className="w-full border border-teal-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
              placeholder="e.g., Tooth Extraction"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              {...register("description")}
              className="w-full border border-teal-300 rounded-lg px-4 py-2"
              placeholder="Brief notes (optional)"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
            <input
              type="datetime-local"
              {...register("appointmentDate", { required: true })}
              className="w-full border border-teal-300 rounded-lg px-4 py-2"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-3 rounded-lg shadow-md transition duration-300"
            >
              ➕ Add Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
