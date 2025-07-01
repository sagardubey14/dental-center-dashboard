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
    <div className="border p-4">
      <h1 className="text-xl font-semibold mb-4 border-b pb-2">
        <p
          className="text-blue-600 cursor-pointer inline"
          onClick={() => navigate("/admin/appointments", { replace: true })}
        >
          {"<-  "}
        </p>{" "}
        File Uploads
      </h1>

      <ul className="list-disc list-inside">
        {incident.files.map((file, index) => (
          <li key={index}>
            <a href={file.url} className="text-blue-600 underline" target="_blank" rel="noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit(onFileUpload)} className="mt-4">
        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Upload New File
          </label>
          <input
            id="file"
            type="file"
            {...register("file", { required: "File is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
          {uploadStatus && (
            <p className="text-sm text-green-600">{uploadStatus}</p>
          )}
        </div>
      </form>

      <p className="mt-2 text-gray-600">(Upload a new file for this appointment)</p>
    </div>
  );
}
