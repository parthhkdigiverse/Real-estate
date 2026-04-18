import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
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
import g5 from "@/assets/spec-gallery-5.png";
import g6 from "@/assets/spec-gallery-6.png";
import g7 from "@/assets/spec-gallery-7.png";
import g8 from "@/assets/spec-gallery-8.png";
import g9 from "@/assets/spec-gallery-9.png";
import g10 from "@/assets/spec-gallery-10.png";

const DiamondIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="15" y="15" width="70" height="70" stroke="currentColor" strokeWidth="1.5" />
    <path d="M50 15 L85 50 L50 85 L15 50 Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M32.5 15 L32.5 85 M67.5 15 L67.5 85 M15 32.5 L85 32.5 M15 67.5 L85 67.5" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    <circle cx="50" cy="50" r="2" fill="currentColor" />
  </svg>
);

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
  { src: g5, alt: "Luxury master bedroom interior" },
  { src: g6, alt: "Outdoor alfresco dining area" },
  { src: g7, alt: "High-end kitchen cabinetry and quartz detail" },
  { src: g8, alt: "Residents social lounge and library" },
  { src: g9, alt: "Aerial view of manor and lake" },
  { src: g10, alt: "Pollards Court modern architecture" },
];

const SPEC_SECTIONS = [
  {
    title: "Kitchen",
    items: [
      "Porcelain tiles in all bathrooms",
      "Handleless German kitchens by Hacker, Miele integrated appliances, quartz worktops, and LED pelmet lighting",
    ],
  },
  {
    title: "Bathroom & Ensuite",
    items: [
      "Porcelain tiles in all bathrooms",
      "Large format porcelain tiles",
      "Electric underfloor heating and towel rails",
      "Recessed mirrors with LED",
      "Villeroy Boch sanitaryware and Hansgrohe brassware",
      "Walk-in wet room showers with glass screen",
    ],
  },
  {
    title: "Interior Decoration",
    items: [
      "High-quality windows and doors fitted to complement the Grade 2 listed building",
      "Engineered flooring to hall, living/dining, and kitchen areas (Grange, Annex, part of Meadlake, and Eastley End)",
      "Carpets to all bedrooms",
      "Voiles for windows",
      "Wood-effect porcelain tiles to hall, living, and kitchen (Cemex House)",
      "Fitted wardrobes including hanging rails in master bedrooms",
    ],
  },
  {
    title: "Utility & Electricals",
    items: [
      "Recessed LED down-lighting",
      "Sockets with USB charging points in the lounge, bedrooms, and entrance hall",
      "TV/satellite, internet, and telephone points provided",
      "Home automation for lighting throughout the apartment to give homeowners the ability to control all lighting functions via an app installed on their phone",
      "Utility cupboards fitted with washer/dryer",
      "Air-conditioning cooling and heating",
      "Underfloor heating with smart controls and serviced by air source heat pumps",
      "Mechanical ventilation with heat recovery system (MVHR)",
    ],
  },
];

function Specification() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: true
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

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

      <section id="gallery" className="bg-[#F4F1ED] py-24 md:py-32 overflow-hidden selection:bg-rose/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-14 md:mb-20 text-center">
            <h2 className="font-display text-4xl md:text-5xl lg:text-5xl text-ink uppercase tracking-[0.18em] mb-4 font-light">
              Gallery
            </h2>
            <p className="text-ink text-sm md:text-base font-sans font-light opacity-70">
              Click for full size images.
            </p>
          </div>

          <div className="relative">
            <div className="embla" ref={emblaRef}>
              <div className="flex gap-4 md:gap-5">
                {GALLERY.slice(0, 10).map((g, i) => (
                  <div key={i} className="flex-[0_0_88%] sm:flex-[0_0_46%] lg:flex-[0_0_23.8%] min-w-0">
                    <button
                      onClick={() => setLightbox(i)}
                      aria-label={`Open ${g.alt}`}
                      className="group relative w-full aspect-square overflow-hidden bg-ink/5 block cursor-pointer"
                    >
                      <img
                        src={g.src}
                        alt={g.alt}
                        loading="lazy"
                        width={1024}
                        height={1024}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      />
                      
                      {/* Lattice Diamond Overlay (More Premium) */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/30 transition-all duration-700">
                         <DiamondIcon className="h-16 w-16 md:h-24 md:w-24 text-white opacity-40 group-hover:opacity-100 transition-all duration-700 drop-shadow-2xl scale-90 group-hover:scale-100" />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Arror Styling match reference image */}
            <button
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white disabled:opacity-0 transition-all hover:scale-125 hover:translate-x-[-4px]"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-10 w-10 md:h-14 md:w-14 stroke-[1px] drop-shadow-lg" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white disabled:opacity-0 transition-all hover:scale-125 hover:translate-x-[4px]"
              aria-label="Next slide"
            >
              <ChevronRight className="h-10 w-10 md:h-14 md:w-14 stroke-[1px] drop-shadow-lg" />
            </button>
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
