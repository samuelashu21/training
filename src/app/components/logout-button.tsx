"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogout() {
    if (isLoading) return;
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) {
        setError("Logout failed. Please try again.");
        return;
      }

      router.replace("/login");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid justify-items-end gap-2">
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoading}
        className="rounded-md border border-red-600 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70 dark:hover:bg-red-950/40"
      >
        {isLoading ? "Logging out..." : "Logout"}
      </button>
      {error && <p className="text-right text-xs text-red-600">{error}</p>}
    </div>
  );
}
