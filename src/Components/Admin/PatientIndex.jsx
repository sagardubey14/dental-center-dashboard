import { Link } from "react-router-dom";
import { mockData } from "../../data/seedUsers"; // Adjust path based on your file structure

export default function PatientIndex() {
  const patients = mockData.patients;

  return (
    <div className="flex gap-4 mb-6">
      {/* Patient List */}
      <div className="flex-1 border p-4">
        <h2 className="font-semibold mb-2">Patient List</h2>
        {patients.length === 0 ? (
          <p>No patients available.</p>
        ) : (
          <ul className="space-y-2">
            {patients.map((patient) => (
              <li key={patient.id} className="border p-2 rounded">
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>DOB:</strong> {patient.dob}</p>
                <p><strong>Contact:</strong> {patient.contact}</p>
                <div className="mt-2 space-x-3">
                  <Link to={`edit/${patient.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                  <Link to={`delete/${patient.id}`} className="text-red-600 hover:underline">
                    Delete
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Patient Link */}
      <div className="flex-1 border p-4">
        <h2 className="font-semibold mb-2">Add New Patient</h2>
        <Link to="add" className="text-blue-600 underline">
          Go to Add Patient Form
        </Link>
      </div>
    </div>
  );
}
