
import { useParams, Link } from "react-router-dom";
import { mockData } from "../../data/seedUsers";

export default function AppointmentDetails() {
  const { appointmentId } = useParams();

  const appointment = mockData.incidents.find((inc) => inc.id === appointmentId);

  if (!appointment) {
    return (
      <div>
        <p>Appointment not found.</p>
        <Link to="/patient/dashboard/appointments" className="text-blue-600 hover:underline">
          Back to Appointments
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Appointment Details</h2>
      <p>
        <strong>Title:</strong> {appointment.title}
      </p>
      <p>
        <strong>Description:</strong> {appointment.description}
      </p>
      <p>
        <strong>Comments:</strong> {appointment.comments}
      </p>
      <p>
        <strong>Date & Time:</strong>{" "}
        {new Date(appointment.appointmentDate).toLocaleString()}
      </p>
      <p>
        <strong>Cost:</strong> ${appointment.cost}
      </p>
      <p>
        <strong>Status:</strong> {appointment.status}
      </p>
      <div className="mt-4">
        <strong>Files:</strong>
        {appointment.files.length === 0 ? (
          <p>No files attached.</p>
        ) : (
          <ul className="list-disc pl-5">
            {appointment.files.map((file, idx) => (
              <li key={idx}>
                {/* Normally you would link to the real URL or preview */}
                <a href={file.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link
        to="/patient/dashboard/appointments"
        className="inline-block mt-4 text-blue-600 hover:underline"
      >
        &larr; Back to Appointments
      </Link>
    </div>
  );
}
