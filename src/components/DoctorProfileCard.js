"use client";

import { useState } from "react";

export default function DoctorProfileCard({ name, email, specialty, city }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const [currentSpecialty, setCurrentSpecialty] = useState(specialty);
  const [currentCity, setCurrentCity] = useState(city);
  const [error, setError] = useState("");

  function handleEditClick() {
    setError("");
    setIsEditing(true);
  }

  function handleCancel() {
    setCurrentName(name);
    setCurrentSpecialty(specialty);
    setCurrentCity(city);
    setError("");
    setIsEditing(false);
  }

  async function handleSave() {
    setError("");

    const res = await fetch("/api/doctor/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: currentName,
        specialty: currentSpecialty,
        city: currentCity,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setCurrentName(data.name);
    setCurrentSpecialty(data.specialty);
    setCurrentCity(data.city);
    setIsEditing(false);
  }

  return (
    <div>
      <p>Email: {email}</p>

      {isEditing ? (
        <>
          <input
            type="text"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
          />
          <input
            type="text"
            value={currentSpecialty}
            onChange={(e) => setCurrentSpecialty(e.target.value)}
          />
          <input
            type="text"
            value={currentCity}
            onChange={(e) => setCurrentCity(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <p>Name: {currentName}</p>
          <p>Specialty: {currentSpecialty}</p>
          <p>City: {currentCity}</p>
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}

      {error && <p>{error}</p>}
    </div>
  );
}