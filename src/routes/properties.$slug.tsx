import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/sandars/Header";
import { Footer } from "@/components/sandars/Footer";
import { PROPERTIES } from "@/data/properties";

export const Route = createFileRoute("/properties/$slug")({
  loader: ({ params }) => {
    const property = PROPERTIES[params.slug];
    if (!property) throw notFound();
    return { property };
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
        <Link to="/" className="mt-6 inline-block text-rose underline">Go home</Link>
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
                className="mt-8 inline-flex items-center bg-paper/95 text-ink px-8 py-3.5 text-[11px] tracking-display uppercase hover:bg-rose hover:text-paper transition-colors duration-500"
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
            {property.apartments.map((a: typeof property.apartments[number]) => (
              <li
                key={a.slug}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start md:items-center px-2 py-5 md:py-6 group"
              >
                <div className="md:col-span-4">
                  <p className="md:hidden text-[11px] tracking-display uppercase text-ink/50 mb-1">Apartment</p>
                  <p className="text-rose text-[15px] md:text-base">{a.name}</p>
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
                    to="/contact"
                    aria-label={`Take a look at ${a.name}`}
                    className="inline-flex items-center justify-center bg-rose text-paper px-5 py-2.5 text-[10px] tracking-display uppercase hover:bg-ink transition-colors duration-300"
                  >
                    Take a look
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <Link to="/" className="text-xs tracking-display uppercase text-ink/70 hover:text-rose transition-colors">
              \u2190 Back to all properties
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
