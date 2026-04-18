import { useState, useEffect } from "react";
import { fetchAssets } from "@/lib/api";
import { X, Check, Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssetPickerProps {
  onSelect: (assetPath: string) => void;
  onClose: () => void;
  currentValue?: string;
}

export function AssetPicker({ onSelect, onClose, currentValue }: AssetPickerProps) {
  const [assets, setAssets] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const data = await fetchAssets();
        setAssets(data);
      } catch (err) {
        setError("Failed to load images from server");
      } finally {
        setLoading(false);
      }
    };
    loadAssets();
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-paper rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between border-b border-ink/5 p-6 bg-paper-soft">
          <div className="flex items-center gap-3">
            <ImageIcon className="h-5 w-5 text-rose" />
            <h3 className="font-display text-xl text-ink">Select Asset</h3>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full p-2 text-ink/20 hover:bg-ink/5 hover:text-ink transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-8 w-8 text-rose animate-spin" />
              <p className="text-xs text-ink/40 font-medium uppercase tracking-widest">Scanning Portfolio Assets...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-rose text-sm font-medium">{error}</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {assets.map((asset) => {
                const isSelected = currentValue === asset;
                return (
                  <button
                    key={asset}
                    type="button"
                    onClick={() => {
                      onSelect(asset);
                      onClose();
                    }}
                    className={cn(
                      "group relative aspect-video overflow-hidden rounded-xl border-2 transition-all hover:scale-[1.02] active:scale-95",
                      isSelected ? "border-rose shadow-lg" : "border-transparent hover:border-rose/30"
                    )}
                  >
                    <img 
                      src={asset} 
                      alt={asset} 
                      className={cn(
                        "h-full w-full object-cover transition-opacity",
                        isSelected ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                      )} 
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-ink/80 p-2 backdrop-blur-sm transition-transform translate-y-full group-hover:translate-y-0">
                      <p className="truncate text-[10px] text-paper-soft font-medium">{asset.split('/').pop()}</p>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 rounded-full bg-rose p-1 text-white shadow-lg">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-paper-soft border-t border-ink/5 p-4 flex justify-between items-center">
          <p className="text-[10px] text-ink/40 font-medium uppercase tracking-widest">
            {assets.length} Images Found
          </p>
          <button
            onClick={onClose}
            className="text-xs font-bold text-ink uppercase tracking-wider hover:text-rose transition-colors"
          >
            Close Gallery
          </button>
        </div>
      </div>
    </div>
  );
}
