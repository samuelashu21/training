import LogoutButton from "../components/logout-button";

export default async function AdminPage() {
  // This page is protected by middleware + role check
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <section className="w-full max-w-xl rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-black/60 dark:text-white/60">
              Administrator access granted.
            </p>
          </div>
          <LogoutButton />
        </div>
        <p className="text-sm text-black/70 dark:text-white/70">
          Only admins can see this.
        </p>
      </section>
    </main>
  );
}