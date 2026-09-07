import connectDB from "@/lib/db";
import Doctor from "@/models/Doctor";
import Link from "next/link";
import SearchFilters from "@/components/SearchFilters";

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const specialty = params.specialty || "";
  const city = params.city || "";

  await connectDB();

  const query = {};
  if (specialty) query.specialty = specialty;
  if (city) query.city = city;

  const doctors = await Doctor.find(query).select("-password");

  return (
    <div>
      <h1>Find a Doctor</h1>

      <SearchFilters currentSpecialty={specialty} currentCity={city} />

      <p>{doctors.length} doctor(s) found</p>

      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id}>
            <Link href={`/doctors/${doctor._id}`}>
              {doctor.name} — {doctor.specialty} — {doctor.city}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}