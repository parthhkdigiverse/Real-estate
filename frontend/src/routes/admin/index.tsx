import { createFileRoute } from "@tanstack/react-router";
import { AdminCard } from "@/components/admin/AdminCard";
import { 
  Building2, 
  MessageSquare, 
  TrendingUp, 
  ArrowUpRight, 
  Clock,
  User
} from "lucide-react";
import { 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis
} from "recharts";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/dashboard/stats`);
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <div className="text-ink/40 font-display text-xl animate-pulse">Initializing dashboard...</div>;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-end justify-between border-b border-ink/5 pb-6">
        <div>
          <h2 className="font-display text-5xl text-ink">Overview</h2>
          <p className="mt-2 text-ink/40 font-medium uppercase tracking-widest text-[10px]">Management & Analytics Dashboard</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-rose uppercase tracking-widest">Property Portfolio</p>
          <p className="font-display text-2xl text-ink">SURREY, UK</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AdminCard title="Portfolio Size">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-display text-ink">{stats?.totalProperties || 0}</span>
            <div className="rounded-xl bg-paper-soft p-3 text-ink/20">
              <Building2 className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-4 text-[10px] font-bold text-ink/30 uppercase tracking-widest">Active Listings</p>
        </AdminCard>

        <AdminCard title="Total Leads">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-display text-ink">{stats?.totalInquiries || 0}</span>
            <div className="rounded-xl bg-paper-soft p-3 text-ink/20">
              <MessageSquare className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-rose uppercase tracking-widest">
            <TrendingUp className="h-3 w-3" />
            <span>Growth +12%</span>
          </div>
        </AdminCard>

        <AdminCard title="Engagement">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-display text-ink">4.2%</span>
            <div className="rounded-xl bg-paper-soft p-3 text-ink/20">
              <ArrowUpRight className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-4 text-[10px] font-bold text-ink/30 uppercase tracking-widest">Conversion Rate</p>
        </AdminCard>

        <AdminCard title="Live Visitors">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-display text-ink">124</span>
            <div className="rounded-xl bg-paper-soft p-3 text-ink/20">
              <User className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-4 text-[10px] font-bold text-ink/30 uppercase tracking-widest">Real-time Traffic</p>
        </AdminCard>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Inquiry Trends Chart */}
        <AdminCard title="Inquiry Trends" className="lg:col-span-2 shadow-xl border-none">
          <div className="h-[300px] w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.trends || []}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.5 0.03 10)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="oklch(0.5 0.03 10)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#bbb" 
                  fontSize={9} 
                  tickFormatter={(str) => str.split('-').slice(1).join('/')}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis stroke="#bbb" fontSize={9} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #eee", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
                  itemStyle={{ color: "oklch(0.27 0.02 260)" }}
                  labelStyle={{ color: "oklch(0.5 0.03 10)", fontWeight: "bold", fontSize: "10px" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="oklch(0.5 0.03 10)" 
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                  strokeWidth={3}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </AdminCard>

        {/* Recent Activity */}
        <AdminCard title="Latest Inquiries" className="shadow-lg border-none">
          <div className="space-y-6 mt-4">
            {stats?.recentInquiries?.map((inquiry: any) => (
              <div key={inquiry._id} className="flex items-center gap-4 border-b border-ink/5 pb-4 last:border-0 last:pb-0 group">
                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-paper-soft text-ink/30 border border-ink/5 group-hover:bg-rose group-hover:text-white transition-all">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-semibold text-ink">{inquiry.firstName} {inquiry.surname}</p>
                  <div className="mt-0.5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-medium text-ink/30 uppercase">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                    </div>
                    {inquiry.property && (
                      <span className="text-[9px] font-bold text-rose uppercase tracking-tighter truncate max-w-[80px]">
                        {inquiry.apartment ? `${inquiry.property}: ${inquiry.apartment}` : inquiry.property}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {(!stats?.recentInquiries || stats.recentInquiries.length === 0) && (
              <div className="text-center py-20">
                <p className="text-xs text-ink/20 font-display italic">Peaceful days. No new leads.</p>
              </div>
            )}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
