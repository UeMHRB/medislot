"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SPECIALTIES, CITIES } from "@/lib/constants";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, name, email, password, specialty, city }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    router.push("/login");
  }

  return (
    <div>
      <h1>Sign Up</h1>

      <div>
        <button type="button" onClick={() => setRole("patient")}>
          Patient
        </button>
        <button type="button" onClick={() => setRole("doctor")}>
          Doctor
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {role === "doctor" && (
          <>
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} required>
              <option value="">Select specialty</option>
              {SPECIALTIES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select value={city} onChange={(e) => setCity(e.target.value)} required>
              <option value="">Select city</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </>
        )}

        <button type="submit">Sign Up as {role}</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}