import { Routes, Route, Navigate } from "react-router-dom";

import Auth from "./Components/Auth";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import PatientManagement from "./Components/Admin/PatientManagement";
import PatientDashboard from "./Components/Patient/PatientDashboard";
import PatientIndex from "./Components/Admin/PatientIndex";
import EditPatient from "./Components/Admin/EditPatient";
import DeletePatient from "./Components/Admin/DeletePatient";
import AddPatient from "./Components/Admin/AddPatient";
import AppointmentManagementLayout from "./Components/Appointment/AppointmentManagementLayout";
import AppointmentIndex from "./Components/Appointment/AppointmentIndex";
import EditAppointment from "./Components/Appointment/EditAppointment";
import AddCost from "./Components/Appointment/AddCost";
import FileUploads from "./Components/Appointment/FileUploads";
import CalendarViewLayout from "./Components/Calendar/CalendarViewLayout";
import DashboardHome from "./Components/Patient/DashboardHome";
import Appointments from "./Components/Patient/Appointments";
import AppointmentDetails from "./Components/Patient/AppointmentDetails";
import AddAppointmentForm from "./Components/Appointment/AddAppointmentForm";
import RequireRole from "./Components/RequireRole";
import NotFound from "./Components/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />

      <Route element={<RequireRole role="Admin" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route index element={<div>Admin Dashboard</div>} />
        </Route>

        <Route path="/admin/patients" element={<PatientManagement />}>
          <Route index element={<PatientIndex />} />
          <Route path="add" element={<AddPatient />} />
          <Route path="edit/:patientId" element={<EditPatient />} />
          <Route path="delete/:patientId" element={<DeletePatient />} />
        </Route>

        <Route
          path="/admin/appointments"
          element={<AppointmentManagementLayout />}
        >
          <Route index element={<AppointmentIndex />} />
          <Route path="add" element={<AddAppointmentForm />} />
          <Route path="edit/:appointmentId" element={<EditAppointment />} />
          <Route path="add-cost/:appointmentId" element={<AddCost />} />
          <Route path="uploads/:appointmentId" element={<FileUploads />} />
        </Route>

        <Route path="/admin/calendar" element={<CalendarViewLayout />} />
      </Route>

      <Route element={<RequireRole role="Patient" />}>
        <Route path="/patient/dashboard" element={<PatientDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="appointments" element={<Appointments />} />
          <Route
            path="appointments/:appointmentId"
            element={<AppointmentDetails />}
          />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
