import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/db";
import mongoose from "mongoose";
import Slot from "@/models/Slot";
import Appointment from "@/models/Appointment";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "patient") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await request.json();
  const { slotId } = body;

  if (!slotId) {
    return Response.json({ error: "slotId is required" }, { status: 400 });
  }

  const dbSession = await mongoose.startSession();

  try {
    let appointment;

    await dbSession.withTransaction(async () => {
      const slot = await Slot.findById(slotId).session(dbSession);

      if (!slot) {
        throw new Error("Slot not found");
      }

      if (slot.status !== "available") {
        throw new Error("Slot is already booked");
      }

      slot.status = "booked";
      await slot.save({ session: dbSession });

      const created = await Appointment.create(
        [
          {
            patientId: session.user.id,
            doctorId: slot.doctorId,
            slotId: slot._id,
          },
        ],
        { session: dbSession }
      );

      appointment = created[0];
    });

    return Response.json({ message: "Appointment booked", appointment });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  } finally {
    dbSession.endSession();
  }
}