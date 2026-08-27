import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/db";
import Slot from "@/models/Slot";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "doctor") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await request.json();
  const { dateTime } = body;

  if (!dateTime) {
    return Response.json({ error: "Date and time are required" }, { status: 400 });
  }

  const slot = await Slot.create({
    doctorId: session.user.id,
    dateTime: new Date(dateTime),
  });

  return Response.json({
    id: slot._id,
    dateTime: slot.dateTime,
    status: slot.status,
  });
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "doctor") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const slots = await Slot.find({ doctorId: session.user.id }).sort({ dateTime: 1 });

  return Response.json(slots);
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "doctor") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { searchParams } = new URL(request.url);
  const slotId = searchParams.get("id");

  const slot = await Slot.findById(slotId);

  if (!slot) {
    return Response.json({ error: "Slot not found" }, { status: 404 });
  }

  if (slot.doctorId.toString() !== session.user.id) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  if (slot.status === "booked") {
    return Response.json({ error: "Cannot delete a booked slot" }, { status: 400 });
  }

  await Slot.findByIdAndDelete(slotId);

  return Response.json({ message: "Slot deleted" });
}