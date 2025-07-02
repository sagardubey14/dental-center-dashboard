import { Link } from "react-router-dom";
import { mockData } from "../../data/seedUsers";
import { useState } from "react";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-50 via-white to-sky-100 font-sans text-gray-800">
      {/* Mobile Sidebar Overlay */}
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
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-xl p-8 space-y-10 border-r border-teal-100 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-3xl font-extrabold text-teal-700 tracking-tight mb-12 select-none">
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
            {/* Hamburger icon */}
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
                <path d="M6 18L18 6M6 6l12 12" /> // X icon
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" /> // Hamburger lines
              )}
            </svg>
          </button>
          <h1 className="text-xl font-extrabold text-teal-900">Dashboard</h1>
          <div></div> {/* Placeholder for alignment */}
        </header>

        {/* Content Scrollable Area */}
        <main className="p-6 md:p-12 overflow-auto">
          {/* Header for md+ */}
          <div className="hidden md:flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-extrabold text-teal-900 mb-1 leading-tight">
                Dashboard
              </h1>
              <p className="text-teal-700 font-semibold text-lg">
                Welcome back, Dr. Smith 👋
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/40?img=3"
                alt="avatar"
                className="w-12 h-12 rounded-full border-4 border-teal-500 shadow-md"
              />
              <span className="font-semibold text-teal-900 text-lg">
                Dr. Smith
              </span>
            </div>
          </div>

          {/* Revenue and Add Patient side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
            <section className="col-span-1 bg-gradient-to-br from-green-50 to-teal-100 rounded-3xl shadow-lg p-8 hover:shadow-xl transition flex flex-col justify-center items-center text-center min-h-[180px]">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-800 mb-4 tracking-wide">
                Total Revenue
              </h2>
              <p className="text-4xl sm:text-6xl font-bold text-emerald-600 leading-none">
                ${totalRevenue.toLocaleString()}
              </p>
            </section>

            <div className="flex items-center justify-center bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition min-h-[180px]">
              <Link
                to="/admin/patients/add"
                className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold px-10 sm:px-12 py-4 sm:py-5 rounded-full shadow-lg transition-transform transform hover:scale-105 text-lg sm:text-xl"
              >
                ➕ Add New Patient
              </Link>
            </div>
          </div>

          {/* Rest of the cards in two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Upcoming Appointments */}
            <section className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition ">
              <h2 className="text-xl sm:text-2xl font-bold text-teal-700 mb-5 border-b border-teal-100 pb-2">
                Upcoming Appointments
              </h2>
              <ul
                className="space-y-2 text-gray-700 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#14b8a6 transparent",
                }}
              >
                {upcomingAppointments.length ? (
                  upcomingAppointments.map((a) => (
                    <li key={a.id} className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{a.title}</span>
                      <time className="ml-auto text-xs sm:text-sm text-gray-500 font-mono">
                        {new Date(a.appointmentDate).toLocaleString()}
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
            <section className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition ">
              <h2 className="text-xl sm:text-2xl font-bold text-teal-700 mb-5 border-b border-teal-100 pb-2">
                Top Patients
              </h2>
              <ul
                className="space-y-2 text-gray-700 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#14b8a6 transparent", // Tailwind teal-500 hex approx
                }}
              >
                {topPatients.length ? (
                  topPatients.map((p) => (
                    <li
                      key={p.id}
                      className="flex justify-between font-semibold"
                    >
                      <span>🧑 {p.name}</span>
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
            <section className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-300 pr-1">
              <h2 className="text-xl sm:text-2xl font-bold text-yellow-600 mb-5 border-b border-yellow-200 pb-2">
                Pending Treatments
              </h2>
              <ul className="space-y-2 text-gray-700">
                {pendingTreatments.length ? (
                  pendingTreatments.map((t) => (
                    <li key={t.id} className="flex items-center gap-2">
                      <span>🕐</span>
                      <span>{t.title}</span>
                      <time className="ml-auto text-xs sm:text-sm text-gray-500 font-mono">
                        {new Date(t.appointmentDate).toLocaleString()}
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
            <section className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-300 pr-1">
              <h2 className="text-xl sm:text-2xl font-bold text-emerald-600 mb-5 border-b border-emerald-200 pb-2">
                Completed Treatments
              </h2>
              <ul className="space-y-2 text-gray-700">
                {completedTreatments.length ? (
                  completedTreatments.map((t) => (
                    <li key={t.id} className="flex items-center gap-2">
                      <span>✅</span>
                      <span>{t.title}</span>
                      <time className="ml-auto text-xs sm:text-sm text-gray-500 font-mono">
                        {new Date(t.appointmentDate).toLocaleString()}
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
