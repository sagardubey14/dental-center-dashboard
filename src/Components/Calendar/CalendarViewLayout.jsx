import React, { useState } from "react";
import { mockData } from "../../data/seedUsers";
import DayDetails from "./DayDetails";

function getDateKey(date) {
  return date.toISOString().split("T")[0];
}

export default function CalendarViewLayout() {
  const [view, setView] = useState("monthly");
  const [selectedDate, setSelectedDate] = useState(null);

  const incidentsByDate = {};
  mockData.incidents.forEach((incident) => {
    const dateKey = incident.appointmentDate.split("T")[0];
    if (!incidentsByDate[dateKey]) incidentsByDate[dateKey] = [];
    incidentsByDate[dateKey].push(incident);
  });

  const year = 2025;
  const month = 6; // July (0-indexed)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  // Fixed week example (29 June 2025 Sunday to 5 July 2025 Saturday)
  const startOfWeek = new Date(2025, 5, 29);
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(new Date(startOfWeek.getTime() + i * 86400000));
  }

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Calendar View</h2>

      <div className="mb-6">
        <button
          className={`px-4 py-2 rounded ${
            view === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setView("monthly")}
          disabled={view === "monthly"}
        >
          Monthly View
        </button>
        <button
          className={`ml-4 px-4 py-2 rounded ${
            view === "weekly" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setView("weekly")}
          disabled={view === "weekly"}
        >
          Weekly View
        </button>
      </div>

      <div className="grid grid-cols-7 gap-3 border border-gray-300 rounded p-3 max-w-xl">
        {(view === "monthly" ? days : weekDays).map((day) => {
          const dateKey = getDateKey(day);
          const hasIncident = !!incidentsByDate[dateKey];
          const isSelected = selectedDate && getDateKey(selectedDate) === dateKey;

          return (
            <div
              key={dateKey}
              onClick={() => handleDayClick(day)}
              className={`
                cursor-pointer rounded p-2 text-center select-none
                ${hasIncident ? "bg-green-100" : "bg-white"}
                ${isSelected ? "border-2 border-blue-600" : "border border-gray-300"}
                hover:bg-blue-100
              `}
              title={hasIncident ? `${incidentsByDate[dateKey].length} appointment(s)` : ""}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        {selectedDate ? (
          <DayDetails date={selectedDate} incidents={incidentsByDate[getDateKey(selectedDate)] || []} />
        ) : (
          <p className="text-gray-600 italic">Click on a day to see scheduled treatments.</p>
        )}
      </div>
    </div>
  );
}
