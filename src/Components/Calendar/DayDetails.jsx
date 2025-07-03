function formatTime(dateString) {
  const d = new Date(dateString);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function DayDetails({ date, incidents }) {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg border shadow max-w-3xl mx-auto">
    <h3 className="text-xl font-bold text-blue-800 mb-4">
      Treatments for {date.toDateString()}
    </h3>
  
    {incidents.length === 0 ? (
      <p className="text-gray-500 text-sm">No scheduled treatments.</p>
    ) : (
      <div className="space-y-4">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-blue-50"
          >
            <div className="flex justify-between items-center mb-1">
              <p className="text-lg font-semibold text-blue-900">
                {incident.title}
              </p>
              <span className="text-sm text-gray-600">
                🕒 {formatTime(incident.appointmentDate)}
              </span>
            </div>
  
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Description:</span>{" "}
              {incident.description}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Comments:</span> {incident.comments}
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`font-semibold ${
                  incident.status === "Completed"
                    ? "text-green-600"
                    : incident.status === "Scheduled"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {incident.status}
              </span>
            </p>
            <p className="text-sm text-gray-800">
              <span className="font-semibold">Cost:</span> ${incident.cost}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
  )
}  