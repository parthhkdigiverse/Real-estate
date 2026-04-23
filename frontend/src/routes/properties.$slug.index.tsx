import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/sandars/Header";
import { Footer } from "@/components/sandars/Footer";
import { fetchPropertyBySlug } from "@/lib/api";

export const Route = createFileRoute("/properties/$slug/")({
  loader: async ({ params }) => {
    try {
      const property = await fetchPropertyBySlug(params.slug);
      return { property };
    } catch (error) {
      console.error("Error loading property:", error);
      // Only throw notFound if we are sure it's a 404, or if we want to show the 404 UI
      // In this app, the notFoundComponent is used for property data missing
      throw notFound();
    }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.property.name} \u2014 The Sandars` },
          { name: "description", content: loaderData.property.intro.slice(0, 155) },
          { property: "og:title", content: `${loaderData.property.name} \u2014 The Sandars` },
          { property: "og:description", content: loaderData.property.intro.slice(0, 155) },
          { property: "og:image", content: loaderData.property.hero },
          { name: "twitter:image", content: loaderData.property.hero },
        ]
      : [],
  }),
  component: PropertyPage,
  notFoundComponent: () => (
    <main className="bg-paper text-ink">
      <Header />
      <div className="container-luxe pt-40 pb-32 text-center">
        <h1 className="font-display text-5xl">Property not found</h1>
        <Link to="/" className="mt-6 inline-block text-gold underline">Go home</Link>
      </div>
      <Footer />
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="bg-paper text-ink">
      <Header />
      <div className="container-luxe pt-40 pb-32 text-center">
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <p className="text-ink/60 mt-3">{error.message}</p>
      </div>
      <Footer />
    </main>
  ),
});

function PropertyPage() {
  const { property } = Route.useLoaderData();
  const params = Route.useParams();

  return (
    <main className="bg-paper text-ink">
      <Header />

      <section className="relative pt-24 md:pt-28">
        <div className="container-luxe">
          <div className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
            <img
              src={property.hero}
              alt={`${property.name} interior`}
              className="absolute inset-0 h-full w-full object-cover"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-ink/25" />
            <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
              <h1 className="font-display text-paper text-5xl md:text-7xl lg:text-[88px] leading-[1.05] uppercase tracking-tight">
                {property.name.split(" ").map((w: string, i: number) => (
                  <span key={i} className="block">{w}</span>
                ))}
              </h1>
              <p className="mt-8 text-[11px] md:text-xs tracking-display uppercase text-paper/90">
                {property.showApartmentNote}
              </p>
              <p className="mt-2 text-[11px] md:text-xs tracking-display uppercase text-paper/80">
                {property.hours}
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center bg-paper/95 text-ink px-8 py-3.5 text-[11px] tracking-display uppercase hover:bg-gold hover:text-paper transition-colors duration-500"
              >
                Book a visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-soft py-20 md:py-28">
        <div className="container-luxe max-w-4xl text-center">
          <p className="font-display text-2xl md:text-3xl lg:text-[34px] text-ink/85 leading-[1.45]">
            {property.intro}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-luxe">
          <h2 className="font-display text-3xl md:text-5xl text-ink uppercase tracking-tight mb-4">
            Apartment availability
          </h2>
          <p className="text-ink/65 mb-10 md:mb-12">
            For individual apartment details and specification please select from the list below
          </p>
 
          <div className="hidden md:grid grid-cols-12 gap-6 px-2 pb-4 text-[11px] tracking-display uppercase text-ink/60 border-b border-border">
            <div className="col-span-4">Apartment</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2"></div>
          </div>

          <ul className="divide-y divide-border">
            {property.apartments.map((a: any) => (
              <li
                key={a.slug}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start md:items-center px-2 py-5 md:py-6 group"
              >
                <div className="md:col-span-4">
                  <p className="md:hidden text-[11px] tracking-display uppercase text-ink/50 mb-1">Apartment</p>
                  <p className="text-gold text-[15px] md:text-base">{a.name}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="md:hidden text-[11px] tracking-display uppercase text-ink/50 mb-1">Type</p>
                  <p className="text-ink/85 text-sm md:text-base">{a.type}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="md:hidden text-[11px] tracking-display uppercase text-ink/50 mb-1">Size</p>
                  <p className="text-ink/85 text-sm md:text-base">{a.size}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="md:hidden text-[11px] tracking-display uppercase text-ink/50 mb-1">Price</p>
                  <p className="text-ink/85 text-sm md:text-base">{a.price}</p>
                </div>
                <div className="md:col-span-2 md:text-right">
                  <Link
                    to="/properties/$slug/apartments/$aptSlug"
                    params={{ 
                      slug: property.slug || params.slug, 
                      aptSlug: a.slug 
                    }}
                    aria-label={`Take a look at ${a.name}`}
                    className="inline-flex items-center justify-center bg-gold text-paper px-5 py-2.5 text-[10px] tracking-display uppercase hover:bg-ink transition-colors duration-300"
                  >
                    Take a look
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 md:py-32 bg-paper-soft overflow-hidden border-t border-ink/5">
        <div className="container-luxe mb-16">
          <div className="text-center">
            <h2 className="font-display text-[44px] md:text-[56px] uppercase tracking-[0.2em] mb-6 text-ink/80">
              Location
            </h2>
            <p className="text-[13px] md:text-[14px] font-medium text-ink/60 max-w-2xl mx-auto tracking-tight uppercase">
              The Sandars is perfectly situated to enjoy both the tranquility of Surrey and the convenience of nearby links
            </p>
          </div>
        </div>
        
        <div className="relative w-full h-[450px] md:h-[600px] bg-ink/5 group cursor-pointer">
          {/* Clickable Overlay */}
          <a 
            href="https://maps.app.goo.gl/vZpbzjuWmdsk9yQG6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-0 z-10 block"
            aria-label="View on Google Maps"
          >
            <div className="absolute top-8 left-10 z-20 bg-white/95 backdrop-blur-md px-8 py-3 rounded-full border border-ink/5 text-[11px] uppercase tracking-[0.2em] font-bold text-ink opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 shadow-2xl">
              View on Google Maps
            </div>
          </a>

          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19909.12130396001!2d-0.5208182!3d51.4096667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487677cee2ffa2ad%3A0xdbc5af55e8767878!2sEden%20Retirement%20Living!5e0!3m2!1sen!2sin!4v1713763784123!5m2!1sen!2sin"
            className="absolute inset-0 w-full h-full border-0 grayscale group-hover:grayscale-0 transition-shadow duration-1000 ease-in-out"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          
          {/* Location Label - Refined */}
          <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
            <div className="bg-white/80 backdrop-blur-xl px-6 py-3 border border-ink/5 shadow-2xl flex items-center gap-4">
              <div className="w-1 h-8 bg-gold/40" />
              <div className="flex flex-col">
                <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-ink">Eden Retirement Living</span>
                <span className="text-[8px] uppercase tracking-[0.1em] text-ink/40">Cemex House, Egham TW20 8TD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
