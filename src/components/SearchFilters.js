"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SPECIALTIES, CITIES } from "@/lib/constants";

export default function SearchFilters({ currentSpecialty, currentCity }) {
  const router = useRouter();
  const [specialty, setSpecialty] = useState(currentSpecialty);
  const [city, setCity] = useState(currentCity);

  function handleFilter(e) {
    e.preventDefault();

    const params = new URLSearchParams();
    if (specialty) params.set("specialty", specialty);
    if (city) params.set("city", city);

    router.push(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={handleFilter}>
      <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
        <option value="">Any specialty</option>
        {SPECIALTIES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Any city</option>
        {CITIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <button type="submit">Update Search</button>
    </form>
  );
}