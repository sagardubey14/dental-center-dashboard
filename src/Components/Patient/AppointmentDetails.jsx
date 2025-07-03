import { useParams, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function AppointmentDetails() {
  const { appointmentId } = useParams();
  const {incidents} = useApp();
  const appointment = incidents.find((inc) => inc.id === appointmentId);

  if (!appointment) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <p className="mb-4">🚫 Appointment not found.</p>
        <Link
          to="/patient/dashboard/appointments"
          className="text-blue-600 hover:underline"
        >
          ← Back to Appointments
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-teal-50 to-white max-w-3xl mx-auto mt-10 p-8 rounded-xl shadow-lg border border-teal-300">
  <Link
    to="/patient/dashboard/appointments"
    className="text-sm text-teal-600 hover:underline"
  >
    ← Back
  </Link>

  {/* Title */}
  <h2 className="mt-4 text-2xl font-semibold text-teal-800 mb-6 border-b pb-3 flex items-center gap-2">
    🗓️ Appointment Details
  </h2>

  {/* Details */}
  <div className="grid gap-3 text-sm text-gray-700">
    <p>
      <span className="font-semibold text-teal-600">Title:</span> {appointment.title}
    </p>
    <p>
      <span className="font-semibold text-teal-600">Description:</span> {appointment.description}
    </p>
    {/* Removed comments section */}
    <p>
      <span className="font-semibold text-teal-600">Date & Time:</span> {new Date(appointment.appointmentDate).toLocaleString()}
    </p>
    <p>
      <span className="font-semibold text-teal-600">Cost:</span> ${appointment.cost || 0}
    </p>
    <p>
      <span className="font-semibold text-teal-600">Status:</span>{" "}
      <span
        className={`font-bold ${
          appointment.status === "Completed"
            ? "text-green-600"
            : appointment.status === "Scheduled"
            ? "text-yellow-600"
            : "text-red-600"
        }`}
      >
        {appointment.status}
      </span>
    </p>
  </div>

  {/* Files */}
  <div className="mt-6">
    <h3 className="text-sm font-semibold text-teal-800 mb-2">Attached Files</h3>
    {appointment.files.length === 0 ? (
      <p className="text-sm text-gray-500 italic">No files attached.</p>
    ) : (
      <ul className="list-disc list-inside text-sm space-y-1 text-teal-700">
        {appointment.files.map((file, idx) => (
          <li key={idx}>
            <a
              href={file.url}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

  );
}
