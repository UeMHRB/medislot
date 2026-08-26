import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/db";
import Patient from "@/models/Patient";

export async function PATCH(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "patient") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await request.json();
  const { name } = body;

  const updated = await Patient.findByIdAndUpdate(
    session.user.id,
    { name },
    { new: true }
  );

  return Response.json({ name: updated.name });
}