import { Grid3x3, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { fetchProperties, Property } from "@/lib/api";

export const Availability = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties();
        // Filter for featured properties
        setProperties(data.filter(p => p.is_featured));
      } catch (err) {
        setError("Failed to load featured properties");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center bg-paper-soft">
        <Loader2 className="h-10 w-10 text-rose animate-spin" />
      </div>
    );
  }

  if (error || properties.length === 0) {
    return null; // Don't show the section if there's an error or no featured properties
  }

  return (
    <section id="properties" className="py-20 md:py-28 bg-paper-soft">
      <div className="container-luxe">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="text-xs tracking-display uppercase text-rose mb-5">Featured availability</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.1]">
              Homes currently available
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {properties.map((p) => (
            <article key={p.slug} className="group bg-paper shadow-card overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.featured_image || p.hero}
                  alt={`${p.name} featured`}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
                <span className="absolute top-4 left-4 bg-rose text-paper text-[11px] tracking-display uppercase px-3 py-1.5">
                  {p.tag || "For Sale"}
                </span>
              </div>
              <div className="p-7 flex-1 flex flex-col">
                <p className="text-xs text-ink/50 mb-3">{p.date || "Available Now"}</p>
                <p className="font-display text-xl text-ink/80 mb-1">Featured</p>
                <h3 className="font-display text-2xl md:text-[28px] text-ink mb-5">{p.name}</h3>
                <div className="mt-auto flex items-center justify-between pt-5 border-t border-border">
                  <span className="text-sm text-ink/70">Price on request</span>
                  <Link
                    to="/properties/$slug"
                    params={{ slug: p.slug }}
                    className="text-xs tracking-display uppercase text-rose hover:text-ink border-b border-rose/40 hover:border-ink pb-0.5 transition-colors"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-end">
          <a
            href="#properties"
            className="group inline-flex items-center gap-3 text-sm tracking-display uppercase text-ink/80 hover:text-rose transition-colors"
          >
            <Grid3x3 className="h-5 w-5 text-rose" />
            See all availability
          </a>
        </div>
      </div>
    </section>
  );
};
