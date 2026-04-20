import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { PropertyEditor } from "@/components/admin/PropertyEditor";
import { API_BASE_URL, getApiUrl } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/properties")({
  component: PropertiesPage,
});

function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);

  const fetchProperties = async () => {
    try {
      const res = await fetch(getApiUrl("/api/properties/"));
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSave = async (formData: any) => {
    console.log("Submitting property change...", formData);
    
    const token = localStorage.getItem("admin_token");
    if (!token) {
      toast.error("Session expired. Please log in again.");
      window.location.href = "/login";
      return;
    }

    try {
      const url = editingProperty 
        ? getApiUrl(`/api/properties/${editingProperty.id || editingProperty._id}`)
        : getApiUrl("/api/properties/");
      
      const method = editingProperty ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingProperty ? "Property updated successfully" : "Property created successfully");
        setIsEditorOpen(false);
        setEditingProperty(null);
        fetchProperties();
      } else {
        const errorData = await res.json();
        console.error("Save failed:", errorData);
        toast.error(`Save failed: ${errorData.detail || "Please check your data"}`);
      }
    } catch (error) {
      console.error("Network error during save:", error);
      toast.error("Network error. Please try again.");
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you certain you wish to remove this property?")) return;

    try {
      const res = await fetch(getApiUrl(`/api/properties/${id}`), {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Listing removed");
        fetchProperties();
      } else {
        toast.error("Could not remove property");
      }
    } catch (error) {
      toast.error("Action failed");
    }
  };

  const openEditor = (property: any = null) => {
    setEditingProperty(property);
    setIsEditorOpen(true);
  };

  const columns = [
    {
      header: "Property Details",
      accessor: (item: any) => (
        <div className="flex items-center gap-4">
          <div className="h-12 w-16 overflow-hidden rounded-xl border border-ink/5 bg-paper-soft shadow-sm">
            {item.hero && <img src={item.hero} alt={item.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" />}
          </div>
          <div>
            <div className="font-display text-lg text-ink">{item.name}</div>
            <div className="text-[10px] font-bold text-ink/30 uppercase tracking-[0.2em]">{item.slug}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Portfolio Details",
      accessor: (item: any) => (
        <div className="space-y-1">
          <span className="inline-flex rounded-lg bg-paper-soft px-3 py-1 text-[10px] font-bold text-ink uppercase tracking-wider">
            {item.apartments?.length || 0} Units
          </span>
          <div className="text-[9px] text-ink/40 font-medium px-1">Managed Assets</div>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: () => (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
          <span className="text-[10px] font-bold text-ink uppercase tracking-widest">Live</span>
        </div>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      accessor: (item: any) => (
        <div className="flex justify-end gap-2 pr-2">
          <button 
            onClick={() => openEditor(item)}
            className="rounded-xl p-2.5 text-ink/20 transition-all hover:bg-paper-soft hover:text-ink active:scale-90"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button 
            onClick={(e) => handleDelete(item.id || item._id, e)}
            className="rounded-xl p-2.5 text-ink/20 transition-all hover:bg-rose/10 hover:text-rose active:scale-90"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-ink/5 pb-8">
        <div>
          <h2 className="font-display text-5xl text-ink">Property Portfolio</h2>
          <p className="mt-2 text-ink/40 font-medium uppercase tracking-widest text-[10px]">Curating Excellence in Surrey</p>
        </div>
        <button
          onClick={() => openEditor()}
          className="flex items-center justify-center gap-3 rounded-xl bg-ink px-8 py-4 text-xs font-bold text-white shadow-xl shadow-ink/20 transition-all hover:scale-[1.03] active:scale-95"
        >
          <Plus className="h-5 w-5" />
          List New Asset
        </button>
      </div>

      <AdminCard title="Investment Assets" description="Inventory of unique residences" className="border-none shadow-xl">
        <DataTable 
          data={properties} 
          columns={columns} 
          loading={loading}
          onRowClick={(item) => openEditor(item)}
        />
      </AdminCard>

      {isEditorOpen && (
        <PropertyEditor 
          initialData={editingProperty}
          onSave={handleSave}
          onCancel={() => setIsEditorOpen(false)}
        />
      )}
    </div>
  );
}
