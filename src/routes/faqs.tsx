import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sandars/Header";
import { Footer } from "@/components/sandars/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqHero from "@/assets/faq-hero.jpg";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions \u2014 The Sandars" },
      { name: "description", content: "Discover frequently asked questions in relation to The Sandars. Gain valuable insights into our vibrant community as we provide answers to common questions about life at our esteemed later-life apartments." },
      { property: "og:title", content: "Frequently Asked Questions \u2014 The Sandars" },
      { property: "og:description", content: "Common questions about life at The Sandars luxury later living community in Surrey." },
      { property: "og:image", content: faqHero },
      { name: "twitter:image", content: faqHero },
    ],
  }),
  component: FaqsPage,
});

const FAQS: { q: string; a: string }[] = [
  { q: "What type of heating will I have, and where is its source?", a: "Each apartment is fitted with energy-efficient underfloor heating to all rooms, individually controlled by room thermostats. Heating and hot water are supplied via a centralised low-carbon plant room serving the development." },
  { q: "Are there smoke, heat and carbon dioxide detectors in all apartments and throughout the communal areas?", a: "Yes. All apartments and communal areas are fitted with mains-powered, interlinked smoke, heat and carbon monoxide detectors with battery back-up, conforming to current British Standards." },
  { q: "Will there be free Wi-Fi in all the communal areas?", a: "Yes \u2014 complimentary high-speed Wi-Fi is available throughout all communal lounges, the restaurant, library, spa and gardens." },
  { q: "Who is responsible for the maintenance of the patios and balconies?", a: "The exterior of patios and balconies, including the structure and any planters provided by the development, is maintained by the management team as part of your service charge. Personal furniture and plants are the resident's responsibility." },
  { q: "Are there any curtains / voiles included?", a: "Apartments are handed over with neutral track curtains and voiles to all principal windows. Bespoke options can be specified at additional cost." },
  { q: "Will my oven self-clean?", a: "Yes. All apartments are fitted with Siemens or Bosch ovens featuring a pyrolytic self-cleaning function." },
  { q: "Who is Eden's company solicitor?", a: "Eden Retirement Living's appointed solicitor is Trowers & Hamlins LLP. Reservation packs include the recommended firms for purchaser representation." },
  { q: "How much is the reservation fee?", a: "The reservation fee is \u00a35,000, fully deductible from the purchase price upon exchange of contracts." },
  { q: "How long does the reservation deposit secure an apartment?", a: "Your reservation secures the apartment for 28 days, during which exchange of contracts is expected to take place." },
  { q: "What is the ground rent charge?", a: "There is no ground rent payable on any Sandars apartment, in line with current legislation." },
  { q: "How much do I get back if I am unable to continue with my purchase?", a: "If you withdraw within the 28-day reservation period, the reservation fee is refunded less a \u00a3500 administration charge plus any solicitor disbursements already incurred." },
  { q: "Should I allow for any extra cost?", a: "In addition to the purchase price, allow for stamp duty, legal fees, the management charge, and removals. Your sales advisor will provide a detailed indicative cost summary." },
  { q: "How much does a parking space cost?", a: "Allocated parking is included with most apartments. Additional spaces, where available, are offered at \u00a325,000 each." },
  { q: "How do I pay for my electricity consumption?", a: "Each apartment is individually metered. You may select your own electricity supplier and pay them directly." },
  { q: "Do I own my own home?", a: "Yes. Apartments are sold on a 999-year lease, giving you full ownership for all practical purposes." },
  { q: "What documentation is available for the Buildings Insurance?", a: "A summary of the buildings insurance policy is provided in your handover pack and updated annually. Full schedules are available on request from the management office." },
  { q: "Can I gift the apartment to a family member?", a: "Yes, subject to the family member meeting the minimum age requirement of 55 years and the standard transfer process." },
  { q: "Can I sublet my apartment?", a: "Subletting is permitted with prior written consent from the management company. The sub-tenant must meet the development's minimum age requirement." },
  { q: "Will someone help me move?", a: "Our concierge team can recommend trusted removal partners and will assist with bookings, lift access and parking arrangements on the day." },
  { q: "If someone is causing a nuisance, who will deal with this?", a: "The estate manager addresses any complaints discreetly and follows the published community charter to resolve issues quickly and fairly." },
  { q: "If a resident starts to show signs of dementia, who will deal with this?", a: "Our wellbeing team works with families and external healthcare providers to ensure the resident continues to live safely and with dignity. We can also recommend specialist care providers." },
  { q: "What happens when I come to sell?", a: "The management company offers a guided resale service, marketing your apartment to a waiting list of prospective purchasers. You may also instruct an agent of your choice." },
  { q: "What happens if a neighbour puts their property on the market at a reduced price?", a: "Pricing is determined by the seller and current market conditions. The management team monitors values and provides advisory guidance to all owners." },
  { q: "Do you have an eligibility check in place to ensure that any residents can live at The Sandars without any issues, i.e. health problems?", a: "Prospective residents complete a confidential lifestyle questionnaire so we can ensure the apartment meets their long-term needs. We do not refuse residency on the basis of health alone." },
  { q: "Who looks after the management charge at The Sandars?", a: "The management charge is administered by Eden Retirement Living's dedicated estate management team based on site." },
  { q: "How often is the management charge collected?", a: "Management charges are collected quarterly in advance by direct debit." },
  { q: "How often does the management charge increase?", a: "The charge is reviewed annually each April and adjusted in line with actual operating costs and RPI." },
  { q: "What are the fees when I come to sell?", a: "A 1% transfer fee applies on resale, contributing to ongoing reinvestment in the estate's facilities and grounds." },
  { q: "How much is the management charge?", a: "Indicative current management charges range from \u00a312,000 to \u00a316,000 per annum depending on apartment size. A full schedule is provided with each reservation." },
  { q: "Are there electric charging points?", a: "Yes \u2014 dedicated electric vehicle charging points are available in the visitor parking area and selected resident bays." },
  { q: "Is there a bin store and is our rubbish collected?", a: "Each building has a discreet bin store with general waste, recycling and food waste collection managed by the on-site team." },
  { q: "Are there smoking areas within the development?", a: "The Sandars is a non-smoking development inside all buildings. Designated outdoor smoking areas are provided away from main entrances." },
  { q: "May I smoke on my balcony?", a: "We ask residents to refrain from smoking on balconies out of consideration for neighbours, and to use the designated outdoor areas instead." },
  { q: "Are there any restrictions on how I can use my balcony?", a: "Balconies are for personal enjoyment. We ask residents not to install fixed structures, dry laundry or store large items, in line with the residents' charter." },
  { q: "How are the communal rooms used and are there any restrictions?", a: "Communal rooms are open to all residents and their guests during posted hours. Some rooms can be booked privately for events through the concierge." },
  { q: "Who can use the multifunction room and are there any restrictions?", a: "The multifunction room is available to all residents and may be reserved for private gatherings of up to 30 guests." },
  { q: "Who can use the Guest Suite and how long can someone stay there?", a: "The Guest Suite may be booked by residents for visiting friends and family for up to seven nights at a time, subject to availability." },
  { q: "Is there a bar?", a: "Yes \u2014 The Sandars offers a residents' bar within the Community Hub, open daily from late afternoon." },
  { q: "Can I use the facilities of other Eden retirement developments?", a: "Yes. As a Sandars resident you have reciprocal access to the social facilities at other Eden Retirement Living villages." },
  { q: "Can my family and friends use the facilities within Eden's Club?", a: "Family and friends are welcome to enjoy the facilities when accompanied by a resident, subject to the published guest policy." },
  { q: "What staff are there on-site and how often are they there?", a: "On-site staff include the Estate Manager, concierge team, wellbeing coordinator, housekeeping, maintenance and restaurant team \u2014 with cover seven days a week." },
  { q: "What is the Estate Manager called and how often are they there and what do they do?", a: "The Estate Manager is on site Monday to Friday and oversees the day-to-day running of the development, residents' wellbeing and the management of all on-site teams." },
  { q: "Is there a 24-hour call response?", a: "Yes. A 24-hour emergency call response system is in place via discreet pull-cords and pendant alarms in every apartment." },
  { q: "How does one access the front doors and own front door?", a: "Residents access the buildings via secure key-fob entry. Apartment front doors are fitted with multi-point locking and a smart key system." },
  { q: "What is the safety/security system in each apartment?", a: "Each apartment includes a video door entry system linked to the concierge desk, a 24-hour emergency call system and individual smoke and heat detection." },
  { q: "Will you look after my home when I'm on holiday?", a: "Our concierge team can collect post, water plants and perform welfare checks while you're away \u2014 simply notify us before you travel." },
  { q: "Are Energy Performance Certificates provided for each apartment?", a: "Yes \u2014 an EPC is provided to every purchaser as part of the legal pack at exchange." },
  { q: "Are pets allowed?", a: "Well-behaved pets are welcome at The Sandars, subject to the published pet policy and prior approval from the management company." },
  { q: "How will postal services be managed?", a: "Royal Mail and courier deliveries are received and held by the concierge team for collection or delivered direct to your apartment by arrangement." },
];

function FaqsPage() {
  return (
    <main className="bg-paper text-ink">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 md:pt-28">
        <div className="container-luxe">
          <div className="relative h-[44vh] min-h-[320px] max-h-[480px] w-full overflow-hidden">
            <img
              src={faqHero}
              alt="Resident relaxing at The Sandars"
              className="absolute inset-0 h-full w-full object-cover"
              width={1920}
              height={800}
            />
            <div className="absolute inset-0 bg-ink/35" />
            <div className="relative h-full flex items-center justify-center px-6">
              <h1 className="font-display text-paper text-4xl md:text-6xl lg:text-[80px] uppercase tracking-tight text-center leading-[1.05]">
                Frequently Asked Questions
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-14 md:py-20">
        <div className="container-luxe max-w-4xl text-center">
          <p className="text-ink/70 text-[15px] md:text-base leading-relaxed">
            Discover frequently asked questions in relation to The Sandars. Gain valuable insights
            into our vibrant community as we provide the answers to common questions about life at
            our esteemed later-life apartments.
          </p>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="pb-24 md:pb-32">
        <div className="container-luxe max-w-5xl">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-b border-border"
              >
                <AccordionTrigger className="text-left text-[15px] md:text-base text-ink hover:text-rose hover:no-underline py-5 md:py-6 font-normal">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pb-5 text-ink/70 leading-relaxed">{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </main>
  );
}
