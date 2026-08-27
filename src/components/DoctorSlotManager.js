"use client";

import { useState, useEffect } from "react";

export default function DoctorSlotManager() {
  const [slots, setSlots] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSlots();
  }, []);

  async function fetchSlots() {
    const res = await fetch("/api/doctor/slots");
    const data = await res.json();
    setSlots(data);
  }

  async function handleAddSlot(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/doctor/slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dateTime }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setDateTime("");
    fetchSlots();
  }

  async function handleDeleteSlot(slotId) {
    setError("");

    const res = await fetch(`/api/doctor/slots?id=${slotId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    fetchSlots();
  }

  return (
    <div>
      <h2>My Slots</h2>

      <form onSubmit={handleAddSlot}>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
        />
        <button type="submit">Add Slot</button>
      </form>

      {error && <p>{error}</p>}

      <ul>
        {slots.map((slot) => (
          <li key={slot._id}>
            {new Date(slot.dateTime).toLocaleString()} — {slot.status}
            {slot.status === "available" && (
              <button onClick={() => handleDeleteSlot(slot._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}