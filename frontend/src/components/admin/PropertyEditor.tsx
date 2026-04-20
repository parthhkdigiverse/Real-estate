import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, Save, X, Image as ImageIcon, Loader2, Upload, ChevronDown, ChevronUp, MapPin, Layout, AlertCircle } from "lucide-react";
import { AdminCard } from "./AdminCard";
import { useState, useRef } from "react";
import { uploadAsset } from "@/lib/api";
import { toast } from "sonner";

const dimensionSchema = z.object({
  room: z.string().nullable().optional().default(""),
  metric: z.string().nullable().optional().default(""),
  imperial: z.string().nullable().optional().default(""),
});

const apartmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().nullable().optional().default("Apartment"),
  size: z.string().nullable().optional().default(""),
  price: z.string().nullable().optional().default("On request"),
  slug: z.string().nullable().optional().default(""),
  hero_image: z.string().nullable().optional().default(""),
  floorplan_image: z.string().nullable().optional().default(""),
  location_map_image: z.string().nullable().optional().default(""),
  dimensions: z.array(dimensionSchema).nullable().optional().default([]),
});

const propertySchema = z.object({
  name: z.string().min(1, "Property name is required"),
  hero: z.string().nullable().optional().default(""),
  intro: z.string().nullable().optional().default(""),
  showApartmentNote: z.string().nullable().optional().default(""),
  hours: z.string().nullable().optional().default(""),
  apartments: z.array(apartmentSchema).nullable().optional().default([]),
  slug: z.string().min(1, "Property slug is required"),
  tag: z.string().nullable().optional().default("For Sale"),
  date: z.string().nullable().optional(),
  featured_image: z.string().nullable().optional().default(""),
  is_featured: z.boolean().nullable().optional().default(false),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

interface PropertyEditorProps {
  initialData?: any;
  onSave: (data: PropertyFormValues) => void;
  onCancel: () => void;
}

function DimensionsEditor({ nestIndex, control, register }: { nestIndex: number, control: any, register: any }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `apartments.${nestIndex}.dimensions`
  });

  return (
    <div className="mt-6 border-t border-ink/5 pt-6">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Room Dimensions</h5>
        <button
          type="button"
          onClick={() => append({ room: "", metric: "", imperial: "" })}
          className="flex items-center gap-1.5 text-[10px] font-bold text-rose uppercase tracking-widest hover:text-ink transition-colors"
        >
          <Plus className="h-3 w-3" />
          Add Room
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-1 gap-3 rounded-lg bg-paper-soft/50 p-3 md:grid-cols-4">
            <div className="space-y-1">
              <span className="text-[8px] font-bold text-ink/30 uppercase tracking-tighter">Room</span>
              <input
                {...register(`apartments.${nestIndex}.dimensions.${index}.room`)}
                className="w-full bg-transparent text-xs text-ink focus:outline-none"
                placeholder="Bedroom 1"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[8px] font-bold text-ink/30 uppercase tracking-tighter">Metric</span>
              <input
                {...register(`apartments.${nestIndex}.dimensions.${index}.metric`)}
                className="w-full bg-transparent text-xs text-ink focus:outline-none"
                placeholder="4.5m x 3.2m"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[8px] font-bold text-ink/30 uppercase tracking-tighter">Imperial</span>
              <input
                {...register(`apartments.${nestIndex}.dimensions.${index}.imperial`)}
                className="w-full bg-transparent text-xs text-ink focus:outline-none"
                placeholder={'14\'9" x 10\'6"'}
              />
            </div>
            <div className="flex items-end justify-end pb-1">
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-ink/20 hover:text-rose transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
        {fields.length === 0 && (
          <p className="py-4 text-center text-[10px] italic text-ink/20 uppercase tracking-widest">No dimensions added yet</p>
        )}
      </div>
    </div>
  );
}

export function PropertyEditor({ initialData, onSave: initialOnSave, onCancel }: PropertyEditorProps) {
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});
  const [expandedApartment, setExpandedApartment] = useState<number | null>(null);
  
  const heroInputRef = useRef<HTMLInputElement>(null);
  const featuredInputRef = useRef<HTMLInputElement>(null);
  const apartmentImageRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      hero: initialData?.hero || "",
      featured_image: initialData?.featured_image || "",
      tag: initialData?.tag || "For Sale",
      date: initialData?.date || "",
      is_featured: initialData?.is_featured || false,
      intro: initialData?.intro || "",
      showApartmentNote: initialData?.showApartmentNote || "Apartments from \u00a3XXX",
      hours: initialData?.hours || "Daily, 10am \u2014 5pm",
      apartments: (initialData?.apartments || []).map((apt: any) => ({
        ...apt,
        type: apt.type || "",
        size: apt.size || "",
        price: apt.price || "",
        slug: apt.slug || "",
        hero_image: apt.hero_image || "",
        floorplan_image: apt.floorplan_image || "",
        location_map_image: apt.location_map_image || "",
        dimensions: (apt.dimensions || []).map((dim: any) => ({
          room: dim.room || "",
          metric: dim.metric || "",
          imperial: dim.imperial || ""
        }))
      })),
    },
  });

  const onSave = (data: any) => {
    const validatedData = {
      ...data,
      apartments: data.apartments.map((apt: any) => ({
        ...apt,
        slug: apt.slug || apt.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `unit-${Math.random().toString(36).slice(2, 5)}`
      }))
    };
    initialOnSave(validatedData);
  };

  const onErrors = (err: any) => {
    console.error("Form Validation Failed:", err);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "apartments",
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldPath: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(prev => ({ ...prev, [fieldPath]: true }));
    try {
      const result = await uploadAsset(file);
      setValue(fieldPath as any, result.path);
    } catch (err) {
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(prev => ({ ...prev, [fieldPath]: false }));
    }
  };

  const heroUrl = watch("hero");
  const featuredUrl = watch("featured_image");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-md">
      <AdminCard 
        title={initialData ? "Edit Property" : "Add New Property"} 
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto border-ink/10 shadow-2xl"
      >
        <form onSubmit={handleSubmit(onSave, onErrors)} className="space-y-8">
          {Object.keys(errors).length > 0 && (
            <div className="flex flex-col gap-3 rounded-xl bg-rose/5 p-5 text-rose border border-rose/10 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-xs font-bold uppercase tracking-widest">
                  Validation Error
                </p>
              </div>
              <ul className="space-y-1 pl-8 list-disc">
                {Object.entries(errors).map(([key, error]: [string, any]) => (
                  <li key={key} className="text-[10px] font-medium uppercase tracking-tight opacity-80">
                    <span className="font-bold">{key.replace('_', ' ')}</span>: {error?.message || "Check nested details"}
                    
                    {/* Diagnostic detail for apartments */}
                    {key === 'apartments' && Array.isArray(error) && (
                      <ul className="mt-1 space-y-1 pl-4 border-l border-rose/20">
                        {error.map((err, idx) => err && (
                          <li key={idx} className="text-[9px] text-rose/70">
                            Unit {idx + 1}: {watch(`apartments.${idx}.name`) || "Untitled"} 
                            (Please check dimensions or required fields)
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-[10px] font-bold text-ink/40 uppercase tracking-widest">Property Name</label>
              <input
                {...register("name")}
                className="w-full rounded-xl border border-ink/10 bg-paper-soft px-4 py-3 text-ink focus:border-rose focus:ring-1 focus:ring-rose/20 focus:outline-none transition-all placeholder:text-ink/20"
                placeholder="The Sandras"
              />
              {errors.name && <p className="mt-1 text-xs text-rose">{errors.name.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold text-ink/40 uppercase tracking-widest">Slug (URL path)</label>
              <input
                {...register("slug")}
                className="w-full rounded-xl border border-ink/10 bg-paper-soft px-4 py-3 text-ink focus:border-rose focus:ring-1 focus:ring-rose/20 focus:outline-none transition-all placeholder:text-ink/20"
                placeholder="the-sandras"
              />
              {errors.slug && <p className="mt-1 text-xs text-rose">{errors.slug.message}</p>}
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-[10px] font-bold text-ink/40 uppercase tracking-widest">Main Hero Image</label>
                <input 
                  type="file" 
                  ref={heroInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => handleFileUpload(e, "hero")} 
                />
                <button
                  type="button"
                  onClick={() => heroInputRef.current?.click()}
                  disabled={uploading["hero"]}
                  className="group relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-dashed border-ink/10 bg-paper-soft transition-all hover:border-rose/40 disabled:opacity-50"
                >
                  {heroUrl ? (
                    <>
                      <img src={heroUrl} alt="Hero" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-3 p-4 text-center">
                      <div className="rounded-full bg-ink/5 p-4 transition-colors group-hover:bg-rose/5">
                        <ImageIcon className="h-6 w-6 text-ink/20 group-hover:text-rose/40" />
                      </div>
                      <span className="text-[10px] font-bold text-ink/30 uppercase tracking-widest group-hover:text-ink">Click to Browse System</span>
                    </div>
                  )}
                  {uploading["hero"] && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-paper/80 backdrop-blur-sm">
                      <Loader2 className="h-8 w-8 text-rose animate-spin mb-2" />
                      <span className="text-[10px] font-bold text-rose uppercase tracking-widest">Uploading...</span>
                    </div>
                  )}
                </button>
                {errors.hero && <p className="mt-1 text-xs text-rose">{errors.hero.message}</p>}
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-bold text-ink/40 uppercase tracking-widest">Featured Card Image</label>
                <input 
                  type="file" 
                  ref={featuredInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => handleFileUpload(e, "featured_image")} 
                />
                <button
                  type="button"
                  onClick={() => featuredInputRef.current?.click()}
                  disabled={uploading["featured_image"]}
                  className="group relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-dashed border-ink/10 bg-paper-soft transition-all hover:border-rose/40 disabled:opacity-50"
                >
                  {featuredUrl ? (
                    <>
                      <img src={featuredUrl} alt="Featured" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-3 p-4 text-center">
                      <div className="rounded-full bg-ink/5 p-4 transition-colors group-hover:bg-rose/5">
                        <ImageIcon className="h-6 w-6 text-ink/20 group-hover:text-rose/40" />
                      </div>
                      <span className="text-[10px] font-bold text-ink/30 uppercase tracking-widest group-hover:text-ink">Click to Browse System</span>
                    </div>
                  )}
                  {uploading["featured_image"] && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-paper/80 backdrop-blur-sm">
                      <Loader2 className="h-8 w-8 text-rose animate-spin mb-2" />
                      <span className="text-[10px] font-bold text-rose uppercase tracking-widest">Uploading...</span>
                    </div>
                  )}
                </button>
              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="mb-2 block text-[10px] font-bold text-ink/40 uppercase tracking-widest">Property Tag</label>
                <input
                  {...register("tag")}
                  className="w-full rounded-xl border border-ink/10 bg-paper-soft px-4 py-3 text-ink focus:border-rose focus:ring-1 focus:ring-rose/20 focus:outline-none transition-all placeholder:text-ink/20"
                  placeholder="For Sale"
                />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-bold text-ink/40 uppercase tracking-widest">Availability Date</label>
                <input
                  {...register("date")}
                  className="w-full rounded-xl border border-ink/10 bg-paper-soft px-4 py-3 text-ink focus:border-rose focus:ring-1 focus:ring-rose/20 focus:outline-none transition-all placeholder:text-ink/20"
                  placeholder="18 November 2024"
                />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      {...register("is_featured")}
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-ink/10 transition-colors peer-checked:bg-rose group-hover:bg-ink/20"></div>
                    <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5"></div>
                  </div>
                  <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest group-hover:text-ink transition-colors">Featured</span>
                </label>
              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="mb-2 block text-[10px] font-bold text-ink/40 uppercase tracking-widest">Show Apartment Note</label>
                <input
                  {...register("showApartmentNote")}
                  className="w-full rounded-xl border border-ink/10 bg-paper-soft px-4 py-3 text-ink focus:border-rose focus:ring-1 focus:ring-rose/20 focus:outline-none transition-all placeholder:text-ink/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-bold text-ink/40 uppercase tracking-widest">Sales Hours</label>
                <input
                  {...register("hours")}
                  className="w-full rounded-xl border border-ink/10 bg-paper-soft px-4 py-3 text-ink focus:border-rose focus:ring-1 focus:ring-rose/20 focus:outline-none transition-all placeholder:text-ink/20"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-[10px] font-bold text-ink/40 uppercase tracking-widest">Introduction</label>
              <textarea
                {...register("intro")}
                rows={3}
                className="w-full rounded-xl border border-ink/10 bg-paper-soft px-4 py-3 text-ink focus:border-rose focus:ring-1 focus:ring-rose/20 focus:outline-none transition-all placeholder:text-ink/20"
              />
              {errors.intro && <p className="mt-1 text-xs text-rose">{errors.intro.message}</p>}
            </div>
          </div>

          <div className="rounded-2xl border border-ink/5 bg-paper-soft/30 p-8">
            <div className="mb-6 flex items-center justify-between border-b border-ink/5 pb-4">
              <h4 className="font-display text-lg text-ink">Apartments</h4>
              <button
                type="button"
                onClick={() => {
                  append({ name: "", type: "", size: "", price: "", slug: "", dimensions: [] });
                  setExpandedApartment(fields.length);
                }}
                className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 active:scale-95"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Apartment
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => {
                const isExpanded = expandedApartment === index;
                const aptHeroPath = `apartments.${index}.hero_image`;
                const aptHeroUrl = watch(aptHeroPath as any);
                const aptFloorplanPath = `apartments.${index}.floorplan_image`;
                const aptFloorplanUrl = watch(aptFloorplanPath as any);
                const aptMapPath = `apartments.${index}.location_map_image`;
                const aptMapUrl = watch(aptMapPath as any);

                return (
                  <div key={field.id} className="rounded-xl border border-ink/5 bg-white transition-all overflow-hidden">
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-paper-soft/30 transition-colors"
                      onClick={() => setExpandedApartment(isExpanded ? null : index)}
                    >
                      <div className="flex flex-1 items-center gap-6">
                        <div className="flex-1 overflow-hidden">
                          <p className="text-rose text-[15px] md:text-base flex items-center gap-2 font-display">
                            {field.name || "Untitled Unit"}
                            {errors.apartments?.[index] && (
                              <span className="flex h-2 w-2 rounded-full bg-rose animate-pulse" title="Validation errors in this unit" />
                            )}
                          </p>
                        </div>
                        <div className="space-y-1 min-w-[120px]">
                          <span className="text-[8px] font-bold text-ink/30 uppercase tracking-tighter">Name</span>
                          <input
                            {...register(`apartments.${index}.name`)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full bg-transparent text-sm font-semibold text-ink focus:outline-none"
                            placeholder="Unit 1"
                          />
                        </div>
                        <div className="space-y-1 hidden md:block">
                          <span className="text-[8px] font-bold text-ink/30 uppercase tracking-tighter">Type</span>
                          <input
                            {...register(`apartments.${index}.type`)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full bg-transparent text-xs text-ink/60 focus:outline-none"
                            placeholder="1 Bedroom"
                          />
                        </div>
                        <div className="space-y-1 hidden md:block">
                          <span className="text-[8px] font-bold text-ink/30 uppercase tracking-tighter">Price</span>
                          <input
                            {...register(`apartments.${index}.price`)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full bg-transparent text-xs text-ink/60 focus:outline-none"
                            placeholder="£XXX,XXX"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            remove(index);
                          }}
                          className="text-ink/20 hover:text-rose transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="text-ink/40">
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-ink/5 bg-paper-soft/20 p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <span className="text-[8px] font-bold text-ink/30 uppercase tracking-tighter">Size</span>
                                <input
                                  {...register(`apartments.${index}.size`)}
                                  className="w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-xs text-ink"
                                  placeholder="750 sq ft"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[8px] font-bold text-ink/30 uppercase tracking-tighter">Slug</span>
                                <input
                                  {...register(`apartments.${index}.slug`)}
                                  className="w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-xs text-ink"
                                  placeholder="no-1-cullinan"
                                />
                              </div>
                            </div>

                            <div className="space-y-3">
                              <label className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Detail Page Header</label>
                              <div 
                                onClick={() => apartmentImageRefs.current[aptHeroPath]?.click()}
                                className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-ink/10 bg-white hover:border-rose/40 transition-all"
                              >
                                <input 
                                  type="file" 
                                  ref={el => apartmentImageRefs.current[aptHeroPath] = el}
                                  className="hidden" 
                                  accept="image/*" 
                                  onChange={(e) => handleFileUpload(e, aptHeroPath)} 
                                />
                                {aptHeroUrl ? (
                                  <img src={aptHeroUrl} className="h-full w-full object-cover" />
                                ) : (
                                  <div className="flex flex-col items-center justify-center h-full text-ink/20">
                                    <Layout className="h-5 w-5 mb-2" />
                                    <span className="text-[8px] font-bold uppercase tracking-widest">Add Hero Image</span>
                                  </div>
                                )}
                                {uploading[aptHeroPath] && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                                    <Loader2 className="h-5 w-5 text-rose animate-spin" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Floorplan</label>
                              <div 
                                onClick={() => apartmentImageRefs.current[aptFloorplanPath]?.click()}
                                className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-ink/10 bg-white hover:border-rose/40 transition-all"
                              >
                                <input 
                                  type="file" 
                                  ref={el => apartmentImageRefs.current[aptFloorplanPath] = el}
                                  className="hidden" 
                                  accept="image/*" 
                                  onChange={(e) => handleFileUpload(e, aptFloorplanPath)} 
                                />
                                {aptFloorplanUrl ? (
                                  <img src={aptFloorplanUrl} className="h-full w-full object-contain p-2" />
                                ) : (
                                  <div className="flex flex-col items-center justify-center h-full text-ink/20">
                                    <ImageIcon className="h-5 w-5 mb-2" />
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-center">Upload Floorplan</span>
                                  </div>
                                )}
                                {uploading[aptFloorplanPath] && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                                    <Loader2 className="h-5 w-5 text-rose animate-spin" />
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Location Map</label>
                              <div 
                                onClick={() => apartmentImageRefs.current[aptMapPath]?.click()}
                                className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-ink/10 bg-white hover:border-rose/40 transition-all"
                              >
                                <input 
                                  type="file" 
                                  ref={el => apartmentImageRefs.current[aptMapPath] = el}
                                  className="hidden" 
                                  accept="image/*" 
                                  onChange={(e) => handleFileUpload(e, aptMapPath)} 
                                />
                                {aptMapUrl ? (
                                  <img src={aptMapUrl} className="h-full w-full object-contain p-2" />
                                ) : (
                                  <div className="flex flex-col items-center justify-center h-full text-ink/20">
                                    <MapPin className="h-5 w-5 mb-2" />
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-center">Upload Map</span>
                                  </div>
                                )}
                                {uploading[aptMapPath] && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                                    <Loader2 className="h-5 w-5 text-rose animate-spin" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <DimensionsEditor nestIndex={index} control={control} register={register} />
                      </div>
                    )}
                  </div>
                );
              })}
              {fields.length === 0 && (
                <div className="py-10 text-center text-xs text-ink/20 italic">No apartments added yet</div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-ink/5">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 rounded-xl border border-ink/10 px-8 py-3 text-sm font-medium text-ink transition-all hover:bg-paper-soft active:scale-95"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-rose px-8 py-3 text-sm font-semibold text-white shadow-xl shadow-rose/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}
