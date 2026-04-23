import estate from "@/assets/about-estate.jpg";

export const About = () => (
  <section id="about" className="py-20 md:py-32">
    <div className="container-luxe grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div className="relative">
        <div className="aspect-[5/6] overflow-hidden">
          <img
            src={estate}
            alt="The Sandars estate set in 27 acres of Surrey parkland"
            className="h-full w-full object-cover"
            loading="lazy"
            width={1280}
            height={896}
          />
        </div>
        <div className="hidden md:block absolute -right-6 -bottom-6 h-32 w-32 border border-gold/40" />
      </div>

      <div>
        <p className="text-xs tracking-display uppercase text-gold mb-5">Discover</p>
        <h2 className="font-display text-4xl md:text-5xl leading-[1.1] text-ink mb-6">
          Discover the Sandars
        </h2>
        <div className="space-y-5 text-ink/75 leading-relaxed text-[17px]">
          <p>
            The Sandars is a unique, state of the art development for luxury later living based on the edge of the beautiful village of Thorpe, in Surrey. It is set within the 'Runnymede Green Belt Area' and partially within the 'Thorpe Conservation Area'.
          </p>
          <p>
            Set in parkland of over 27 acres this exceptional development is exclusively for 55 years and over. The luxury 1 & 2 bedroom apartments are for sale with selected plots also available for rental, unfurnished. No two are the same, creating a bespoke home as individual as you are.
          </p>
          <p>
            The spectrum of choice takes in a timeline from the 18th, 19th, 20th & 21st centuries creating the broadest possible appeal.
          </p>
        </div>
        <a
          href="#lifestyle"
          className="inline-block mt-10 text-sm tracking-display uppercase text-gold hover:text-ink border-b border-gold/40 hover:border-ink pb-1 transition-colors"
        >
          Discover more about the Sandars lifestyle
        </a>
      </div>
    </div>
  </section>
);
