import wellbeing from "@/assets/life-wellbeing.jpg";
import parkland from "@/assets/life-parkland.jpg";
import hub from "@/assets/life-hub.jpg";
import architecture from "@/assets/life-architecture.jpg";
import enjoyment from "@/assets/life-enjoyment.jpg";
import belonging from "@/assets/life-belonging.jpg";

const ITEMS = [
  { image: wellbeing, title: "Health & wellbeing", body: "Health and wellbeing is at the heart of everything we do. Our extensive fitness suite is second to none, providing bespoke solutions for all." },
  { image: parkland, title: "27 acres of lakes & parkland", body: "Our serene lake and picturesque gardens are an idyllic spot to unwind, whether you're taking a peaceful walk, watching the sunset, or simply relaxing by the water." },
  { image: hub, title: "The Community Hub", body: "The Community Hub is the vibrant heart of The Sandars. This exclusive space offers residents a seamless blend of relaxation, wellness, and social engagement, designed for a life of comfort and sophistication." },
  { image: architecture, title: "Eclectic architecture", body: "Our properties offer a spectrum of choice in a timeline from the 18th, 19th, 20th & 21st centuries creating the broadest possible appeal." },
  { image: enjoyment, title: "A life of enjoyment", body: "Regular social events and activities provide plenty of opportunities for you to connect and enjoy Life at The Sandars. From yoga to art classes, we have activities to suit everyone." },
  { image: belonging, title: "True belonging", body: "A bespoke yet 'village feel' to the development really enhances the feeling of belonging." },
];

export const LifeGrid = () => (
  <section className="py-20 md:py-28 bg-paper-soft">
    <div className="container-luxe">
      <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
        <p className="text-xs tracking-display uppercase text-gold mb-5">Image caption</p>
        <h2 className="font-display text-4xl md:text-5xl leading-[1.1] text-ink">
          Life at the Sandars
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {ITEMS.map((it) => (
          <article key={it.title} className="group">
            <div className="aspect-[4/3] overflow-hidden mb-6 bg-ink/5">
              <img
                src={it.image}
                alt={it.title}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                loading="lazy"
                width={1024}
                height={768}
              />
            </div>
            <h3 className="font-display text-2xl md:text-[26px] text-ink mb-3">{it.title}</h3>
            <p className="text-ink/70 text-[15px] leading-relaxed">{it.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
