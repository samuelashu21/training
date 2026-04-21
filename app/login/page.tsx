"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Login failed");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Network error. Please try again.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
        <h1 className="mb-5 text-2xl font-semibold">Login</h1>
        <form onSubmit={onSubmit} className="grid gap-3">
        <input
          aria-label="Email"
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-black/15 bg-transparent px-3 py-2 outline-none ring-0 transition focus:border-blue-500 dark:border-white/20"
        />
        <input
          aria-label="Password"
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-black/15 bg-transparent px-3 py-2 outline-none ring-0 transition focus:border-blue-500 dark:border-white/20"
        />
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Login
          </button>
          <Link
            href="/register"
            className="rounded-md border border-blue-600 px-3 py-2 text-center font-medium text-blue-600 transition hover:bg-blue-50 dark:hover:bg-blue-950/40"
          >
            Register
          </Link>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </main>
  );
}