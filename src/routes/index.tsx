import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import heroImage from "@/assets/hero-pharma.jpg";
import {
  ArrowRight,
  Bone,
  Pill,
  Activity,
  Brain,
  ShieldCheck,
  Leaf,
  CheckCircle2,
  FlaskConical,
  Heart,
  Award,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SAGI Pharmaceutical — Trusted Healthcare Formulations" },
      {
        name: "description",
        content:
          "SAGI Pharmaceutical offers a comprehensive portfolio of 20+ research-backed formulations across bone care, gastro, pain, neuro, anti-infectives and nutraceuticals.",
      },
      { property: "og:title", content: "SAGI Pharmaceutical — Trusted Healthcare Formulations" },
      { property: "og:description", content: "Research-backed pharmaceutical formulations from Delhi, India." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const therapeuticAreas = [
  { icon: Bone, title: "Bone & Joint Care", desc: "Calcium, collagen and joint mobility formulations." },
  { icon: Activity, title: "Gastro Care", desc: "PPIs, probiotics and GI regulators." },
  { icon: Pill, title: "Pain Management", desc: "NSAIDs, muscle relaxants and enzyme combinations." },
  { icon: ShieldCheck, title: "Anti-Infectives", desc: "Broad-spectrum anti-fungal therapy." },
  { icon: Leaf, title: "Nutraceuticals", desc: "Antioxidants, immunity and vitality boosters." },
  { icon: Brain, title: "Neuro Care", desc: "Gabapentin and pregabalin-based therapies." },
];

const featuredNames = [
  "Sagical Strong",
  "SAGPRO-LB",
  "SAGHEAL",
  "Sagpro-DSR",
  "SAGLY-MAX",
  "Sagitra-100",
];

function Home() {
  const featured = products.filter((p) => featuredNames.includes(p.name));

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <img
            src={heroImage}
            alt="SAGI Pharmaceutical research laboratory"
            width={1920}
            height={1080}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.22 0.08 265 / 0.92) 0%, oklch(0.4 0.16 265 / 0.85) 60%, oklch(0.45 0.18 263 / 0.78) 100%)",
            }}
          />
          <div className="absolute inset-0 -z-10 opacity-15 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
          <div className="container mx-auto grid gap-12 px-4 py-20 md:grid-cols-2 md:items-center md:px-6 md:py-28">
            <div className="text-primary-foreground">
              <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                Delhi · India
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.05] md:text-6xl">
                Your Health,
                <br />
                <span className="text-primary-glow">Our Commitment.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base text-white/80 md:text-lg">
                SAGI Pharmaceutical brings you a comprehensive portfolio of
                trusted, research-backed formulations — engineered for better
                absorption, faster results and complete patient care.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/products">
                    Explore Products <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "20+", l: "Formulations" },
                  { n: "8", l: "Therapeutic Areas" },
                  { n: "100%", l: "Quality Assured" },
                  { n: "Pan-India", l: "Distribution" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md"
                  >
                    <div className="font-display text-3xl font-bold text-white">{s.n}</div>
                    <div className="mt-1 text-sm text-white/70">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-y border-border bg-secondary/40">
          <div className="container mx-auto grid gap-6 px-4 py-8 text-center md:grid-cols-3 md:px-6">
            {[
              { icon: FlaskConical, t: "Research-Backed", d: "Clinically referenced compositions" },
              { icon: Award, t: "Quality Assured", d: "Manufactured to pharmacopoeial standards" },
              { icon: Heart, t: "Patient First", d: "Therapies designed for real outcomes" },
            ].map((i) => (
              <div key={i.t} className="flex items-center justify-center gap-3">
                <i.icon className="h-6 w-6 text-primary" />
                <div className="text-left">
                  <div className="text-sm font-semibold text-accent">{i.t}</div>
                  <div className="text-xs text-muted-foreground">{i.d}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Therapeutic areas */}
        <section className="container mx-auto px-4 py-20 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              What we cover
            </p>
            <h2 className="mt-3 text-3xl font-bold text-accent md:text-4xl">
              Therapeutic Areas
            </h2>
            <p className="mt-4 text-muted-foreground">
              A focused portfolio spanning the most common prescription needs in primary care.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {therapeuticAreas.map((a) => (
              <div
                key={a.title}
                className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-card)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <a.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-accent">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured products */}
        <section className="bg-secondary/40 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Featured
                </p>
                <h2 className="mt-3 text-3xl font-bold text-accent md:text-4xl">
                  Trusted Formulations
                </h2>
              </div>
              <Button asChild variant="outline">
                <Link to="/products">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <ProductCard key={p.name} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Why SAGI */}
        <section className="container mx-auto px-4 py-20 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Why SAGI
              </p>
              <h2 className="mt-3 text-3xl font-bold text-accent md:text-4xl">
                Built on Quality. Driven by Care.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every SAGI formulation is engineered with the clinician and the
                patient in mind — combining proven actives, modern delivery
                systems and uncompromising quality control.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Comprehensive portfolio of 20+ formulations",
                  "Bioavailability-focused compositions",
                  "Strict manufacturing standards",
                  "Pan-India distribution network",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-3xl border border-border p-10 text-center"
              style={{ background: "var(--gradient-soft)" }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-elevated)]">
                <Heart className="h-8 w-8" />
              </div>
              <p className="mt-6 font-display text-2xl font-semibold italic text-accent">
                “Your Support is our Inspiration.”
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                The promise that drives every product we create.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-16 text-center text-primary-foreground md:px-6">
            <h2 className="text-3xl font-bold md:text-4xl">
              Partner with SAGI Pharmaceutical
            </h2>
            <p className="max-w-2xl text-white/80">
              Looking to stock our products, become a distributor, or enquire
              about a specific formulation? Our team is ready to help.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
