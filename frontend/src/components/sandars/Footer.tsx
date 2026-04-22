import { Logo } from "./Logo";
import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { submitInquiry, API_BASE_URL } from "@/lib/api";
import { toast } from "sonner";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/settings`);
        const data = await res.json();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch footer settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await submitInquiry({
        email,
        property: "Newsletter Signup",
        createdAt: new Date().toISOString(),
      });
      toast.success("Welcome to the Inner Circle. Subscription confirmed.");
      setEmail("");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // No more hardcoded strings here. Relying strictly on DB or empty strings during load.
  const contact = {
    phone: settings?.phone || "",
    email: settings?.email || "",
    address: settings?.address || "",
    instagram: settings?.instagram || "#",
    facebook: settings?.facebook || "#",
    linkedin: settings?.linkedin || "#"
  };

  return (
    <footer className="relative bg-ink text-paper pt-24 pb-12 overflow-hidden min-h-[400px]">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      
      <div className="container-luxe">
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5">
            <Logo className="!text-paper !font-display !text-5xl md:!text-6xl !tracking-display mb-8" />
            <div className="flex flex-col items-start translate-x-[-4px] mb-8">
              <span className="font-['Great_Vibes'] text-[72px] md:text-[84px] text-gold/80 leading-[0.6] opacity-90">Eden</span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-paper/40 font-sans font-light mt-4 pl-1">
                Retirement Living
              </span>
            </div>
            <p className="max-w-md text-paper/60 font-sans text-sm md:text-base leading-relaxed tracking-tight">
              A unique state-of-the-art development for luxury later living, offering bespoke retirement lifestyles in the heart of Surrey.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-paper-soft/5 backdrop-blur-sm border border-paper/10 p-8 md:p-12 relative group">
              <h3 className="font-display text-2xl md:text-3xl mb-4 text-paper">Join the Inner Circle</h3>
              <p className="text-paper/50 text-xs md:text-sm uppercase tracking-widest font-medium mb-8">
                Exclusive previews of off-market collection.
              </p>
              
              <form onSubmit={handleSubscribe} className="relative max-w-lg">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  disabled={isSubmitting}
                  className="w-full bg-transparent border-b border-paper/20 pb-4 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-paper/20 disabled:opacity-50"
                  required
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-0 bottom-4 text-gold hover:translate-x-1 transition-transform group/btn flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin text-paper/40" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Middle Section: Navigation & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-t border-paper/10 pt-20">
          {/* Navigation */}
          <div className="space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">Development</h4>
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-paper/60 hover:text-paper transition-colors text-sm font-sans tracking-tight">Home</Link>
              <Link to="/specification" className="text-paper/60 hover:text-paper transition-colors text-sm font-sans tracking-tight">Specification</Link>
              <Link to="/contact" className="text-paper/60 hover:text-paper transition-colors text-sm font-sans tracking-tight">Contact</Link>
            </nav>
          </div>

          {/* Location */}
          <div className="space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">Location</h4>
            <address className="not-italic space-y-1 text-paper/60 font-sans text-sm leading-relaxed tracking-tight">
              {loading ? (
                <div className="w-48 h-12 bg-paper/5 animate-pulse rounded-md" />
              ) : (
                contact.address.split(',').map((line, i) => (
                  <p key={i}>{line.trim()}{i < contact.address.split(',').length - 1 ? ',' : ''}</p>
                ))
              )}
            </address>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">Enquiries</h4>
            <div className="space-y-3">
              {loading ? (
                <div className="space-y-3">
                  <div className="w-32 h-6 bg-paper/5 animate-pulse rounded-md" />
                  <div className="w-48 h-4 bg-paper/5 animate-pulse rounded-md" />
                </div>
              ) : (
                <>
                  <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="block text-paper text-lg font-bold font-sans hover:text-gold transition-colors">
                    {contact.phone}
                  </a>
                  <a href={`mailto:${contact.email}`} className="block text-paper/60 text-sm font-bold font-sans hover:text-paper transition-colors">
                    {contact.email}
                  </a>
                </>
              )}
            </div>
            <div className="flex items-center gap-4 pt-4">
              <a href={contact.instagram} className="p-2 border border-paper/10 rounded-full hover:border-gold/50 hover:text-gold transition-all duration-300">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={contact.facebook} className="p-2 border border-paper/10 rounded-full hover:border-gold/50 hover:text-gold transition-all duration-300">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={contact.linkedin} className="p-2 border border-paper/10 rounded-full hover:border-gold/50 hover:text-gold transition-all duration-300">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Partner */}
          <div className="lg:text-right flex flex-col items-start lg:items-end justify-between h-full">
            <div className="space-y-4">
              <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">Representation</h4>
              <div className="bg-gold w-[110px] h-[110px] flex items-center justify-center p-4 shadow-xl">
                <span className="text-ink text-[24px] font-black lowercase tracking-tighter font-sans leading-none">
                  savills
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-paper/10 pt-10 flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="flex items-center gap-8 text-[11px] tracking-widest uppercase font-bold text-paper/30">
            <span>© 2026 Eden Retirement Living</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
