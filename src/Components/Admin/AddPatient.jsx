import React, { useState } from "react";

export default function AddPatient() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    contact: "",
    healthInfo: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ideally send this data to your API or context store
    alert(`Patient Added (mock):\n${JSON.stringify(formData, null, 2)}`);
    // Optionally reset form or navigate
  };

  return (
    <div className="border p-4">
      <h2 className="font-semibold mb-2">Add New Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input name="name" className="border p-2 w-full" onChange={handleChange} required />
        </div>

        <div>
          <label className="block mb-1">Date of Birth</label>
          <input type="date" name="dob" className="border p-2 w-full" onChange={handleChange} required />
        </div>

        <div>
          <label className="block mb-1">Contact</label>
          <input name="contact" className="border p-2 w-full" onChange={handleChange} required />
        </div>

        <div>
          <label className="block mb-1">Health Info</label>
          <textarea name="healthInfo" className="border p-2 w-full" onChange={handleChange}></textarea>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add Patient</button>
      </form>
    </div>
  );
}
