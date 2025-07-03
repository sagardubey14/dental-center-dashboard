import { Link } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function AdminDashboard() {
  const { incidents, patients } = useApp();
  const upcomingAppointments = incidents
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);

  const patientIncidentCounts = incidents.reduce((acc, incident) => {
    acc[incident.patientId] = (acc[incident.patientId] || 0) + 1;
    return acc;
  }, {});

  const topPatients = Object.entries(patientIncidentCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([patientId, incidentCount]) => {
      const patient = patients.find((p) => p.id === patientId);
      return { ...patient, incidentCount };
    });

  const pendingTreatments = incidents.filter(
    (incident) => incident.status === "Pending"
  );
  const completedTreatments = incidents.filter(
    (incident) => incident.status === "Completed"
  );

  const totalRevenue = incidents.reduce(
    (total, incident) => total + incident.cost,
    0
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-50 via-white to-sky-100 font-sans text-gray-800 p-2">
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden transition-opacity ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 min-h-screen bg-teal-50 shadow-xl p-2 space-y-10 border-r border-teal-100 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-3xl mt-2 ml-2 font-extrabold text-teal-700 tracking-tight mb-12 select-none">
          DentalCare Admin
        </h2>
        <nav className="space-y-6 text-base font-semibold">
          <Link
            to="/admin/patients"
            className="block px-5 py-3 rounded-lg hover:bg-teal-100 text-teal-800 transition"
            onClick={() => setSidebarOpen(false)}
          >
            🧑‍⚕️ Manage Patients
          </Link>
          <Link
            to="/admin/appointments"
            className="block px-5 py-3 rounded-lg hover:bg-teal-100 text-teal-800 transition"
            onClick={() => setSidebarOpen(false)}
          >
            📅 Manage Appointments
          </Link>
          <Link
            to="/admin/calendar"
            className="block px-5 py-3 rounded-lg hover:bg-teal-100 text-teal-800 transition"
            onClick={() => setSidebarOpen(false)}
          >
            🗓️ Calendar
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="flex items-center justify-between bg-white shadow-md p-4 md:hidden sticky top-0 z-20">
          <button
            aria-label="Toggle sidebar"
            className="text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-md"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              {sidebarOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
          <h1 className="text-xl font-extrabold text-teal-900">
            Dental Dashboard
          </h1>
        </header>

        <main className="p-3 md:p-12 overflow-auto">
          <div className="bg-teal-50 p-4 flex justify-between items-center rounded-lg shadow-lg mb-5 md:flex-row flex-col">
            {/* Left Side: Title and Greeting */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
                src="https://img.icons8.com/dotty/80/administrator-male.png"
                alt="avatar"
                className="w-14 h-14 rounded-full border-4 border-teal-500 shadow-xl transition-transform transform hover:scale-110"
              />
              <p className="text-teal-700 text-lg font-semibold">
                Welcome back Admin
              </p>
            </div>

            {/* Center: Total Revenue */}
            <div className="text-center my-4 md:my-0">
              <h2 className="text-xl font-bold text-teal-800 mb-1">
                Total Revenue
              </h2>
              <p className="text-3xl font-semibold text-emerald-700">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>

            {/* Right Side: Add Patient Button */}
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link
                to="/admin/patients/add"
                className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg text-lg hover:bg-teal-700 transition-transform transform hover:scale-105"
              >
                ➕ Add New Patient
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Upcoming Appointments */}
            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold text-teal-700 mb-2">
                Upcoming Appointments
              </h2>
              <ul className="space-y-2 text-gray-700 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500">
                {upcomingAppointments.length ? (
                  upcomingAppointments.map((a) => (
                    <li
                      key={a.id}
                      className="text-sm flex items-center gap-2"
                    >
                      <span>{a.title}</span>
                      <time className="ml-auto text-xs sm:text-sm text-teal-600 font-mono">
                      {new Date(a.appointmentDate).toLocaleString(undefined, {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                      </time>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 italic text-center py-4">
                    No upcoming appointments
                  </li>
                )}
              </ul>
            </section>

            {/* Top Patients */}
            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold text-teal-700 mb-2">
                Top Patients
              </h2>
              <ul className="space-y-2 text-gray-700 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500">
                {topPatients.length ? (
                  topPatients.map((p) => (
                    <li
                      key={p.id}
                      className="flex justify-between font-semibold"
                    >
                      <span>{p.name}</span>
                      <span className="text-xs sm:text-sm text-teal-600 font-normal">
                        {p.incidentCount} incidents
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 italic text-center py-4">
                    No patient data
                  </li>
                )}
              </ul>
            </section>

            {/* Pending Treatments */}
            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold text-yellow-600 mb-2">
                Pending Treatments
              </h2>
              <ul className="space-y-2 text-gray-700">
                {pendingTreatments.length ? (
                  pendingTreatments.map((t) => (
                    <li
                      key={t.id}
                      className="text-sm text-gray-700 flex items-center gap-2"
                    >
                      <span>{t.title}</span>
                      <time className="ml-auto text-xs sm:text-sm text-teal-600 font-mono">
                      {new Date(t.appointmentDate).toLocaleString(undefined, {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                      </time>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 italic text-center py-4">
                    No pending treatments
                  </li>
                )}
              </ul>
            </section>

            {/* Completed Treatments */}
            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold text-emerald-600 mb-2">
                Completed Treatments
              </h2>
              <ul className="space-y-2 text-gray-700">
                {completedTreatments.length ? (
                  completedTreatments.map((t) => (
                    <li
                      key={t.id}
                      className="text-sm text-gray-700 flex items-center gap-2"
                    >
                      <span>{t.title}</span>
                      <time className="ml-auto text-xs sm:text-sm text-teal-600 font-mono">
                      {new Date(t.appointmentDate).toLocaleString(undefined, {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                      </time>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 italic text-center py-4">
                    No completed treatments
                  </li>
                )}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
