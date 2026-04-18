import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/admin/Sidebar";
import { useState } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const [isAuthenticated] = useState(true);

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-paper text-ink">
        <div className="text-center">
          <h1 className="font-display text-2xl">Access Denied</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-paper font-sans text-ink">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container-luxe py-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
