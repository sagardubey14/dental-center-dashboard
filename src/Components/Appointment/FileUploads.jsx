import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { mockData } from "../../data/seedUsers";
import { useApp } from "../../context/AppContext";

export default function FileUploads() {
  const { appointmentId } = useParams();
  const incident = mockData.incidents.find(i => i.id === appointmentId);
  const { navigate } = useApp();
  const [uploadStatus, setUploadStatus] = useState("");
  const { register, handleSubmit } = useForm();

  if (!incident) return <p>Appointment not found</p>;

  const onFileUpload = (data) => {
    const newFile = {
      name: data.file[0].name,
      url: URL.createObjectURL(data.file[0])
    };

    const updatedIncidents = mockData.incidents.map((inc) =>
      inc.id === appointmentId ? { ...inc, files: [...inc.files, newFile] } : inc
    );
    mockData.incidents = updatedIncidents;

    setUploadStatus("File uploaded successfully!");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
  <h1 className="text-xl font-bold text-blue-800 mb-6 border-b pb-3 flex items-center gap-2">
    <span
      className="text-blue-600 cursor-pointer hover:underline"
      onClick={() => navigate("/admin/appointments", { replace: true })}
    >
      ← Back
    </span>
    File Uploads
  </h1>

  <div className="mb-6">
    <h3 className="text-md font-semibold text-gray-800 mb-2">Uploaded Files</h3>
    {incident.files.length === 0 ? (
      <p className="text-sm text-gray-500">No files uploaded yet.</p>
    ) : (
      <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
        {incident.files.map((file, index) => (
          <li key={index}>
            <a href={file.url} target="_blank" rel="noreferrer" className="hover:underline">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    )}
  </div>

  <form onSubmit={handleSubmit(onFileUpload)} className="space-y-5">
    {/* File Input */}
    <div>
      <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
        Upload New File
      </label>
      <input
        id="file"
        type="file"
        {...register("file", { required: "File is required" })}
        className="block w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
      />
      {/* {errors.file && (
        <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>
      )} */}
    </div>

    <div className="flex justify-between items-center">
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
      >
        ⬆️ Upload
      </button>
      {uploadStatus && (
        <p className="text-green-600 text-sm">{uploadStatus}</p>
      )}
    </div>
    <p className="text-xs text-gray-500">(Upload a new file for this appointment)</p>
  </form>
</div>

  );
}
