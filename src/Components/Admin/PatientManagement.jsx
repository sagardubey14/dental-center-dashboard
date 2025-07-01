import React from "react";
import { Outlet } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function PatientManagement() {
  const { navigate } = useApp();

  return (
    <div className="p-4 border border-gray-300 max-w-5xl mx-auto">
      <h1 className="text-xl font-semibold mb-4 border-b pb-2">
        {" "}
        <p
          className="text-blue-600 cursor-pointer inline"
          onClick={() => navigate("/admin/dashboard", { replace: true })}
        >
          {"<-  "}
        </p>{" "}
        Patient Management
      </h1>
      <Outlet />
    </div>
  );
}
