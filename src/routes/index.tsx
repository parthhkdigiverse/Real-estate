import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/sandars/Header";
import { Hero } from "@/components/sandars/Hero";
import { About } from "@/components/sandars/About";
import { LifeGrid } from "@/components/sandars/LifeGrid";
import { Lifestyle } from "@/components/sandars/Lifestyle";
import { Availability } from "@/components/sandars/Availability";
import { Footer } from "@/components/sandars/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Sandars \u2014 Luxury Later Living in Surrey" },
      { name: "description", content: "A unique state of the art development for luxury later living, set in 27 acres of Surrey parkland for those 55 and over." },
      { property: "og:title", content: "The Sandars \u2014 Luxury Later Living in Surrey" },
      { property: "og:description", content: "Luxury 1 & 2 bedroom apartments set in 27 acres of parkland near Egham, Surrey." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-paper text-ink">
      <Header />
      <Hero />
      <About />
      <LifeGrid />
      <Lifestyle />
      <Availability />
      <Footer />
    </main>
  );
}
