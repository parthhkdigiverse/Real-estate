import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/sandars/Header";
import { Footer } from "@/components/sandars/Footer";
import contactImg from "@/assets/contact-conversation.jpg";
import teaImg from "@/assets/contact-tea.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact \u2014 The Sandars" },
      { name: "description", content: "Get in touch with The Sandars luxury later living development in Egham, Surrey. Sales managed by Savills." },
      { property: "og:title", content: "Contact \u2014 The Sandars" },
      { property: "og:description", content: "Find us at Coldharbour Lane, Egham, Surrey TW20 8TD. Sales by Savills \u2014 0203 757 2828." },
      { property: "og:image", content: contactImg },
      { name: "twitter:image", content: contactImg },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    e.currentTarget.reset();
  };

  return (
    <main className="bg-paper text-ink">
      <Header />

      {/* CONTACT banner */}
      <section className="pt-24 md:pt-28">
        <div
          className="relative w-full h-[160px] md:h-[180px]"
          style={{
            backgroundColor: "oklch(0.52 0.035 200)",
            backgroundImage:
              "repeating-linear-gradient(45deg, oklch(0.46 0.03 200) 0 1px, transparent 1px 22px), repeating-linear-gradient(-45deg, oklch(0.46 0.03 200) 0 1px, transparent 1px 22px)",
          }}
        >
          <div className="container-luxe h-full flex items-center">
            <h1 className="font-display text-paper text-3xl md:text-5xl uppercase tracking-[0.06em]">
              Contact
            </h1>
          </div>
        </div>
      </section>

      {/* Contact us — image + savills info */}
      <section className="bg-paper-soft py-16 md:py-24">
        <div className="container-luxe grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="aspect-[4/3] overflow-hidden bg-ink/5">
            <img
              src={contactImg}
              alt="A warm conversation at The Sandars"
              className="h-full w-full object-cover"
              width={1024}
              height={768}
              loading="lazy"
            />
          </div>

          <div>
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-ink/80 mb-10">
              Contact us
            </h2>

            <div className="inline-block bg-[oklch(0.85_0.18_95)] text-[oklch(0.55_0.22_27)] font-bold tracking-wide text-2xl md:text-3xl px-5 py-3">
              savills
            </div>

            <div className="mt-8 space-y-3 text-ink/85">
              <p>
                <span className="font-medium">Phone:</span>{" "}
                <a href="tel:+441344295375" className="hover:text-rose transition-colors">
                  +44 (0) 1344 295 375
                </a>
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:SunningdaleNewHomes@savills.com"
                  className="text-ink/70 underline underline-offset-2 hover:text-rose transition-colors"
                >
                  SunningdaleNewHomes@savills.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Find us — teal section */}
      <section
        className="py-16 md:py-24 text-paper text-center"
        style={{ backgroundColor: "oklch(0.52 0.035 200)" }}
      >
        <div className="container-luxe">
          <h2 className="font-display text-3xl md:text-5xl uppercase tracking-[0.08em] text-paper">
            Find us
          </h2>
          <p className="mt-8 max-w-2xl mx-auto text-paper/90 leading-relaxed">
            The Sandars is just a 5-minute drive from Junction 12 of the M25 or Junction 3 of the M3
            and is located on the edge of the beautiful village of Thorpe in Surrey, just off Norlands Lane.
          </p>
          <p className="mt-8 text-paper font-medium tracking-wide">
            Coldharbour Lane, Egham, Surrey, TW20 8TD
          </p>
        </div>
      </section>

      {/* Map */}
      <section>
        <div className="w-full h-[360px] md:h-[420px] overflow-hidden">
          <iframe
            title="Map of The Sandars, Coldharbour Lane, Egham, Surrey TW20 8TD"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.5640%2C51.4040%2C-0.5040%2C51.4360&amp;layer=mapnik&amp;marker=51.4198%2C-0.5340"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Get in touch */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "oklch(0.86 0.025 60)" }}>
        <div className="container-luxe">
          <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-center text-ink/85 mb-14 md:mb-16">
            Get in touch
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="aspect-[4/3] overflow-hidden bg-ink/5">
              <img
                src={teaImg}
                alt="A peaceful moment at The Sandars"
                className="h-full w-full object-cover"
                width={1024}
                height={768}
                loading="lazy"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Field label="Title" name="title" placeholder="Title" />

              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="First Name" name="firstName" placeholder="First Name" required />
                <Field label="Surname" name="surname" placeholder="Surname" required />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Email" name="email" type="email" placeholder="Email" required />
                <Field label="Telephone" name="telephone" type="tel" placeholder="Telephone" />
              </div>

              <Field label="Postcode" name="postcode" placeholder="Post code" />

              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3 text-paper text-[12px] tracking-display uppercase transition-colors duration-300 hover:opacity-90"
                style={{ backgroundColor: "oklch(0.52 0.035 200)" }}
              >
                Submit
              </button>

              {submitted && (
                <p className="text-sm text-rose mt-2" role="status">
                  Thank you \u2014 we will be in touch shortly.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

function Field({ label, name, type = "text", placeholder, required }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[13px] font-semibold tracking-wide mb-2"
        style={{ color: "oklch(0.35 0.04 240)" }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-paper border border-[oklch(0.52_0.035_200/0.5)] px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-[oklch(0.52_0.035_200)] focus:ring-1 focus:ring-[oklch(0.52_0.035_200/0.4)] transition-colors"
      />
    </div>
  );
}
