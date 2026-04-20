import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/sandars/Header";
import { Footer } from "@/components/sandars/Footer";
import { API_BASE_URL } from "@/lib/api";
import contactImg from "@/assets/contact-conversation.jpg";
import teaImg from "@/assets/contact-tea.jpg";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact \u2014 The Sandars" },
      { name: "description", content: "Get in touch with The Sandars luxury later living development in Egham, Surrey. Sales managed by Savills." },
      { property: "og:title", content: "Contact \u2014 The Sandars" },
      { property: "og:description", content: "Bespoke retirement lifestyles in Egham, Surrey. Get in touch with our sales team today." },
      { property: "og:image", content: contactImg },
      { name: "twitter:image", content: contactImg },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/settings`);
        const data = await res.json();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch contact settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Removed all hardcoded fallbacks
  const contact = {
    phone: settings?.phone || "",
    email: settings?.email || "",
    address: settings?.address || ""
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        (e.target as HTMLFormElement).reset();
      } else {
        console.error("Failed to submit inquiry");
        toast.error("Sorry, there was an error submitting your inquiry. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error("Sorry, there was a connection error. Please try again.");
    }
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

            <div className="mt-8 space-y-3 text-ink/85 min-h-[100px]">
              {loading ? (
                <div className="flex items-center gap-3 text-ink/30 italic text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Optimizing contact details...
                </div>
              ) : (
                <>
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="hover:text-rose transition-colors">
                      {contact.phone}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-ink/70 underline underline-offset-2 hover:text-rose transition-colors"
                    >
                      {contact.email}
                    </a>
                  </p>
                </>
              )}
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
          <div className="mt-8 text-paper font-medium tracking-wide">
            {loading ? (
              <span className="opacity-50 animate-pulse">Locating development...</span>
            ) : (
              contact.address
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 md:py-16">
        <div className="container-luxe">
          <div className="w-full h-[360px] md:h-[500px] overflow-hidden rounded-3xl border border-ink/5 relative bg-paper-soft shadow-inner-luxe group cursor-pointer">
            {/* Transparent click overlay for redirection */}
            <a 
              href="https://www.openstreetmap.org/?mlat=51.4198&mlon=-0.5340#map=16/51.4198/-0.5340" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 block"
              aria-label="View on OpenStreetMap"
            >
              <div className="absolute top-6 right-6 z-20 bg-paper/90 backdrop-blur-md px-4 py-2 rounded-full border border-ink/5 text-[10px] uppercase tracking-widest font-bold text-ink opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-lg">
                View on Map
              </div>
            </a>
            
            {/* We use a slight height increase and negative offset to clip the attribution for a cleaner look */}
            <iframe
              title={`Map of ${contact.address}`}
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.5640%2C51.4040%2C-0.5040%2C51.4360&amp;layer=mapnik&amp;marker=51.4198%2C-0.5340"
              className="absolute top-0 left-0 w-full h-[calc(100%+30px)] border-0 grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out opacity-85 group-hover:opacity-100"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
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
                <Field label="First Name" name="firstName" placeholder="First Name" />
                <Field label="Surname" name="surname" placeholder="Surname" />
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
                  Thank you — we will be in touch shortly.
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
