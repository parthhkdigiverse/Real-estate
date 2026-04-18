import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/sandars/Header";
import { Footer } from "@/components/sandars/Footer";
import { fetchPropertyBySlug } from "@/lib/api";
import { useState } from "react";
import { MapPin, Layout, Ruler, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/properties/$slug/apartments/$aptSlug")({
  loader: async ({ params }) => {
    try {
      const property = await fetchPropertyBySlug(params.slug);
      const apartment = property.apartments.find((a: any) => a.slug === params.aptSlug);
      if (!apartment) throw notFound();
      return { property, apartment };
    } catch (error) {
      throw notFound();
    }
  },
  component: ApartmentDetailPage,
});

function ApartmentDetailPage() {
  const { property, apartment } = Route.useLoaderData();
  const [submitted, setSubmitted] = useState(false);

  const handleInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      ...Object.fromEntries(formData.entries()),
      property: property.name,
      apartment: apartment.name,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:8000/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      alert("Failed to send inquiry. Please try again.");
    }
  };

  return (
    <main className="bg-paper text-ink min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-28">
        <div className="container-luxe">
          <div className="relative h-[65vh] min-h-[450px] w-full overflow-hidden">
            <img
              src={apartment.hero_image || property.hero}
              alt={apartment.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-ink/30" />
            <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
              <nav className="flex items-center gap-2 mb-6 text-[10px] tracking-display uppercase text-paper/60">
                <Link to="/" className="hover:text-paper transition-colors">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <Link to={`/properties/${property.slug}`} className="hover:text-paper transition-colors">{property.name}</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-paper">Details</span>
              </nav>
              <h2 className="text-paper/90 tracking-display text-[10px] md:text-xs uppercase mb-4">
                {property.name}
              </h2>
              <h1 className="font-display text-white text-5xl md:text-7xl lg:text-[84px] uppercase tracking-tight leading-none mb-6">
                {apartment.name}
              </h1>
              <p className="text-[11px] md:text-xs tracking-display uppercase text-paper/80 mb-2">
                {property.showApartmentNote}
              </p>
              <p className="text-[10px] md:text-[11px] tracking-display uppercase text-paper/60">
                {property.hours}
              </p>
              <div className="mt-10 flex items-center gap-10 text-[11px] font-bold tracking-display uppercase text-paper/90">
                <span>{apartment.type}</span>
                <span className="h-4 w-[1px] bg-paper/20" />
                <span>{apartment.size}</span>
                <span className="h-4 w-[1px] bg-paper/20" />
                <span>{apartment.price}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floorplan Content Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-luxe max-w-[1300px]">
          <h2 className="font-display text-[44px] md:text-[56px] uppercase tracking-[0.2em] mb-16 text-ink/80 text-center lg:text-left">
            Floorplan
          </h2>
          
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24 items-start">
            {/* Left: Major Visual */}
            <div className="flex items-center justify-center">
              {apartment.floorplan_image ? (
                <img 
                  src={apartment.floorplan_image} 
                  alt={`${apartment.name} Floorplan`} 
                  className="w-full h-auto max-h-[800px] object-contain"
                />
              ) : (
                <div className="aspect-[4/5] w-full bg-paper-soft flex items-center justify-center text-ink/20 italic text-sm">
                  Floorplan available on request
                </div>
              )}
            </div>

            {/* Right: Map & Table */}
            <div className="space-y-16 lg:pt-8">
              {/* Mini Map */}
              {apartment.location_map_image && (
                <div className="flex justify-center lg:justify-end pr-4">
                  <div className="max-w-[180px] opacity-80">
                    <img 
                      src={apartment.location_map_image} 
                      alt="Unit Location Key" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}

              {/* Specs Table */}
              <div className="overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <tbody className="divide-y divide-ink/5">
                    {apartment.dimensions && apartment.dimensions.length > 0 ? (
                      apartment.dimensions.map((dim: any, i: number) => (
                        <tr key={i} className="group">
                          <td className="py-4 pr-10 text-[13px] md:text-[14px] font-medium text-ink uppercase tracking-wider min-w-[140px]">
                            {dim.room}
                          </td>
                          <td className="py-4 pr-8 text-[13px] text-ink/60 font-medium">
                            {dim.metric}
                          </td>
                          <td className="py-4 text-[13px] text-ink/60 font-medium whitespace-nowrap">
                            {dim.imperial}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-8 text-center text-ink/30 italic text-sm">
                          Detailed room specifications coming soon
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="pt-2">
                <p className="text-[10px] leading-relaxed text-ink/30 uppercase tracking-widest font-bold">
                  * All dimensions are approximate and for guidance only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section - Light Beige Background */}
      <section className="py-24 md:py-36 bg-[#F2ECE4]">
        <div className="container-luxe max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-[54px] uppercase tracking-[0.1em] text-ink leading-tight">
              Book a visit or request a call back
            </h2>
            <p className="mt-8 text-[13px] md:text-[14px] font-medium text-ink/60 max-w-xl mx-auto tracking-tight">
              Fill in your details below and a member of our team will contact you shortly
            </p>
          </div>

          <form onSubmit={handleInquiry} className="space-y-8 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div className="md:col-span-2">
                <Field label="Title" name="title" placeholder="Title" />
              </div>
              
              <Field label="First Name" name="firstName" placeholder="First Name" required />
              <Field label="Surname" name="surname" placeholder="Surname" required />
              
              <Field label="Email" name="email" type="email" placeholder="Email" required />
              <Field label="Telephone" name="telephone" type="tel" placeholder="Telephone" />
              
              <div className="md:col-span-2">
                <Field label="Postcode" name="postcode" placeholder="Post code" />
              </div>
            </div>
            
            <div className="flex justify-center pt-8">
              <button
                type="submit"
                className="w-full md:w-auto px-16 py-4 bg-[#576D69] text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-ink hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                disabled={submitted}
              >
                {submitted ? "Inquiry Received" : "Submit"}
              </button>
            </div>
            
            {submitted && (
              <div className="pt-6 text-center animate-in fade-in duration-500">
                <p className="text-ink font-display text-xl uppercase tracking-widest">
                  Thank you.
                </p>
                <p className="mt-2 text-ink/60 text-xs font-bold uppercase tracking-widest">
                  Our team will be in touch shortly regarding {apartment.name}.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Field({ label, name, type = "text", placeholder, required }: any) {
  return (
    <div className="space-y-2.5">
      <label htmlFor={name} className="block text-[11px] font-bold tracking-[0.1em] uppercase text-ink/80">
        {label} {required && <span className="text-rose opacity-50">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-white border border-transparent border-b-ink/10 px-0 py-3 text-ink text-sm placeholder:text-ink/20 focus:outline-none focus:border-b-rose transition-all bg-transparent"
      />
    </div>
  );
}
