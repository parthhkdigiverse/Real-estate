import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trash2, Mail, Phone, Calendar, User } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { API_BASE_URL } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/inquiries")({
  component: InquiriesPage,
});

function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/inquiries`);
      const data = await res.json();
      setInquiries(data);
    } catch (error) {
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you certain you wish to remove this registration?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/inquiries/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Lead archived");
        fetchInquiries();
      } else {
        toast.error("Action could not be completed.");
      }
    } catch (error) {
      toast.error("A network error occurred.");
    }
  };

  const columns = [
    {
      header: "Lead Profile",
      accessor: (item: any) => (
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-soft text-ink p-1 border border-ink/5 group-hover:bg-rose group-hover:text-white transition-all">
            <User className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-lg text-ink">{item.firstName} {item.surname}</div>
            <div className="text-[10px] font-bold text-ink/30 uppercase tracking-widest">{item.postcode || "No Postcode"}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Unit Interest",
      accessor: (item: any) => (
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-ink/80 uppercase tracking-widest leading-tight">
            {item.property || "General Inquiry"}
          </div>
          {item.apartment && (
            <div className="text-[9px] font-bold text-rose uppercase tracking-tighter">
              {item.apartment}
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Communications",
      accessor: (item: any) => (
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-xs text-ink/60 font-medium">
            <Mail className="h-3.5 w-3.5 text-rose opacity-50" />
            {item.email}
          </div>
          {item.telephone && (
            <div className="flex items-center gap-2.5 text-xs text-ink/60 font-medium">
              <Phone className="h-3.5 w-3.5 text-rose opacity-50" />
              {item.telephone}
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Registration Details",
      accessor: (item: any) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-bold text-ink/40 uppercase tracking-widest">
            <Calendar className="h-3 w-3" />
            {new Date(item.createdAt).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
          <div className="text-[9px] text-ink/20 font-medium px-5">Inquiry Channel: Web</div>
        </div>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      accessor: (item: any) => (
        <button 
          onClick={() => handleDelete(item.id || item._id)}
          className="rounded-xl p-3 text-ink/10 transition-all hover:bg-rose/10 hover:text-rose active:scale-90"
        >
          <Trash2 className="h-4.5 w-4.5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
      <div className="border-b border-ink/5 pb-8">
        <h2 className="font-display text-5xl text-ink">Inquiry Management</h2>
        <p className="mt-2 text-ink/40 font-medium uppercase tracking-widest text-[10px]">Tracking Interest & Engagement</p>
      </div>

      <AdminCard title="Recent Registrations" description="Portfolio Interest Feed" className="border-none shadow-xl">
        <DataTable data={inquiries} columns={columns} loading={loading} />
      </AdminCard>
    </div>
  );
}
