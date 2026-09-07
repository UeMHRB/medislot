import Link from "next/link";
import { SPECIALTIES } from "@/lib/constants";
import HomeSearchBar from "@/components/HomeSearchBar";

export default function HomePage() {
  return (
    <div>
      <h1>Find the Right Doctor, Right Away</h1>
      <p>Book appointments with trusted doctors near you.</p>

      <HomeSearchBar />

      <h2>Browse by Specialty</h2>
      <div>
        {SPECIALTIES.map((specialty) => (
          <Link key={specialty} href={`/search?specialty=${encodeURIComponent(specialty)}`}>
            <div>{specialty}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}