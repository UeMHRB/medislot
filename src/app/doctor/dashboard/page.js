import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/db";
import Doctor from "@/models/Doctor";
import DoctorProfileCard from "@/components/DoctorProfileCard";

export default async function DoctorDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "doctor") {
    redirect("/login");
  }

  await connectDB();
  const doctor = await Doctor.findById(session.user.id);

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <DoctorProfileCard
        name={doctor.name}
        email={doctor.email}
        specialty={doctor.specialty}
        city={doctor.city}
      />
    </div>
  );
}