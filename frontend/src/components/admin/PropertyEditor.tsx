import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, Save, X } from "lucide-react";
import { AdminCard } from "./AdminCard";

const apartmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  size: z.string().min(1, "Size is required"),
  price: z.string().min(1, "Price is required"),
  slug: z.string().min(1, "Slug is required"),
});

const propertySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  hero: z.string().min(1, "Hero image URL is required"),
  intro: z.string().min(1, "Intro text is required"),
  showApartmentNote: z.string().min(1, "Apartment note is required"),
  hours: z.string().min(1, "Sales hours are required"),
  apartments: z.array(apartmentSchema),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

interface PropertyEditorProps {
  initialData?: any;
  onSave: (data: PropertyFormValues) => void;
  onCancel: () => void;
}

export function PropertyEditor({ initialData, onSave, onCancel }: PropertyEditorProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      hero: "",
      intro: "",
      showApartmentNote: "Apartments from £XXX",
      hours: "Daily, 10am — 5pm",
      apartments: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "apartments",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-md">
      <AdminCard 
        title={initialData ? "Edit Property" : "Add New Property"} 
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto border-ink/10 shadow-2xl"
      >
        <form onSubmit={handleSubmit(onSave)} className="space-y-8">
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
            <div className="md:col-span-2">
              <label className="mb-2 block text-[10px] font-bold text-ink/40 uppercase tracking-widest">Hero Image URL</label>
              <input
                {...register("hero")}
                className="w-full rounded-xl border border-ink/10 bg-paper-soft px-4 py-3 text-ink focus:border-rose focus:ring-1 focus:ring-rose/20 focus:outline-none transition-all placeholder:text-ink/20"
                placeholder="/images/hero-1.jpg"
              />
              {errors.hero && <p className="mt-1 text-xs text-rose">{errors.hero.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-[10px] font-bold text-ink/40 uppercase tracking-widest">Introduction</label>
              <textarea
                {...register("intro")}
                rows={3}
                className="w-full rounded-xl border border-ink/10 bg-paper-soft px-4 py-3 text-ink focus:border-rose focus:ring-1 focus:ring-rose/20 focus:outline-none transition-all placeholder:text-ink/20"
                placeholder="Exquisite luxury later living..."
              />
              {errors.intro && <p className="mt-1 text-xs text-rose">{errors.intro.message}</p>}
            </div>
          </div>

          <div className="rounded-2xl border border-ink/5 bg-paper-soft/30 p-8">
            <div className="mb-6 flex items-center justify-between border-b border-ink/5 pb-4">
              <h4 className="font-display text-lg text-ink">Apartments</h4>
              <button
                type="button"
                onClick={() => append({ name: "", type: "", size: "", price: "", slug: "" })}
                className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 active:scale-95"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Apartment
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 gap-4 rounded-xl border border-ink/5 bg-white p-4 md:grid-cols-5">
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-ink/30 uppercase tracking-tighter">Name</span>
                    <input
                      {...register(`apartments.${index}.name`)}
                      className="w-full bg-transparent text-sm text-ink focus:outline-none"
                      placeholder="Apartment 1"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-ink/30 uppercase tracking-tighter">Type</span>
                    <input
                      {...register(`apartments.${index}.type`)}
                      className="w-full bg-transparent text-sm text-ink focus:outline-none"
                      placeholder="Type"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-ink/30 uppercase tracking-tighter">Size</span>
                    <input
                      {...register(`apartments.${index}.size`)}
                      className="w-full bg-transparent text-sm text-ink focus:outline-none"
                      placeholder="Size"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-ink/30 uppercase tracking-tighter">Price</span>
                    <input
                      {...register(`apartments.${index}.price`)}
                      className="w-full bg-transparent text-sm text-ink focus:outline-none"
                      placeholder="Price"
                    />
                  </div>
                  <div className="flex items-end justify-between gap-2 pb-1">
                    <div className="flex-1 space-y-1">
                      <span className="text-[8px] font-bold text-ink/30 uppercase tracking-tighter">Slug</span>
                      <input
                        {...register(`apartments.${index}.slug`)}
                        className="w-full bg-transparent text-sm text-ink focus:outline-none"
                        placeholder="Slug"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-ink/20 hover:text-rose mb-1 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              {fields.length === 0 && (
                <div className="py-10 text-center text-xs text-ink/20 italic">No apartments added yet</div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
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
