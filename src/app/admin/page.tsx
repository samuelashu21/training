export default async function AdminPage() {
  // This page is protected by middleware + role check
  return (
    <main style={{ padding: 24 }}>
      <h1>Admin</h1>
      <p>Only admins can see this.</p>
    </main>
  );
} 