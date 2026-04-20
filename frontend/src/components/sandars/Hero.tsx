import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { fetchSettings } from "@/lib/api";
import hero1 from "@/assets/hero-living.jpg";
import hero2 from "@/assets/about-estate.jpg";
import hero3 from "@/assets/lifestyle-community.jpg";

const SLIDES = [
  {
    image: hero1,
    eyebrow: "Rewarding Luxury",
    title: "Discover the Sandars difference",
    sub: "We pride ourselves on offering a later living experience like no other",
  },
  {
    image: hero2,
    eyebrow: "27 Acres of Parkland",
    title: "Find your belonging",
    sub: "Surrounded by lakes, ancient trees and grade II listed architecture",
  },
  {
    image: hero3,
    eyebrow: "A Bespoke Luxury",
    title: "As individual as you are",
    sub: "Live the life you\u2019re used to \u2014 refined, connected and your own",
  },
];

export const Hero = () => {
  const [i, setI] = useState(0);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 6500);
    
    // Fetch interactive settings (like video URL)
    fetchSettings().then(setSettings).catch(console.error);

    return () => clearInterval(t);
  }, []);

  const go = (n: number) => setI((p) => (p + n + SLIDES.length) % SLIDES.length);

  return (
    <section id="top" className="relative pt-24 md:pt-28">
      <div className="container-luxe">
        <div className="relative overflow-hidden h-[68vh] min-h-[480px] max-h-[760px] bg-ink/10">
          {SLIDES.map((s, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
                idx === i ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              aria-hidden={idx !== i}
            >
              <img
                src={s.image}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover ${idx === i ? "ken-burns" : ""}`}
                loading={idx === 0 ? "eager" : "lazy"}
                width={1920}
                height={1080}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/20 to-ink/55" />

              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <p className="text-paper/90 tracking-display text-xs md:text-sm uppercase mb-6 fade-up">
                  {s.eyebrow}
                </p>
                <h1
                  className="font-display text-paper text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-5xl fade-up"
                  style={{ animationDelay: "120ms" }}
                >
                  {s.title}
                </h1>
                <p
                  className="mt-6 md:mt-8 text-paper/90 text-base md:text-lg max-w-2xl fade-up"
                  style={{ animationDelay: "240ms" }}
                >
                  {s.sub}
                </p>
              </div>
            </div>
          ))}

          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 grid place-items-center text-paper/90 hover:text-paper bg-ink/20 hover:bg-ink/40 backdrop-blur-sm transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 grid place-items-center text-paper/90 hover:text-paper bg-ink/20 hover:bg-ink/40 backdrop-blur-sm transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <a 
            href={settings?.video_url || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute right-4 md:right-8 top-4 md:top-8 z-20 inline-flex items-center gap-2 text-paper/95 hover:text-paper text-sm tracking-display uppercase group"
          >
            <span className="grid place-items-center h-9 w-9 rounded-full bg-paper/20 backdrop-blur-sm border border-paper/40 group-hover:bg-gold transition-all duration-300">
              <Play className="h-3.5 w-3.5 fill-paper" />
            </span>
            Watch the film
          </a>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-[3px] transition-all duration-500 ${
                  idx === i ? "w-10 bg-paper" : "w-5 bg-paper/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
