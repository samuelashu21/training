export default async function DashboardPage() {
  // This page is protected by middleware
  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard (logged in)</h1>
      <p>Only authenticated users can see this.</p>
    </main>
  );
} 