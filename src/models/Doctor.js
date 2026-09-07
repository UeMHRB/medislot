import mongoose from "mongoose";
import bcrypt from "bcrypt"; 
import { SPECIALTIES, CITIES } from "@/lib/constants";

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true  },
    specialty: { type: String, required: true, enum: SPECIALTIES },
    city: { type: String, required: true , enum: CITIES},
  },
  { timestamps: true }
);

DoctorSchema.pre("save", async function () {
  if (!this.isModified("password")) return ;
  this.password = await bcrypt.hash(this.password, 10);
  
});

export default mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);