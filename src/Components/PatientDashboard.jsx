import React from 'react'

export default function PatientDashboard() {
  return (
    <div className="p-4 border border-gray-300 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-4 border-b pb-2">Patient Dashboard</h1>

      <div className="flex gap-4 mb-4">
        <div className="flex-1 border p-4">
          <h2 className="font-semibold mb-2">Upcoming Appointments</h2>
          <p>(List of upcoming appointments)</p>
        </div>

        <div className="flex-1 border p-4">
          <h2 className="font-semibold mb-2">Medical History</h2>
          <p>(List of past treatments and visits)</p>
        </div>
      </div>

      <div className="border p-4 mb-4">
        <h2 className="font-semibold mb-2">Prescriptions</h2>
        <p>(List of active prescriptions)</p>
      </div>

      <div className="flex gap-4">
        <div className="border p-4 flex-1">
          <h2 className="font-semibold mb-2">Billing & Payments</h2>
          <p>(Total unpaid balance or payment history)</p>
        </div>

        <div className="border p-4 w-40 text-center">
          <h2 className="font-semibold mb-2">Contact Provider</h2>
          <p>Reach out to your healthcare provider</p>
        </div>
      </div>
    </div>
  );
}

