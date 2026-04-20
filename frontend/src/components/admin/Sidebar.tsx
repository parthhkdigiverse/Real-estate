import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Building2, MessageSquare, LogOut, Mail, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Building2, label: "Properties", href: "/admin/properties" },
  { icon: MessageSquare, label: "Inquiries", href: "/admin/inquiries" },
  { icon: Mail, label: "Newsletter", href: "/admin/newsletter" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate({ to: "/login" });
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r border-ink/5 bg-[#141416] p-4 text-white">
      <div className="mb-10 px-4 py-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-white">
          THE SANDRAS
          <span className="block text-[9px] tracking-[0.3em] text-rose font-sans font-bold uppercase">Administrator</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-1.5 px-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                isActive 
                  ? "bg-rose text-white shadow-lg shadow-rose/20" 
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive ? "text-white" : "text-white/30 group-hover:text-white")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/5 pt-6 px-2">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/30 transition-all hover:bg-rose/10 hover:text-rose cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
