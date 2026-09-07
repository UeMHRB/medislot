"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function BookSlotButton({ slotId }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleBook() {
    if (!session) {
      router.push("/login");
      return;
    }

    if (session.user.role !== "patient") {
      setError("Only patients can book appointments");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotId }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
      return;
    }

    router.push("/patient/dashboard");
  }

  return (
    <div>
      <button onClick={handleBook} disabled={loading}>
        {loading ? "Booking..." : "Book"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}