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
      { name: "description", content: "Discover frequently asked questions in relation to The Sandars. Gain valuable insights into our vibrant community as we provide answers to common questions about life at our esteemed later life apartments." },
      { property: "og:title", content: "Frequently Asked Questions \u2014 The Sandars" },
      { property: "og:description", content: "Common questions about life at The Sandars luxury later living community in Surrey." },
      { property: "og:image", content: faqHero },
      { name: "twitter:image", content: faqHero },
    ],
  }),
  component: FaqsPage,
});

const FAQS: { q: string; a: string }[] = [
  {
    q: "What type of heating will I have, and where is its source?",
    a: "The provision of electric heating throughout the whole building is via a dry underfloor coil system."
  },
  {
    q: "Are there smoke, heat and carbon dioxide detectors in all apartments and throughout the communal areas?",
    a: "Yes"
  },
  {
    q: "Will there be free Wi-Fi in all the communal areas?",
    a: "Yes, we provide this facility free of charge."
  },
  {
    q: "Who is responsible for the maintenance of the patios and balconies?",
    a: "Eden (The Sandars) Limited is responsible for maintaining all communal garden spaces and pods. Balconies, however, are the responsibility of the residents and should be maintained in keeping with the ambience of the overall development."
  },
  {
    q: "Are there any curtains / voiles included?",
    a: "Yes, we will provide voiles to each of the apartments."
  },
  {
    q: "Will my oven self-clean?",
    a: "Yes, we have selected a self-cleaning oven for your convenience."
  },
  {
    q: "Who is Eden\u2019s company solicitor?",
    a: "Our company Solicitors are Gowling WLG, based in both Birmingham and London."
  },
  {
    q: "How much is the reservation fee?",
    a: "Our apartment reservation fee is \u00a35000. This fee is a refundable deposit, subject to us incurring any legal costs. Please ask our Sales Executives for the full conditions that apply with this fee."
  },
  {
    q: "How long does the reservation deposit secure an apartment?",
    a: "We look at each situation individually and mutually agree a timescale at time of the reservation."
  },
  {
    q: "What is the ground rent charge?",
    a: "There is no ground rent charge at The Sandars."
  },
  {
    q: "How much do I get back if I am unable to continue with my purchase?",
    a: "If we are made aware of this fact before instructing our Solicitors to start exchange proceedings, then all your deposit will be returned. Full conditions are available from our Sales Executives."
  },
  {
    q: "Should I allow for any extra cost?",
    a: "You will need to consider a Car Parking Fee if required, Monthly Service Fee, plus Sales Administration Fee on leaving."
  },
  {
    q: "How much does a parking space cost?",
    a: "\u00a3500 per annum on a first-come, first-served basis."
  },
  {
    q: "How do I pay for my electricity consumption?",
    a: "Your electricity usage is billed directly from your nominated supplier."
  },
  {
    q: "Do I own my own home?",
    a: "Yes. We sell each property in an Eden development or village on a long leasehold basis, of up to 250 years. It is your home, held as your asset, and you are free to sell at any stage, on the open market."
  },
  {
    q: "What documentation is available for the Buildings Insurance?",
    a: "We will provide a full schedule of insurances on completion."
  },
  {
    q: "Can I gift the apartment to a family member?",
    a: "Yes, you can gift your apartment to a family member through your inheritance. They will need to meet our minimum age requirement if they intend to live within The Sandars."
  },
  {
    q: "Can I sublet my apartment?",
    a: "Sub-letting is prohibited under the Lease. However, there is the mechanism within the Lease for nominating a Designated Occupier for those whose intention it is to occupy but are unable to do so for a limited period of up to say 3 years. Please discuss this with the Sales Executives and your solicitor. Whilst the Lease prohibits any Landlord and Tenant relationship from occurring, the Designated Occupier provision enables owners to make independent arrangements for occupation by a qualifying person with whom they may have a private arrangement."
  },
  {
    q: "Will someone help me move?",
    a: "Our recommended removal company will help you with your move. If you also wish to use their decluttering service, please advise when booking. The cost for both these services will depend on the size of your current house and number of belongings. Customers have an entirely free choice of remover and Eden does not receive any commission or incentive from the suppliers for such referrals."
  },
  {
    q: "If someone is causing a nuisance, who will deal with this?",
    a: "We have designed our lease to ensure that our homeowners are protected, with our Concierge or Estate Manager being the first point of contact. The Lease provides the regulations and legal protections in this respect."
  },
  {
    q: "If a resident starts to show signs of dementia, who will deal with this?",
    a: "Periodic assessments for residency require leaseholders to engage with our services to enable them to continue to live independently. We assess the resident to ensure they have the capability of living independently, even with early stages of dementia. Our Care Providers (Care Partners (Newbury) Ltd) provide the assessment to establish whether this will be possible. This whole process involves any family member or a selected person who wishes to take part. Should the resident require additional dementia care, our care partners will assist with finding a suitable care home or dementia specialist. The Lease provides clarification on this with the Residency Criteria (under the Qualifying Person definition in the Lease)."
  },
  {
    q: "What happens when I come to sell?",
    a: "We are happy to assist you in moving with our Eden resale service, but you have every right to select your Estate Agent to provide this service."
  },
  {
    q: "What happens if a neighbour puts their property on the market at a reduced price?",
    a: "Eden has a pre-emptive right to purchase any property that is offered for sale and could exercise that option in such circumstances. Eden will advise those vendors who choose to appoint Eden as their agent on appropriate asking prices. Where vendors select external agents, Eden will liaise with them on all aspects of the resale."
  },
  {
    q: "Do you have an eligibility check in place to ensure that any residents can live at The Sandars without any issues, i.e. health problems?",
    a: "We will arrange a periodic health check in compliance with the Landlord\u2019s obligations under the S.106 Agreement with West Berkshire County Council. Residency criteria with our lease require all residents to be capable of living independently within the support regime that is available either via our care partners, Care Partners (Newbury) Limited, or another Care agency of your choosing. Care Partners (Newbury) Limited can provide both additional domestic help and full personal care if required. Please feel free to ask our Sales Executives for further information."
  },
  {
    q: "Who looks after the management charge at The Sandars?",
    a: "The Landlord, the property developer and long-term owner and operator of The Sandars is responsible for running the monthly management charge scheme."
  },
  {
    q: "How often is the management charge collected?",
    a: "The management charge is collected in advance every month."
  },
  {
    q: "How often does the management charge increase?",
    a: "The management charge changes annually in April. The new charge is based on the greater of the increase in the Average Earnings Index or the Retail Prices Index."
  },
  {
    q: "What are the fees when I come to sell?",
    a: "Vendors pay Eden a 1% + VAT Sales Administration Fee."
  },
  {
    q: "How much is the management charge?",
    a: "The 2022-3 management charge for a one-bedroom apartment is \u00a3500 per calendar month and \u00a3650 per calendar month for a two-bedroom apartment. The charge will increase annually in April. For further details see the leaflet Our Costs and Services Explained."
  },
  {
    q: "Are there electric charging points?",
    a: "Yes, there are charging points available."
  },
  {
    q: "Is there a bin store and is our rubbish collected?",
    a: "There are two bin stores and we encourage our residents to separate their rubbish into the separate recycle bins provided. Our Estate Manager together with West Berkshire Council collect and remove these bins."
  },
  {
    q: "Are there smoking areas within the development?",
    a: "There is a no smoking policy in public and communal areas."
  },
  {
    q: "May I smoke on my balcony?",
    a: "Smoking is permitted within your own private apartment. Smoking is NOT permitted on balconies because of the fire risk, or in the communal parts of the building and its grounds."
  },
  {
    q: "Are there any restrictions on how I can use my balcony?",
    a: "The Lease summary sets out common sense restrictions designed to maintain the appearance of the balconies. These include no drying of clothes or storage of bikes or any other unsightly items."
  },
  {
    q: "How are the communal rooms used and are there any restrictions?",
    a: "Our communal rooms are available for all residents. We encourage our residents to form their own social committees... we provide all the facilities for residents to provide their own breakfast and lunches if required."
  },
  {
    q: "Who can use the multifunction room and are there any restrictions?",
    a: "This space is primarily for the residents' use and for social committee meetings... but residents are free to use it as a hobby or activity room as they wish."
  },
  {
    q: "Who can use the Guest Suite and how long can someone stay there?",
    a: "Our Guest Suite is available only for residents' family and friends... the guest suite should only be used for a maximum of 7 days... nominal charge of \u00a325 per night."
  },
  {
    q: "Is there a bar?",
    a: "Yes, there is a bar within the club lounge, serviced via the day/night concierge desk."
  },
  {
    q: "Can I use the facilities of other Eden retirement developments?",
    a: "Yes... our homeowners have the free use of all the facilities in any of our Eden villages or developments."
  },
  {
    q: "Can my family and friends use the facilities within Eden\u2019s Club?",
    a: "Yes, we encourage you to spend time with your family and friends. Guests are welcome to use our club facilities in the presence of a resident."
  },
  {
    q: "What staff are there on-site and how often are they there?",
    a: "We have 24-hour on-site staffing to ensure there is always someone at hand should you need assistance."
  },
  {
    q: "What is the Estate Manager called and how often are they there and what do they do?",
    a: "The Estate Manager is on duty Monday- Friday from 7.00 a.m. to 3.00 p.m. At weekends there is an Assistant Estate Manager on duty from 8.00 am to 8.00 pm. Weekdays there is a Day Concierge on duty from 8.00 am to 8.00 pm and there is a Night Concierge operating from 8.00 pm to 8.00 am, 7 days a week."
  },
  {
    q: "Is there a 24-hour call response?",
    a: "Yes, and this is part of the basic service fee."
  },
  {
    q: "Who manages the 24-hour call service?",
    a: "Our on-site staff manage the 24-hour call response service. During night-time hours, it is the responsibility of the night concierge."
  },
  {
    q: "Who is the Home Care Agency?",
    a: "We facilitate personal care with a partnering agreement between Eden (The Sandars) Ltd and Care Partners (Newbury) Ltd; a reputable CQC registered home care agency based in Bartholomew Street, Newbury. They are engaged to provide the one hour of domestic help per apartment per week. The agency can offer additional domestic and social support to order by direct arrangement and all forms of personal care services, as shown in the client information packs."
  },
  {
    q: "Are there any domestic/laundry services included?",
    a: "Domestic services are included in the monthly management payment and this is based on one hour per week for each apartment. Our Care Partner can provide extra hours, or increments thereof, of domestic help, social calls and personal care at an additional cost. Laundry services are not included within the monthly fee, but these can be arranged direct with a local service provider using the Concierge desk."
  },
  {
    q: "Who provides the one hour of housekeeping a week?",
    a: "As above. Care Partners (Newbury) Ltd. Please refer to our Housekeeping leaflet and our Care Services leaflet for additional information."
  },
  {
    q: "What does the Concierge do?",
    a: "The concierge services are provided for the benefit of the residents... services such as booking family and friends into the Guest Suites, ordering a taxi, flowers, theatre tickets, groceries and parcels. They will also oversee the club lounge, bar and other facilities."
  },
  {
    q: "Is there CCTV in the building and outside?",
    a: "Yes, there is CCTV coverage at the main entrance and in some communal areas for the security and safety of the residents."
  },
  {
    q: "How does one access the front doors and own front door?",
    a: "We provide a key fob for all communal doors, and a separate key for each apartment."
  },
  {
    q: "What is the safety security system in each apartment?",
    a: "The Avukox emergency call system with video door entry and Intruder alarm."
  },
  {
    q: "Will you look after my home when I\u2019m on holiday?",
    a: "You can go on holiday or visit your relatives for as long as you please, knowing that we will look after your home. We fit all properties with an intruder and smoke alarm. There are also closed-circuit television cameras around the development. If you wish, we can also inspect your home while you are away and make any arrangements for your return, including opening and stocking your fridge."
  },
  {
    q: "Are Energy Performance Certificates provided for each apartment?",
    a: "Yes, an EPC will be provided for your home upon completion."
  },
  {
    q: "Are pets allowed?",
    a: "To ensure we consider you and your neighbours reasonably, we would ask for your pet to be well trained and in the case of a dog, kept on a lead on pathways when walking out of Pearl House. Full details of our pet policy are available from our Sales Executives on site."
  },
  {
    q: "How will postal services be managed?",
    a: "Each apartment will have its own mailbox."
  }
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
              <h1 className="font-display text-paper text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight text-center leading-[1.05]">
                Frequently Asked Questions
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 md:py-28">
        <div className="container-luxe max-w-4xl text-center">
          <p className="text-ink/75 text-base md:text-lg leading-relaxed font-sans font-light">
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
                <AccordionTrigger className="font-display text-xl md:text-2xl text-ink hover:no-underline py-6 text-left">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pb-6 text-ink/75 leading-relaxed font-sans font-light text-[15px] md:text-base">{f.a}</p>
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
