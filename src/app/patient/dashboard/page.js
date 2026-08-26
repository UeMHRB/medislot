import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/db";
import Patient from "@/models/Patient";
import PatientProfileCard from "@/components/PatientProfileCard";

export default async function PatientDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "patient") {
    redirect("/login");
  }

  await connectDB();
  const patient = await Patient.findById(session.user.id);

  return (
    <div>
      <h1>Patient Dashboard</h1>
      <PatientProfileCard
        name={patient.name}
        email={patient.email}
      />
    </div>
  );
}