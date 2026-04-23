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
      { name: "description", content: "Get in touch with The Sandars luxury later living development in Egham, Surrey." },
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
            backgroundColor: "var(--forest)",
            backgroundImage:
              "repeating-linear-gradient(45deg, oklch(0.4 0.04 160) 0 1px, transparent 1px 22px), repeating-linear-gradient(-45deg, oklch(0.4 0.04 160) 0 1px, transparent 1px 22px)",
          }}
        >
          <div className="container-luxe h-full flex items-center">
            <h1 className="font-display text-paper text-3xl md:text-5xl uppercase tracking-[0.06em]">
              Contact
            </h1>
          </div>
        </div>
      </section>

      {/* Contact us */}
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

            <div className="mt-8 space-y-3 text-ink/85 min-h-[100px]">
              {loading ? (
                <div className="flex items-center gap-3 text-ink/30 italic text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Optimizing contact details...
                </div>
              ) : (
                <>
                  {contact.phone && contact.phone.trim() !== "" && (
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="hover:text-gold transition-colors">
                        {contact.phone}
                      </a>
                    </p>
                  )}
                  {contact.email && contact.email.trim() !== "" && (
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-ink/70 underline underline-offset-2 hover:text-gold transition-colors"
                      >
                        {contact.email}
                      </a>
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Find us — teal section */}
      <section
        className="py-16 md:py-24 text-paper text-center"
        style={{ backgroundColor: "var(--forest)" }}
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

      {/* Map Section */}
      <section className="py-12 md:py-16 bg-paper">
        <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden group cursor-pointer shadow-inner">
          {/* Clickable Overlay */}
          <a 
            href="https://maps.app.goo.gl/vZpbzjuWmdsk9yQG6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-0 z-10 block"
            aria-label="View on Google Maps"
          >
            <div className="absolute top-8 left-10 z-20 bg-white/95 backdrop-blur-md px-6 py-2 rounded-full border border-ink/5 text-[10px] uppercase tracking-widest font-bold text-ink opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-lg">
              View on Google Maps
            </div>
          </a>
          
          <iframe
            title={`Map of ${contact.address}`}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19909.12130396001!2d-0.5208182!3d51.4096667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487677cee2ffa2ad%3A0xdbc5af55e8767878!2sEden%20Retirement%20Living!5e0!3m2!1sen!2sin!4v1713763784123!5m2!1sen!2sin"
            className="absolute top-0 left-0 w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out opacity-85 group-hover:opacity-100"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Location Label - Refined */}
          <div className="absolute bottom-8 left-8 z-20 pointer-events-none hidden md:block">
            <div className="bg-white/80 backdrop-blur-xl px-6 py-3 border border-ink/5 shadow-2xl flex items-center gap-4">
              <div className="w-1 h-8 bg-gold/40" />
              <div className="flex flex-col">
                <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-ink">Eden Retirement Living</span>
                <span className="text-[10px] uppercase tracking-[0.1em] text-ink/40">{contact.address || "Cemex House, Coldharbour Ln, Egham TW20 8TD"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get in touch */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "var(--stone)" }}>
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

              <Field 
                label="Message" 
                name="message" 
                placeholder="Your enquiry or specific requirements..." 
                isTextArea 
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3 text-paper text-[12px] tracking-display uppercase transition-colors duration-300 hover:bg-forest"
                style={{ backgroundColor: "var(--gold)" }}
              >
                Submit
              </button>

              {submitted && (
                <p className="text-sm text-gold mt-2" role="status">
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
  isTextArea?: boolean;
}

function Field({ label, name, type = "text", placeholder, required, isTextArea }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[14px] font-semibold tracking-wide mb-2 text-ink/70"
      >
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          rows={4}
          className="w-full bg-paper border border-road/30 px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40 transition-colors resize-none"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className="w-full bg-paper border border-road/30 px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40 transition-colors"
        />
      )}
    </div>
  );
}
