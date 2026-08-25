import connectDB from "@/lib/db";
import Patient from "@/models/Patient";
import Doctor from "@/models/Doctor";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { role, name, email, password, specialty, city } = body;

    if (!role || !name || !email || !password) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (role === "doctor" && (!specialty || !city)) {
      return Response.json({ error: "Specialty and city are required for doctors" }, { status: 400 });
    }

    // cross-collection check — an email must not exist as BOTH a patient and a doctor
    const existingPatient = await Patient.findOne({ email });
    const existingDoctor = await Doctor.findOne({ email });

    if (existingPatient || existingDoctor) {
      return Response.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    let newUser;
    if (role === "doctor") {
      newUser = await Doctor.create({ name, email, password, specialty, city });
    } else {
      newUser = await Patient.create({ name, email, password });
    }

    return Response.json({
      message: "Account created",
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}