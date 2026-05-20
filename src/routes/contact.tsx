import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { COMPANY } from "@/data/products";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SAGI Pharmaceutical" },
      { name: "description", content: "Contact SAGI Pharmaceutical, Delhi. Call us, email us, or visit our office at Shakti Nagar Extn., Delhi-110007." },
      { property: "og:title", content: "Contact SAGI Pharmaceutical" },
      { property: "og:description", content: "Reach SAGI Pharmaceutical in Delhi for inquiries, distribution and product information." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [prefill, setPrefill] = useState<{ subject: string; message: string }>({
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const product = params.get("product");
    if (product) {
      setPrefill({
        subject: `Enquiry about ${product}`,
        message: `Hello SAGI Pharmaceutical team,\n\nI'd like more information about ${product}.\n\nThank you.`,
      });
    }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thanks! We'll get back to you within 1-2 business days.");
      (e.target as HTMLFormElement).reset();
      setPrefill({ subject: "", message: "" });
    }, 600);
  }

  const mapsQuery = encodeURIComponent(COMPANY.address);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <Toaster richColors position="top-center" />
      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="container mx-auto px-4 py-16 text-center text-primary-foreground md:px-6 md:py-20">
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              Get in Touch
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold md:text-5xl">
              We'd love to hear from you.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Whether you're a distributor, clinician, or patient — our team is
              here to help.
            </p>
          </div>
        </section>

        <section className="container mx-auto grid gap-10 px-4 py-20 md:grid-cols-5 md:px-6">
          {/* Info */}
          <div className="space-y-6 md:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-accent">Visit Us</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{COMPANY.address}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-accent">Call Us</h3>
                  <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                    {COMPANY.phones.map((p) => (
                      <li key={p}>
                        <a href={`tel:${p.replace(/\s+/g, "")}`} className="hover:text-primary">
                          {p}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-accent">Email</h3>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="mt-1 block break-all text-sm text-muted-foreground hover:text-primary"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-accent">Business Hours</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Mon – Sat: 10:00 AM – 7:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] md:p-10">
              <h2 className="text-2xl font-bold text-accent">Send us a message</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form and we'll get back to you shortly.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+91 ..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" defaultValue={prefill.subject} key={prefill.subject} placeholder="Distribution inquiry, product info, etc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" defaultValue={prefill.message} key={`m-${prefill.subject}`} required rows={5} placeholder="Tell us how we can help..." />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
                  {submitting ? "Sending..." : (<>Send Message <Send className="ml-2 h-4 w-4" /></>)}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="container mx-auto px-4 pb-20 md:px-6">
          <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)]">
            <iframe
              title="SAGI Pharmaceutical location"
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, display: "block" }}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
