import React from "react";
import { useParams } from "react-router-dom";
import { mockData } from "../../data/seedUsers";

export default function FileUploads() {
  const { appointmentId } = useParams();
  const incident = mockData.incidents.find(i => i.id === appointmentId);

  if (!incident) return <p>Appointment not found</p>;

  return (
    <div className="border p-4">
      <h2 className="font-semibold mb-2">File Uploads</h2>
      <ul className="list-disc list-inside">
        {incident.files.map((file, index) => (
          <li key={index}>
            <a href={file.url} className="text-blue-600 underline" target="_blank" rel="noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-gray-600">(File upload form goes here)</p>
    </div>
  );
}
