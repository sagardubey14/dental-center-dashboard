

export default function AdminDashboard() {
  return (
    <div className="p-4 border border-gray-300 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-4 border-b pb-2">Dashboard</h1>

      <div className="flex gap-4 mb-4">
        <div className="flex-1 border p-4">
          <h2 className="font-semibold mb-2">Next 10 Appointments</h2>
          <p>(List of upcoming)</p>
        </div>

        <div className="flex-1 border p-4">
          <h2 className="font-semibold mb-2">Top Patients</h2>
          <p>(List of top patients)</p>
        </div>
      </div>

      <div className="border p-4 mb-4">
        <h2 className="font-semibold mb-2">Pending/Completed Treatments</h2>
        <p>(List of pending/completed tasks)</p>
      </div>

      <div className="flex gap-4">
        <div className="border p-4 flex-1">
          <h2 className="font-semibold mb-2">Revenue</h2>
          <p>(Total)</p>
        </div>

        <div className="border p-4 w-40 text-center">
          <h2 className="font-semibold mb-2">Add New</h2>
          <p>Patient</p>
        </div>
      </div>
    </div>
  );
}
