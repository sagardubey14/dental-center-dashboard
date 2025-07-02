
import { Link } from "react-router-dom";
import { mockData } from "../../data/seedUsers";
import { useApp } from "../../context/AppContext";

export default function Appointments() {
  const {user} = useApp();
  const patientId = user.patientId;

  const upcomingAppointments = mockData.incidents.filter(
    (incident) =>
      incident.patientId === patientId &&
      new Date(incident.appointmentDate) >= new Date()
  );

  if (upcomingAppointments.length === 0) {
    return <p>No upcoming appointments found.</p>;
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
    <h2 className="text-lg font-semibold text-blue-800 mb-4">Upcoming Appointments</h2>
  
    <ul className="list-disc pl-5 space-y-2 text-sm text-blue-700">
      {upcomingAppointments.map((appointment) => (
        <li key={appointment.id}>
          <Link
            to={`${appointment.id}`}
            className="hover:underline"
          >
            {appointment.title} – {new Date(appointment.appointmentDate).toLocaleString()}
          </Link>
        </li>
      ))}
    </ul>
  </div>
  )
};  