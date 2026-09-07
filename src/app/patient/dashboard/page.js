import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/db";
import Patient from "@/models/Patient";
import Appointment from "@/models/Appointment";
import Slot from "@/models/Slot";
import Doctor from "@/models/Doctor";
import PatientProfileCard from "@/components/PatientProfileCard";

export default async function PatientDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "patient") {
    redirect("/login");
  }

  await connectDB();
  const patient = await Patient.findById(session.user.id);

  const appointments = await Appointment.find({ patientId: session.user.id })
    .populate("doctorId", "name specialty city")
    .populate("slotId", "dateTime")
    .sort({ createdAt: -1 });

  return (
    <div>
      <h1>Patient Dashboard</h1>
      <PatientProfileCard name={patient.name} email={patient.email} />

      <h2>My Appointments</h2>
      {appointments.length === 0 && <p>No appointments booked yet.</p>}

      <ul>
        {appointments.map((appt) => (
          <li key={appt._id}>
            Dr. {appt.doctorId.name} ({appt.doctorId.specialty}, {appt.doctorId.city}) —{" "}
            {new Date(appt.slotId.dateTime).toLocaleString()} — {appt.status}
          </li>
        ))}
      </ul>
    </div>
  );
}