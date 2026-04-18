import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { Sidebar } from "@/components/admin/Sidebar";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setIsAuthenticated(false);
      navigate({ to: "/login" });
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    return null; // Redirection handled in useEffect
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
