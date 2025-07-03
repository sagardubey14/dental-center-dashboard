import React, { useState } from "react";
import DayDetails from "./DayDetails";
import { useApp } from "../../context/AppContext";

function getDateKey(date) {
  return date.toISOString().split("T")[0];
}

export default function CalendarViewLayout() {
  const { navigate, incidents } = useApp();
  const [view, setView] = useState("monthly");
  const [selectedDate, setSelectedDate] = useState(null);

  const incidentsByDate = {};
  incidents.forEach((incident) => {
    const dateKey = incident.appointmentDate.split("T")[0];
    if (!incidentsByDate[dateKey]) incidentsByDate[dateKey] = [];
    incidentsByDate[dateKey].push(incident);
  });

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  const startOfWeek = new Date(year, month, 1);
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(new Date(startOfWeek.getTime() + i * 86400000));
  }

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto animate-fade-in min-h-screen">
      <h2 className="text-3xl font-semibold text-blue-900 mb-6 flex items-center gap-2">
        <span
          className="text-cyan-600 hover:text-cyan-800 hover:underline cursor-pointer transition-colors duration-300"
          onClick={() => navigate("/admin/dashboard", { replace: true })}
        >
          ←
        </span>
        <span className="relative group">
          Calendar View
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
        </span>
      </h2>

      <div className="flex gap-4 mb-6">
        {["monthly", "weekly"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg font-medium text-sm shadow-md transition duration-300 transform ${
              view === type
                ? "bg-gradient-to-r from-blue-600 to-light-blue-500 text-white scale-105"
                : "bg-wheat-50 text-gray-700 hover:bg-wheat-100"
            }`}
            onClick={() => setView(type)}
            disabled={view === type}
          >
            {type === "monthly" ? "📅 Monthly" : "📆 Weekly"}
          </button>
        ))}
      </div>

      <div className="mb-6 min-h-[50px]">
        {selectedDate ? (
          <DayDetails
            date={selectedDate}
            incidents={incidentsByDate[getDateKey(selectedDate)] || []}
          />
        ) : (
          <p className="text-gray-500 italic text-sm text-center">
            Click a day to view scheduled appointments.
          </p>
        )}
      </div>

      <div className="grid grid-cols-7 gap-2 border border-gray-200 rounded-xl p-4 shadow-md bg-white animate-fade-slide-up">
        {(view === "monthly" ? days : weekDays).map((day) => {
          const dateKey = getDateKey(day);
          const hasIncident = !!incidentsByDate[dateKey];
          const isSelected =
            selectedDate && getDateKey(selectedDate) === dateKey;

          return (
            <div
              key={dateKey}
              onClick={() => handleDayClick(day)}
              className={`
                text-sm text-center font-medium select-none rounded-lg cursor-pointer py-2
                transition-all duration-200 ease-in-out
                ${
                  hasIncident
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-gray-50 text-gray-700"
                }
                ${
                  isSelected
                    ? "ring-2 ring-cyan-500 bg-cyan-100 scale-105"
                    : "border border-gray-200"
                }
                hover:bg-blue-50 hover:shadow-sm
              `}
              title={
                hasIncident
                  ? `${incidentsByDate[dateKey].length} appointment(s)`
                  : ""
              }
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
