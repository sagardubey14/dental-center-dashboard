import { Link } from "react-router-dom";
import { mockData } from "../../data/seedUsers"; // Adjust path based on your file structure

export default function PatientIndex() {
  const patients = mockData.patients;

  return (
    <div className="grid gap-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">🧑‍⚕️ Patient Directory</h2>
  
        {patients.length === 0 ? (
          <p className="text-gray-600 italic">No patients available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="bg-blue-50 border border-blue-100 rounded-xl p-5 shadow hover:shadow-md transition"
              >
                {/* Avatar + Name */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold text-lg">
                    {patient.name?.[0]?.toUpperCase() || "P"}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">{patient.name}</h3>
                    <p className="text-sm text-gray-500">Patient ID: {patient.id}</p>
                  </div>
                </div>
  
                {/* Info */}
                <div className="text-sm text-gray-700 space-y-1">
                  <p><span className="font-medium text-gray-600">DOB:</span> {patient.dob}</p>
                  <p><span className="font-medium text-gray-600">Contact:</span> {patient.contact}</p>
                </div>
  
                {/* Actions */}
                <div className="mt-4 flex justify-between items-center">
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    Active
                  </span>
                  <div className="flex gap-3">
                    <Link
                      to={`edit/${patient.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      ✏️ Edit
                    </Link>
                    <Link
                      to={`delete/${patient.id}`}
                      className="text-red-600 hover:text-red-800 font-medium text-sm"
                    >
                      🗑️ Delete
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}  