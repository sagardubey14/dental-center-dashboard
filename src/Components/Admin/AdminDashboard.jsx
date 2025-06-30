import { Link } from "react-router-dom";
import { mockData } from "../../data/seedUsers";

export default function AdminDashboard() {
  const upcomingAppointments = mockData.incidents
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);

  const patientIncidentCounts = mockData.incidents.reduce((acc, incident) => {
    acc[incident.patientId] = (acc[incident.patientId] || 0) + 1;
    return acc;
  }, {});

  const topPatients = Object.entries(patientIncidentCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([patientId, incidentCount]) => {
      const patient = mockData.patients.find((p) => p.id === patientId);
      return { ...patient, incidentCount };
    });

  const pendingTreatments = mockData.incidents.filter(
    (incident) => incident.status === "Pending"
  );
  const completedTreatments = mockData.incidents.filter(
    (incident) => incident.status === "Completed"
  );

  const totalRevenue = mockData.incidents.reduce(
    (total, incident) => total + incident.cost,
    0
  );

  return (
    <div className="p-4 border border-gray-300 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-4 border-b pb-2">Dashboard</h1>
      <nav className="mb-6">
        <ul className="space-y-2 flex space-x-2">
          <li>
            <Link
              to="/admin/patients"
              className="text-blue-600 hover:underline"
            >
              Manage Patients
            </Link>
          </li>
          <li>
            <Link
              to="/admin/appointments"
              className="text-blue-600 hover:underline"
            >
              Manage Apointments
            </Link>
          </li>
          <li>
            <Link
              to="/admin/calendar"
              className="text-blue-600 hover:underline"
            >
              Calendar
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex gap-4 mb-4">
        <div className="flex-1 border p-4">
          <h2 className="font-semibold mb-2">Next 10 Appointments</h2>
          <ul>
            {upcomingAppointments.map((appointment) => (
              <li key={appointment.id}>
                {appointment.title} -{" "}
                {new Date(appointment.appointmentDate).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 border p-4">
          <h2 className="font-semibold mb-2">Top Patients</h2>
          <ul>
            {topPatients.map((patient) => (
              <li key={patient.id}>
                {patient.name} ({patient.incidentCount} incidents)
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border p-4 mb-4">
        <h2 className="font-semibold mb-2">Pending/Completed Treatments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className=" grid-cols-1">
            <h3>Pending</h3>
            <ul>
              {pendingTreatments.map((treatment) => (
                <li key={treatment.id}>
                  {treatment.title} -{" "}
                  {new Date(treatment.appointmentDate).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
          <div className=" grid-cols-2">
            <h3>Completed</h3>
            <ul>
              {completedTreatments.map((treatment) => (
                <li key={treatment.id}>
                  {treatment.title} -{" "}
                  {new Date(treatment.appointmentDate).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="border p-4 flex-1">
          <h2 className="font-semibold mb-2">Revenue</h2>
          <p>Total Revenue: ${totalRevenue}</p>
        </div>

        <div className="border p-4 w-40 text-center">
          <h2 className="font-semibold mb-2">Add New</h2>
          <p>Patient</p>
        </div>
      </div>
    </div>
  );
}
