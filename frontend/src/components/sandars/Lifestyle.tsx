import lifestyle from "@/assets/lifestyle-community.jpg";
import { Link } from "@tanstack/react-router";

export const Lifestyle = () => (
  <section id="lifestyle" className="py-20 md:py-32">
    <div className="container-luxe grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div className="order-2 lg:order-1">
        <p className="text-xs tracking-display uppercase text-gold mb-5">Sandars lifestyle</p>
        <h2 className="font-display text-4xl md:text-5xl leading-[1.1] text-ink mb-6">
          A close-knit community where you belong
        </h2>
        <div className="space-y-5 text-ink/75 leading-relaxed text-[17px]">
          <p>
            Find yourself as part of a close-knit community at The Sandars where you'll be surrounded by like-minded individuals who share your interests and values.
          </p>
          <p>
            Later life can sometimes present challenges when it comes to social connection, but here, you have nothing to worry about. Regular social events and activities provide plenty of opportunities for you to connect and enjoy later life.
          </p>
        </div>
        <Link
          to="/lifestyle"
          className="inline-block mt-10 text-sm tracking-display uppercase text-gold hover:text-ink border-b border-gold/40 hover:border-ink pb-1 transition-colors"
        >
          Discover more
        </Link>
      </div>
      <div className="order-1 lg:order-2 relative">
        <div className="aspect-[5/4] overflow-hidden">
          <img
            src={lifestyle}
            alt="Residents enjoying lunch together at The Sandars"
            className="h-full w-full object-cover"
            loading="lazy"
            width={1280}
            height={1024}
          />
        </div>
      </div>
    </div>
  </section>
);
