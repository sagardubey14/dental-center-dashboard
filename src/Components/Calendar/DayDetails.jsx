import React from "react";

function formatTime(dateString) {
  const d = new Date(dateString);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function DayDetails({ date, incidents }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Treatments for {date.toDateString()}</h3>
      {incidents.length === 0 ? (
        <p className="text-gray-500">No scheduled treatments.</p>
      ) : (
        <ul>
          {incidents.map((incident) => (
            <li
              key={incident.id}
              className="mb-6 border-b border-gray-300 pb-4"
            >
              <p className="font-bold text-lg">{incident.title} <span className="text-sm text-gray-600">at {formatTime(incident.appointmentDate)}</span></p>
              <p><span className="font-semibold">Description:</span> {incident.description}</p>
              <p><span className="font-semibold">Comments:</span> {incident.comments}</p>
              <p><span className="font-semibold">Status:</span> {incident.status}</p>
              <p><span className="font-semibold">Cost:</span> ${incident.cost}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
