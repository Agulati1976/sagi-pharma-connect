import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Target, Eye, Sparkles, ArrowRight, Building2, Users, Package, Globe2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SAGI Pharmaceutical" },
      { name: "description", content: "Learn about SAGI Pharmaceutical — a Delhi-based pharmaceutical company committed to quality healthcare formulations across India." },
      { property: "og:title", content: "About SAGI Pharmaceutical" },
      { property: "og:description", content: "Delhi-based pharmaceutical company committed to quality, research-backed formulations." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="container mx-auto px-4 py-20 text-center text-primary-foreground md:px-6 md:py-28">
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              About Us
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
              Committed to Quality Healthcare for Every Indian Home.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-white/80">
              SAGI Pharmaceutical is a Delhi-based pharmaceutical company
              dedicated to delivering trusted, research-backed formulations
              across a wide range of therapeutic categories.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="container mx-auto grid gap-12 px-4 py-20 md:grid-cols-2 md:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Our Story</p>
            <h2 className="mt-3 text-3xl font-bold text-accent md:text-4xl">
              Building trust, one prescription at a time.
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              At SAGI Pharmaceutical, we believe quality healthcare should be
              accessible, reliable and effective. Headquartered in Delhi, we have
              built a comprehensive portfolio of pharmaceutical formulations
              spanning bone & joint care, gastroenterology, pain management,
              neurology, anti-infectives, respiratory care and nutraceuticals.
            </p>
            <p>
              Each of our products is the result of careful research,
              clinically-referenced compositions and strict manufacturing
              standards — ensuring that doctors and patients across India can
              prescribe and use SAGI products with complete confidence.
            </p>
            <p className="font-display text-lg italic text-accent">
              “Your Support is our Inspiration.”
            </p>
          </div>
        </section>

        {/* Mission / Vision / Values */}
        <section className="bg-secondary/40 py-20">
          <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3 md:px-6">
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "To deliver effective, affordable and high-quality pharmaceutical formulations that improve patient outcomes across India.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                desc: "To become a trusted name in Indian healthcare by setting new benchmarks in product quality, innovation and clinical reliability.",
              },
              {
                icon: Sparkles,
                title: "Our Values",
                desc: "Integrity, scientific rigour, patient-first thinking and an unwavering commitment to quality in everything we do.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-accent">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 py-20 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Package, n: "20+", l: "Formulations" },
              { icon: Users, n: "8", l: "Therapeutic Areas" },
              { icon: Building2, n: "Delhi", l: "Headquartered in" },
              { icon: Globe2, n: "Pan-India", l: "Distribution" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <s.icon className="mx-auto h-7 w-7 text-primary" />
                <div className="mt-3 font-display text-3xl font-bold text-accent">{s.n}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 pb-20 md:px-6">
          <div
            className="rounded-3xl px-8 py-14 text-center text-primary-foreground"
            style={{ background: "var(--gradient-hero)" }}
          >
            <h2 className="text-3xl font-bold md:text-4xl">Explore our portfolio</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">
              From bone care to gastro therapy — discover formulations that
              clinicians trust.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-6">
              <Link to="/products">
                See All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
