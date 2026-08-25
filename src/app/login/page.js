"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      role,
      redirect: false,
    });

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push(role === "doctor" ? "/doctor/dashboard" : "/patient/dashboard");
  }

  return (
    
    <div>
      <h1>Log In</h1>

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
        <button type="submit">Log In as {role}</button>
      </form>

      {error && <p>{error}</p>}
    </div>

  );
}