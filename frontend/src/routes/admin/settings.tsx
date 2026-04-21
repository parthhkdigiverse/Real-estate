import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save, Loader2, Phone, Mail, Instagram, Facebook, Linkedin, Video, MapPin } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { API_BASE_URL, getApiUrl } from "@/lib/api";
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
    linkedin: "",
    video_url: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch(getApiUrl("/api/settings/"));
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        if (data) setSettings(data);
      } catch (error) {
        console.error(`Settings load error from ${getApiUrl("/api/settings/")}:`, error);
        toast.error("Failed to load site settings");
      } finally {
        setLoading(false);
      }
    };
    loadSettings();

  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const token = localStorage.getItem("admin_token");
    try {
      const { _id, ...cleanSettings } = settings;
      console.log("Sending settings update:", cleanSettings);
      
      const res = await fetch(getApiUrl("/api/settings/"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(cleanSettings)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Save failed with status:", res.status, errorData);
        
        if (res.status === 401) {
          toast.error("Session expired. Please log in again.");
        } else if (res.status === 422) {
          const details = errorData.detail?.map((d: any) => `${d.loc[1]}: ${d.msg}`).join(", ");
          toast.error(`Validation Error: ${details || "Check all fields"}`);
        } else {
          toast.error(errorData.detail || "Failed to save settings. Please try again.");
        }
        return;
      }

      toast.success("Site configuration updated successfully");
      const updated = await res.json();
      setSettings(updated);
    } catch (error) {
      console.error("Network error during save:", error);
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
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-bold text-ink/40 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                Physical Address
              </label>
              <textarea 
                value={settings.address}
                onChange={(e) => setSettings({...settings, address: e.target.value})}
                rows={2}
                className="w-full bg-paper border border-ink/5 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-rose/30 transition-colors resize-none"
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

        <AdminCard title="Promotional Media" description="Manage the 'Watch the Film' promotional video link" className="border-none shadow-xl">
          <div className="grid grid-cols-1 gap-8 p-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-ink/40 uppercase tracking-widest flex items-center gap-2">
                <Video className="h-3 w-3" />
                Watch the Film URL (YouTube/Vimeo)
              </label>
              <input 
                type="text" 
                value={settings.video_url}
                onChange={(e) => setSettings({...settings, video_url: e.target.value})}
                className="w-full bg-paper border border-ink/5 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-rose/30 transition-colors"
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <p className="text-[9px] text-ink/30 italic">This link will be used for the "Watch the Film" button on the home page hero section.</p>
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
