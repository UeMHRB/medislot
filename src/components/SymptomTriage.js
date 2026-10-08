"use client";

import { useState } from "react";
import Link from "next/link";

const MAX_LENGTH = 500;

export default function SymptomTriage() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setResult(data);
    } catch {
      setError("Something went wrong. Please search manually.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Not sure which doctor to see?</h2>
      <p>Describe your symptoms and we will suggest a specialty to search for.</p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          maxLength={MAX_LENGTH}
          placeholder="For example: itchy skin rash for a week"
          required
        />
        <p>{symptoms.length}/{MAX_LENGTH}</p>
        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Suggest a specialty"}
        </button>
      </form>

      {error && <p>{error}</p>}

      {result && (
        <div>
          {result.urgent && (
            <p>
              These symptoms may need urgent medical attention. Please contact
              emergency services or go to the nearest emergency room instead of
              booking an appointment.
            </p>
          )}
          <p>Suggested specialty: {result.specialty}</p>
          <p>{result.reason}</p>
          <Link href={`/search?specialty=${encodeURIComponent(result.specialty)}`}>
            Find {result.specialty}s
          </Link>
          <p>This is a routing suggestion only, not a medical diagnosis.</p>
        </div>
      )}
    </div>
  );
}