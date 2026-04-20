import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Image as ImageIcon, Copy, Check, Upload, Loader2, Search, Trash2 } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { fetchAssets, uploadAsset, API_BASE_URL } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/assets")({
  component: AssetsPage,
});

function AssetsPage() {
  const [assets, setAssets] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copying, setCopying] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadAssets = async () => {
    try {
      const data = await fetchAssets();
      setAssets(data);
    } catch (error) {
      toast.error("Failed to load assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopying(path);
    toast.success("Path copied to clipboard");
    setTimeout(() => setCopying(null), 2000);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadAsset(file);
      toast.success("Image uploaded successfully");
      loadAssets();
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const filteredAssets = assets.filter(path => 
    path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-ink/5 pb-8">
        <div>
          <h2 className="font-display text-5xl text-ink">Media Library</h2>
          <p className="mt-2 text-ink/40 font-medium uppercase tracking-widest text-[10px]">Manage all property and apartment images</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/20" />
            <input 
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl border border-ink/10 bg-white pl-10 pr-4 py-3 text-sm text-ink focus:border-rose focus:ring-1 focus:ring-rose/20 outline-none transition-all placeholder:text-ink/20 w-full sm:w-64"
            />
          </div>
          
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            className="hidden"
            accept="image/*"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center justify-center gap-3 rounded-xl bg-ink px-8 py-4 text-xs font-bold text-white shadow-xl shadow-ink/20 transition-all hover:scale-[1.03] active:scale-95 disabled:opacity-50"
          >
            {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
            Upload Media
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="h-12 w-12 text-rose animate-spin opacity-20" />
          <p className="text-[10px] font-bold text-ink/20 uppercase tracking-widest">Accessing assets vault...</p>
        </div>
      ) : filteredAssets.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAssets.map((path) => (
            <div key={path} className="group relative overflow-hidden rounded-2xl border border-ink/5 bg-white transition-all hover:shadow-2xl hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden bg-paper-soft">
                <img 
                  src={path} 
                  alt="Asset" 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-ink/60 opacity-0 transition-opacity group-hover:opacity-100 flex flex-col items-center justify-center gap-3 p-4 backdrop-blur-sm">
                <button 
                  onClick={() => handleCopy(path)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 py-3 px-4 text-[10px] font-bold text-white uppercase tracking-widest border border-white/20 transition-all"
                >
                  {copying === path ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copying === path ? "Copied" : "Copy Path"}
                </button>
                <div className="text-white/40 text-[8px] uppercase tracking-tighter truncate w-full text-center">
                  {path.split('/').pop()}
                </div>
              </div>
              <div className="p-3 bg-white">
                <div className="truncate text-[10px] font-bold text-ink/40 uppercase tracking-tight">
                  {path.split('/').pop()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 rounded-3xl border-2 border-dashed border-ink/5 bg-paper-soft/30">
          <ImageIcon className="h-16 w-16 text-ink/10 mb-4" />
          <p className="text-sm font-medium text-ink/40 italic">No assets found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
