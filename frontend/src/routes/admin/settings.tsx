import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save, Loader2, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { API_BASE_URL } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [settings, setSettings] = useState<any>({
    phone: "",
    email: "",
    address: "",
    instagram: "",
    facebook: "",
    linkedin: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/settings`);
        const data = await res.json();
        setSettings(data);
      } catch (error) {
        toast.error("Failed to load site settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${API_BASE_URL}/api/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      if (res.status === 401) {
        toast.error("Session expired. Please log in again.");
        return;
      }

      if (res.ok) {
        toast.success("Site configuration updated successfully");
      } else {
        toast.error("Failed to save settings. Please try again.");
      }
    } catch (error) {
      toast.error("Network error while saving settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-rose" />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
      <div className="border-b border-ink/5 pb-8 flex justify-between items-end">
        <div>
          <h2 className="font-display text-5xl text-ink">Site Configuration</h2>
          <p className="mt-2 text-ink/40 font-medium uppercase tracking-widest text-[10px]">Managing Global Contact & Digital Identity</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="max-w-4xl space-y-8">
        <AdminCard title="Primary Contact Details" description="Information displayed in footers and contact pages" className="border-none shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-ink/40 uppercase tracking-widest flex items-center gap-2">
                <Phone className="h-3 w-3" />
                Phone Number
              </label>
              <input 
                type="text" 
                value={settings.phone}
                onChange={(e) => setSettings({...settings, phone: e.target.value})}
                className="w-full bg-paper border border-ink/5 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-rose/30 transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-ink/40 uppercase tracking-widest flex items-center gap-2">
                <Mail className="h-3 w-3" />
                Email Address
              </label>
              <input 
                type="email" 
                value={settings.email}
                onChange={(e) => setSettings({...settings, email: e.target.value})}
                className="w-full bg-paper border border-ink/5 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-rose/30 transition-colors"
                required
              />
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Digital & Social Presence" description="Links to external profiles and social platforms" className="border-none shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-60 uppercase tracking-widest flex items-center gap-2">
                <Instagram className="h-3 w-3" />
                Instagram URL
              </label>
              <input 
                type="text" 
                value={settings.instagram}
                onChange={(e) => setSettings({...settings, instagram: e.target.value})}
                className="w-full bg-paper border border-ink/5 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-rose/30 transition-colors px-4 py-3"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-ink/40 uppercase tracking-widest flex items-center gap-2">
                <Facebook className="h-3 w-3" />
                Facebook URL
              </label>
              <input 
                type="text" 
                value={settings.facebook}
                onChange={(e) => setSettings({...settings, facebook: e.target.value})}
                className="w-full bg-paper border border-ink/5 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-rose/30 transition-colors px-4 py-3"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-ink/40 uppercase tracking-widest flex items-center gap-2">
                <Linkedin className="h-3 w-3" />
                LinkedIn URL
              </label>
              <input 
                type="text" 
                value={settings.linkedin}
                onChange={(e) => setSettings({...settings, linkedin: e.target.value})}
                className="w-full bg-paper border border-ink/5 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-rose/30 transition-colors px-4 py-3"
                placeholder="https://linkedin.com/..."
              />
            </div>
          </div>
        </AdminCard>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            disabled={saving}
            className="flex items-center gap-3 px-8 py-4 bg-ink text-white rounded-2xl text-xs uppercase tracking-[0.2em] font-bold hover:bg-rose transition-all shadow-xl shadow-ink/10 active:scale-95 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Save className="h-5 w-5" />
            )}
            {saving ? "Publishing Changes..." : "Save Configuration"}
          </button>
        </div>
      </form>
    </div>
  );
}
