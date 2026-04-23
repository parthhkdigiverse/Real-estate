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

      <section className="bg-paper-soft py-20 md:py-28 overflow-hidden">
        <div className="container-luxe">
          <div className="mb-14">
            <h2 className="font-display text-4xl md:text-6xl text-ink uppercase tracking-tight text-center">
              Gallery
            </h2>
            <p className="mt-5 text-ink/50 uppercase text-xs tracking-[0.2em] font-medium text-center italic">Click for full size images</p>
          </div>

          <div className="relative group/carousel">
            <div className="embla overflow-hidden" ref={emblaRef}>
              <div className="flex ml-[-1.25rem] md:ml-[-1.5rem]">
                {GALLERY.map((g, i) => (
                  <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 pl-[1.25rem] md:pl-[1.5rem]">
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
                      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-all duration-700 flex items-center justify-center">
                         <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <div className="w-14 h-14 rounded-full bg-paper/95 backdrop-blur-md flex items-center justify-center text-ink shadow-soft border border-paper/20">
                               <X className="h-6 w-6 rotate-45 stroke-[1px]" />
                            </div>
                         </div>
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
              className="absolute -left-4 md:-left-14 top-1/2 -translate-y-1/2 z-10 h-14 w-14 md:h-16 md:w-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white shadow-soft opacity-70 group-hover/carousel:opacity-100 hover:bg-white/30 hover:scale-110 disabled:opacity-0! disabled:pointer-events-none transition-all duration-500 active:scale-95 group/btn"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-8 w-8 md:h-10 md:w-10 stroke-[1.2px] transition-transform group-hover/btn:-translate-x-0.5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className="absolute -right-4 md:-right-14 top-1/2 -translate-y-1/2 z-10 h-14 w-14 md:h-16 md:w-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white shadow-soft opacity-70 group-hover/carousel:opacity-100 hover:bg-white/30 hover:scale-110 disabled:opacity-0! disabled:pointer-events-none transition-all duration-500 active:scale-95 group/btn"
              aria-label="Next slide"
            >
              <ChevronRight className="h-8 w-8 md:h-10 md:w-10 stroke-[1.2px] transition-transform group-hover/btn:translate-x-0.5" />
            </button>
          </div>
          
          <p className="mt-12 text-center text-xs tracking-[0.2em] uppercase text-ink/40 font-medium italic">Swipe or use arrows to explore more</p>
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
                        <span className="mt-2 inline-block h-1 w-1 rounded-full bg-gold shrink-0" />
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
            className="absolute top-6 right-6 text-paper hover:text-gold transition-colors"
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
