"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LogoutButton from "../components/logout-button";

type MeResponse = {
  user: {
    email: string;
    role: "user" | "admin";
  } | null;
};

export default function ProfilePage() {
  const [user, setUser] = useState<MeResponse["user"]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadMe() {
      setError(null);

      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
        const data = (await res.json()) as MeResponse;

        if (!cancelled) {
          setUser(data.user ?? null);
        }
      } catch {
        if (!cancelled) {
          setError("Could not load profile details.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadMe();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <section className="w-full max-w-xl rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-1 text-sm text-black/60 dark:text-white/60">
              Data fetched from <code>/api/auth/me</code>.
            </p>
          </div>
          <LogoutButton />
        </div>

        {isLoading && <p className="text-sm text-black/70 dark:text-white/70">Loading profile...</p>}
        {!isLoading && error && <p className="text-sm text-red-600">{error}</p>}
        {!isLoading && !error && !user && (
          <p className="text-sm text-black/70 dark:text-white/70">No user found. Please login again.</p>
        )}
        {!isLoading && !error && user && (
          <div className="grid gap-2 text-sm text-black/70 dark:text-white/70">
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Role:</span> {user.role}
            </p>
          </div>
        )}

        <Link
          href="/dashboard"
          className="mt-5 inline-block rounded-md border border-blue-600 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:hover:bg-blue-950/40"
        >
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
