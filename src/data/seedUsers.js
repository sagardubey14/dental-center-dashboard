export const mockData = {
  users: [
    { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
    { id: "2", role: "Patient", email: "john@entnt.in", password: "patient123", patientId: "p1" },
    { id: "3", role: "Patient", email: "alice@entnt.in", password: "alice123", patientId: "p2" },
    { id: "4", role: "Admin", email: "doctor@entnt.in", password: "doctor123" },
    { id: "5", role: "Patient", email: "bob@entnt.in", password: "bob123", patientId: "p3" },
    { id: "6", role: "Patient", email: "eve@entnt.in", password: "eve123", patientId: "p4" },
    { id: "7", role: "Patient", email: "mike@entnt.in", password: "mike123", patientId: "p5" },
    { id: "8", role: "Patient", email: "lisa@entnt.in", password: "lisa123", patientId: "p6" },
    { id: "9", role: "Admin", email: "admin2@entnt.in", password: "admin234" },
    { id: "10", role: "Patient", email: "jane@entnt.in", password: "jane123", patientId: "p7" },
    { id: "11", role: "Patient", email: "charlie@entnt.in", password: "charlie123", patientId: "p8" },
    { id: "12", role: "Patient", email: "olivia@entnt.in", password: "olivia123", patientId: "p9" }
  ],

  patients: [
    { id: "p1", name: "John Doe", dob: "1990-05-10", contact: "1234567890", healthInfo: "No allergies" },
    { id: "p2", name: "Alice Smith", dob: "1985-03-22", contact: "9876543210", healthInfo: "Allergic to penicillin" },
    { id: "p3", name: "Bob Johnson", dob: "1982-07-15", contact: "5432167890", healthInfo: "Asthma" },
    { id: "p4", name: "Eve Adams", dob: "1995-12-30", contact: "6785432109", healthInfo: "Diabetic" },
    { id: "p5", name: "Mike Lee", dob: "1988-11-05", contact: "5647382910", healthInfo: "No known conditions" },
    { id: "p6", name: "Lisa Green", dob: "1992-02-17", contact: "9876123456", healthInfo: "High cholesterol" },
    { id: "p7", name: "Jane Brown", dob: "1993-09-25", contact: "7412589630", healthInfo: "Healthy" },
    { id: "p8", name: "Charlie White", dob: "1991-04-09", contact: "8463729105", healthInfo: "Mild depression" },
    { id: "p9", name: "Olivia Blue", dob: "1994-12-01", contact: "3562718490", healthInfo: "Frequent headaches" }
  ],

  incidents: [
    {
      id: "i1",
      patientId: "p1",
      title: "Toothache",
      description: "Upper molar pain",
      comments: "Sensitive to cold",
      appointmentDate: "2025-07-01T10:00:00",
      cost: 80,
      status: "Completed",
      files: []
    },
    {
      id: "i2",
      patientId: "p2",
      title: "Gum Infection",
      description: "Painful swelling in the gums",
      comments: "Bleeding during brushing",
      appointmentDate: "2025-07-02T11:30:00",
      cost: 50,
      status: "Completed",
      files: []
    },
    {
      id: "i3",
      patientId: "p3",
      title: "Cavity Treatment",
      description: "Decay in upper molar",
      comments: "Requires filling",
      appointmentDate: "2025-07-05T14:00:00",
      cost: 100,
      status: "Pending",
      files: []
    },
    {
      id: "i4",
      patientId: "p4",
      title: "Dental Checkup",
      description: "Routine dental checkup",
      comments: "Needs scaling and cleaning",
      appointmentDate: "2025-07-06T09:30:00",
      cost: 120,
      status: "Scheduled",
      files: []
    },
    {
      id: "i11",
      patientId: "p4",
      title: "Dental Checkup",
      description: "Routine dental checkup",
      comments: "Needs scaling and cleaning",
      appointmentDate: "2025-06-06T09:30:00",
      cost: 120,
      status: "Scheduled",
      files: []
    },
    {
      id: "i5",
      patientId: "p5",
      title: "Teeth Whitening",
      description: "Whitening treatment for yellow teeth",
      comments: "Uses whitening toothpaste regularly",
      appointmentDate: "2025-07-07T10:15:00",
      cost: 70,
      status: "Completed",
      files: []
    },
    {
      id: "i6",
      patientId: "p6",
      title: "Chronic Gum Issues",
      description: "Recurring gum inflammation",
      comments: "Uses medicated mouthwash regularly",
      appointmentDate: "2025-07-08T13:00:00",
      cost: 90,
      status: "Pending",
      files: []
    },
    {
      id: "i7",
      patientId: "p7",
      title: "Tooth Sensitivity",
      description: "Pain when consuming hot or cold foods",
      comments: "Sensitive teeth, needs treatment",
      appointmentDate: "2025-07-09T11:45:00",
      cost: 65,
      status: "Scheduled",
      files: []
    },
    {
      id: "i8",
      patientId: "p8",
      title: "Bruxism (Teeth Grinding)",
      description: "Grinding teeth during sleep",
      comments: "Complains of jaw pain in the mornings",
      appointmentDate: "2025-07-10T15:30:00",
      cost: 110,
      status: "Completed",
      files: []
    },
    {
      id: "i9",
      patientId: "p9",
      title: "Wisdom Teeth Removal",
      description: "Pain in the back of the mouth, possible impaction",
      comments: "Needs an X-ray for confirmation",
      appointmentDate: "2025-07-12T16:00:00",
      cost: 130,
      status: "Scheduled",
      files: []
    },
    {
      id: "i10",
      patientId: "p1",
      title: "Follow-up Appointment",
      description: "Post-treatment checkup after toothache",
      comments: "Checking recovery progress",
      appointmentDate: "2025-07-15T08:30:00",
      cost: 40,
      status: "Scheduled",
      files: []
    }
  ]
};
