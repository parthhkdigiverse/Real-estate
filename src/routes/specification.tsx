import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Header } from "@/components/sandars/Header";
import { Footer } from "@/components/sandars/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImg from "@/assets/spec-hero.jpg";
import g1 from "@/assets/spec-gallery-1.jpg";
import g2 from "@/assets/spec-gallery-2.jpg";
import g3 from "@/assets/spec-gallery-3.jpg";
import g4 from "@/assets/spec-gallery-4.jpg";

export const Route = createFileRoute("/specification")({
  head: () => ({
    meta: [
      { title: "Specification \u2014 The Sandars" },
      { name: "description", content: "Explore the bespoke specification of every Sandars apartment \u2014 kitchens, bathrooms, interior decoration and more." },
      { property: "og:title", content: "Specification \u2014 The Sandars" },
      { property: "og:description", content: "Bespoke kitchens, bathrooms and interior finishes for every Sandars apartment." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Specification,
});

const GALLERY = [
  { src: g1, alt: "Aerial view of The Sandars estate and lake" },
  { src: g2, alt: "Georgian manor house with formal gardens" },
  { src: g3, alt: "Residents enjoying the spa lounge" },
  { src: g4, alt: "Indoor swimming pool and wellness suite" },
];

const SPEC_SECTIONS = [
  {
    title: "Kitchen",
    items: [
      "Bespoke handle-less cabinetry with soft-close doors and drawers",
      "Composite stone worktops and matching upstands",
      "Integrated Siemens or Bosch oven, combination microwave and induction hob",
      "Integrated dishwasher, fridge/freezer and recirculating extractor",
      "Quooker boiling water tap and undermount stainless steel sink",
      "Recessed LED downlights and under-cabinet task lighting",
    ],
  },
  {
    title: "Utility & Electricals",
    items: [
      "Integrated washer/dryer in dedicated utility cupboard",
      "Brushed steel sockets and switches throughout living areas",
      "Underfloor heating to all rooms with individual thermostats",
      "Pre-wired for high-speed broadband and Sky Q in living room and bedrooms",
      "Mains-powered smoke, heat and carbon monoxide detection",
      "Video door entry system linked to the concierge desk",
    ],
  },
  {
    title: "Interior Decoration",
    items: [
      "Engineered oak flooring to hallway, living and kitchen areas",
      "Wool-rich fitted carpets to bedrooms",
      "Walls finished in soft neutral emulsion with satinwood woodwork",
      "Solid core internal doors with brushed nickel ironmongery",
      "Built-in wardrobes to principal bedrooms with internal lighting",
      "Bespoke skirtings and architraves throughout",
    ],
  },
  {
    title: "Bathroom & Ensuite",
    items: [
      "Villeroy & Boch sanitaryware with chrome Hansgrohe brassware",
      "Walk-in shower enclosures with frameless glass screens",
      "Vanity units with integrated storage and illuminated mirrors",
      "Large-format porcelain wall and floor tiles",
      "Heated chrome towel rails",
      "Underfloor heating with individual room control",
    ],
  },
];

function Specification() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="bg-paper text-ink">
      <Header />

      <section className="relative pt-24 md:pt-28">
        <div className="container-luxe">
          <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
            <img
              src={heroImg}
              alt="Resident relaxing in a Sandars apartment"
              className="absolute inset-0 h-full w-full object-cover"
              width={1920}
              height={900}
            />
            <div className="absolute inset-0 bg-ink/30" />
            <div className="relative h-full flex items-center justify-center px-6">
              <h1 className="font-display text-paper text-5xl md:text-7xl lg:text-[88px] uppercase tracking-tight text-center">
                Specification
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-soft py-20 md:py-28">
        <div className="container-luxe">
          <h2 className="font-display text-3xl md:text-5xl text-ink uppercase tracking-tight text-center">
            Gallery
          </h2>
          <p className="mt-4 text-center text-ink/65">Click for full size images.</p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {GALLERY.map((g, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                aria-label={`Open ${g.alt}`}
                className="group relative aspect-square overflow-hidden bg-ink/5"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors duration-500" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-luxe max-w-5xl">
          <h2 className="font-display text-3xl md:text-5xl text-ink uppercase tracking-tight mb-10 md:mb-12">
            Specification
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {SPEC_SECTIONS.map((s, i) => (
              <AccordionItem key={s.title} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="font-display text-xl md:text-2xl text-ink hover:no-underline py-6">
                  {s.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 pb-4 text-ink/75 leading-relaxed">
                    {s.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span className="mt-2 inline-block h-1 w-1 rounded-full bg-rose shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-14">
            <Link to="/" className="text-xs tracking-display uppercase text-ink/70 hover:text-rose transition-colors">
              \u2190 Back to all properties
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[60] bg-ink/90 flex items-center justify-center p-6"
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-6 right-6 text-paper hover:text-rose transition-colors"
          >
            <X className="h-7 w-7" />
          </button>
          <img
            src={GALLERY[lightbox].src}
            alt={GALLERY[lightbox].alt}
            className="max-h-[88vh] max-w-[92vw] object-contain"
          />
        </div>
      )}
    </main>
  );
}
