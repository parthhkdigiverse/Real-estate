import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sandars/Header";
import { Footer } from "@/components/sandars/Footer";
import pool from "@/assets/lifestyle-pool.png";
import spa from "@/assets/lifestyle-spa.png";
import gym from "@/assets/lifestyle-gym.png";
import yoga from "@/assets/lifestyle-yoga.png";
import concierge from "@/assets/lifestyle-concierge.png";
import garden from "@/assets/lifestyle-garden.png";
import golf from "@/assets/lifestyle-golf.png";

export const Route = createFileRoute("/lifestyle")({
  head: () => ({
    meta: [
      { title: "Sandars Lifestyle \u2014 The Sandars" },
      { name: "description", content: "Discover the luxury later living lifestyle at The Sandars in Surrey." },
    ],
  }),
  component: LifestylePage,
});

function LifestylePage() {
  return (
    <main className="bg-paper text-ink selection:bg-rose/20">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
        <img
          src={pool}
          alt="Luxury indoor swimming pool"
          className="absolute inset-0 h-full w-full object-cover brightness-75 scale-105"
        />
        <div className="relative z-10 container-luxe text-center">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-tight max-w-5xl mx-auto drop-shadow-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            LUXURY LATER LIVING THAT MAKES A REAL DIFFERENCE
          </h1>
        </div>
      </section>

      {/* Section 1: Luxury Beyond Measure */}
      <section className="py-24 md:py-32">
        <div className="container-luxe grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative group">
            <div className="aspect-[4/5] overflow-hidden">
               <img src={spa} alt="Luxury spa treatment" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-tight">
              LUXURY BEYOND MEASURE
            </h2>
            <div className="space-y-6 text-ink/70 text-lg md:text-xl leading-relaxed max-w-xl">
              <p>
                Our idea of later living is different. We believe that living a 'luxurious lifestyle' is about investing in quality homes, products and environments that stand the test of time. Providing a sanctuary from which you can enjoy the 'true luxury' of time, good health & wellbeing in a friendly, engaging place that you like to call home. 
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Leisure Suite */}
      <section className="py-24 md:py-32 bg-[#e8ded1]">
        <div className="container-luxe grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-tight">
              LEISURE SUITE
            </h2>
            <div className="space-y-6 text-ink/70 text-lg md:text-xl leading-relaxed max-w-xl">
              <p>
                At the hub, you’ll find a state-of-the-art gym, complete with a personal trainer and a range of fitness classes tailored to your needs. Whether you’re taking a dip in our swimming and hydrotherapy pools or unwinding in the sauna and steam room, every visit enhances your well-being. For indulgence and self-care, our therapy and massage rooms, along with a hair and beauty salon, offer a sanctuary of pampering.
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="aspect-[3/2] overflow-hidden">
               <img src={gym} alt="State of the art gym equipment" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Events & Activities */}
      <section className="py-24 md:py-32">
        <div className="container-luxe grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="aspect-square overflow-hidden">
               <img src={yoga} alt="Residents practicing yoga" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
          <div className="space-y-8 pl-0 md:pl-10">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-tight">
              EVENTS & ACTIVITIES
            </h2>
            <div className="space-y-6 text-ink/70 text-lg md:text-xl leading-relaxed max-w-xl">
              <p>
                Regular social events and activities provide plenty of opportunities for you to connect and enjoy Life at The Sandars. From Arts & Crafts and Yoga in our multi-purpose room, to socialising in style at our private dining area and bar, we can provide all the perfect spots for intimate gatherings or even alfresco dining upon request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Concierge */}
      <section className="py-24 md:py-32 bg-[#3a3d46] text-white">
        <div className="container-luxe grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
              CONCIERGE (7 DAYS A WEEK 9AM-5PM)
            </h2>
            <div className="space-y-8">
              <p className="text-white/80 text-lg leading-relaxed max-w-xl">
                Our Concierge Service is here to ensure that every aspect of your day-to-day life runs smoothly, allowing you to fully enjoy the luxurious lifestyle of our retirement village. Whether it’s handling everyday tasks like deliveries or assisting with special occasions like lunches or family days, the concierge is dedicated to making life effortless and enjoyable.
              </p>
              <ul className="flex flex-col gap-y-6 text-sm md:text-base font-medium tracking-wide">
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Deliveries
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Dry cleaning
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Maintenance
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Visitors
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Events
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Coffee mornings, lunches, family days
                </li>
              </ul>
            </div>
          </div>
          <div className="relative group">
            <div className="aspect-[4/3] overflow-hidden shadow-2xl">
               <img src={concierge} alt="Concierge desk" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Further Amenities */}
      <section className="py-24 md:py-32">
        <div className="container-luxe grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group shadow-soft">
            <div className="aspect-[5/4] overflow-hidden">
               <img src={garden} alt="Manor house and gardens" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
          <div className="space-y-10 pl-0 md:pl-10">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-tight">
              FURTHER AMENITIES
            </h2>
            <ul className="flex flex-col gap-y-6 text-ink/70 text-lg md:text-xl leading-relaxed">
              <li className="flex items-start gap-4">
                <span className="h-2 w-2 rounded-full bg-ink mt-2.5 flex-shrink-0" />
                <span>Electric car charging stations</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="h-2 w-2 rounded-full bg-ink mt-2.5 flex-shrink-0" />
                <span>24-hour on-site security</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="h-2 w-2 rounded-full bg-ink mt-2.5 flex-shrink-0" />
                <span>Housekeeping on request</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="h-2 w-2 rounded-full bg-ink mt-2.5 flex-shrink-0" />
                <span>Valet Parking on request</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="h-2 w-2 rounded-full bg-ink mt-2.5 flex-shrink-0" />
                <span>IT/Business Centre</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="h-2 w-2 rounded-full bg-ink mt-2.5 flex-shrink-0" />
                <span>CQC care is available at The Sandars and subject to a needs assessment.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Location */}
      <section className="py-24 md:py-32 bg-[#5e6d6d] text-white overflow-hidden">
        <div className="container-luxe text-center space-y-8 mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            LOCATION OF THE SANDARS
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-4xl mx-auto italic">
            "The Sandars is just 2.5 miles drive from junction 13 of the M25 or 4.2 miles from junction 11 of the M25 and is located on the edge of the beautiful village of Thorpe in Surrey, just off Norlands Lane."          
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="aspect-[21/9] w-full bg-[#3a4545] rounded-xl overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 relative group">
             <div className="absolute inset-0 bg-black/20 z-10" />
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155453.64024317!2d-0.6121430032959104!3d51.428574343881434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48767769970c8a6f%3A0xe54848483f848484!2sEgham%2C%20UK!5e0!3m2!1sen!2s!4v1713430000000!5m2!1sen!2s" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen={true} 
               loading="lazy"
               className="scale-[1.1] group-hover:scale-[1.05] transition-transform duration-1000"
             ></iframe>
          </div>
        </div>
      </section>

      {/* Section 7: On Your Doorstep */}
      <section className="py-24 md:py-32 bg-[#5e6d6d] text-white">
        <div className="container-luxe grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="aspect-square md:aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
               <img src={golf} alt="Man loading golf clubs" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
              ON YOUR DOORSTEP
            </h2>
            <div className="space-y-6 text-white/80 text-lg md:text-xl leading-relaxed max-w-xl">
              <p>
                Located in a vibrant area, you'll have easy access to golf courses, shopping, supermarkets, bars, and restaurants, all just steps away from your new home.
              </p>
              <p>
                Click on the locators for points of local interest.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
