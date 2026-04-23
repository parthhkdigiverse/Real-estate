import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trash2, Mail, Calendar, Download } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { API_BASE_URL, getApiUrl } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/newsletter")({
  component: NewsletterPage,
});

function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch(getApiUrl("/api/inquiries/"));
      const data = await res.json();
      // Filter for newsletter signups specifically
      const filtered = data.filter((item: any) => item.property === "Newsletter Signup");
      setSubscribers(filtered);
    } catch (error) {
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you certain you wish to remove this subscriber?")) return;

    try {
      const res = await fetch(getApiUrl(`/api/inquiries/${id}`), {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Subscriber removed");
        fetchSubscribers();
      } else {
        toast.error("Action could not be completed.");
      }
    } catch (error) {
      toast.error("A network error occurred.");
    }
  };

  const exportCSV = () => {
    const headers = ["Email", "Signup Date"];
    const rows = subscribers.map(s => [
      s.email,
      new Date(s.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      header: "Subscriber Details",
      accessor: (item: any) => (
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-soft text-ink p-1 border border-ink/5 group-hover:bg-gold group-hover:text-white transition-all">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-lg text-ink">{item.email}</div>
            <div className="text-[10px] font-bold text-ink/30 uppercase tracking-widest leading-tight">Newsletter Inner Circle</div>
          </div>
        </div>
      ),
    },
    {
      header: "Acquisition Channel",
      accessor: (item: any) => (
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-ink/80 uppercase tracking-widest leading-tight">
            Digital Footer Opt-in
          </div>
          <div className="text-[9px] font-bold text-gold uppercase tracking-tighter">
            Direct Lead
          </div>
        </div>
      ),
    },
    {
      header: "Subscription Date",
      accessor: (item: any) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-bold text-ink/40 uppercase tracking-widest">
            <Calendar className="h-3 w-3" />
            {new Date(item.createdAt).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
          <div className="text-[9px] text-ink/20 font-medium px-5">Status: Active</div>
        </div>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      accessor: (item: any) => (
        <button 
          onClick={() => handleDelete(item.id || item._id)}
          className="rounded-xl p-3 text-ink/10 transition-all hover:bg-gold/10 hover:text-gold active:scale-90"
        >
          <Trash2 className="h-4.5 w-4.5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
      <div className="border-b border-ink/5 pb-8 flex justify-between items-end">
        <div>
          <h2 className="font-display text-5xl text-ink">Newsletter Loop</h2>
          <p className="mt-2 text-ink/40 font-medium uppercase tracking-widest text-[10px]">The Inner Circle Registry</p>
        </div>
        <button 
          onClick={exportCSV}
          className="flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-gold transition-all group"
        >
          <Download className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
          Export Subscriber List
        </button>
      </div>

      <AdminCard title="Subscriber Feed" description="Marketing & Engagement List" className="border-none shadow-xl">
        <DataTable data={subscribers} columns={columns} loading={loading} />
      </AdminCard>
    </div>
  );
}
