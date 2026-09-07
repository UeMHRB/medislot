import connectDB from "@/lib/db";
import Doctor from "@/models/Doctor";
import Slot from "@/models/Slot";
import BookSlotButton from "@/components/BookSlotButton";

export default async function DoctorProfilePage({ params }) {
  const { id } = await params;

  await connectDB();

  const doctor = await Doctor.findById(id).select("-password");

  if (!doctor) {
    return <p>Doctor not found.</p>;
  }

  const slots = await Slot.find({ doctorId: id, status: "available" }).sort({ dateTime: 1 });

  return (
    <div>
      <h1>{doctor.name}</h1>
      <p>Specialty: {doctor.specialty}</p>
      <p>City: {doctor.city}</p>

      <h2>Available Slots</h2>
      {slots.length === 0 && <p>No available slots right now.</p>}

      <ul>
        {slots.map((slot) => (
          <li key={slot._id}>
            {new Date(slot.dateTime).toLocaleString()}
            <BookSlotButton slotId={slot._id.toString()} />
          </li>
        ))}
      </ul>
    </div>
  );
}