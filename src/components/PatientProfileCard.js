"use client";

import { useState } from "react";

export default function PatientProfileCard({ name, email }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const [error, setError] = useState("");

  async function handleSave() {
    setError("");

    const res = await fetch("/api/patient/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: currentName }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setCurrentName(data.name);
    setIsEditing(false);
  }

  function handleCancel() {
  setCurrentName(name);
  setError("");
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
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <p>Name: {currentName}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      {error && <p>{error}</p>}
    </div>
  );
}