import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/db";
import Doctor from "@/models/Doctor";

export async function PATCH(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "doctor") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await request.json();
  const { name, specialty, city } = body;

  const updated = await Doctor.findByIdAndUpdate(
    session.user.id,
    { name, specialty, city },
    { new: true }
  );

  return Response.json({
    name: updated.name,
    specialty: updated.specialty,
    city: updated.city,
  });
}