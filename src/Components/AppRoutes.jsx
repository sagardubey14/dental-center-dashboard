import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Auth from "./Auth";
import AdminDashboard from "./AdminDashboard";
import PatientManagement from "./PatientManagement";
import PatientDashboard from "./PatientDashboard";

const AdminDashboardLayout = () => <Outlet />;
const PatientDashboardLayout = () => <Outlet />;
const PatientManagementLayout = () => <Outlet />;
const AppointmentManagementLayout = () => <Outlet />;
const CalendarViewLayout = () => <Outlet />;
const PatientViewLayout = () => <Outlet />;

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route index element={<div>Admin Dashboard</div>} />
        </Route>

        <Route path="/patient/dashboard" element={<PatientDashboard />}>
          <Route index element={<div>Patient Dashboard</div>} />
        </Route>

        <Route path="/admin/patients" element={<PatientManagement  />}>
          <Route index element={<div>Patient Management</div>} />
          <Route path="edit/:patientId" element={<div>Edit Patient Info</div>} />
          <Route path="delete/:patientId" element={<div>Delete Patient</div>} />
        </Route>

        <Route path="/admin/appointments" element={<AppointmentManagementLayout />}>
          <Route index element={<div>Appointment / Incident Management</div>} />
          <Route path="edit/:appointmentId" element={<div>Edit Appointment</div>} />
          <Route path="add-cost/:appointmentId" element={<div>Add Cost / Treatment Details</div>} />
          <Route path="uploads/:appointmentId" element={<div>File Uploads</div>} />
        </Route>

        <Route path="/admin/calendar" element={<CalendarViewLayout />}>
          <Route index element={<div>Calendar View</div>} />
        </Route>

        <Route path="/patient/view" element={<PatientViewLayout />}>
          <Route index element={<div>Patient View - Dashboard</div>} />
          <Route path="appointments" element={<div>Upcoming Appointments</div>} />
          <Route path="appointments/:appointmentId" element={<div>Appointment Details</div>} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}
