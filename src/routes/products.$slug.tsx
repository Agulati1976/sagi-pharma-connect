import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pill,
  Mail,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  FlaskConical,
  Stethoscope,
} from "lucide-react";
import {
  getProductBySlug,
  products,
  slugify,
  categoryInfo,
} from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) {
      return {
        meta: [{ title: "Product not found — SAGI Pharmaceutical" }],
      };
    }
    const title = `${product.name} — ${product.category} | SAGI Pharmaceutical`;
    const description = `${product.name} (${product.form}): ${product.composition}`.slice(
      0,
      155,
    );
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
      links: [{ rel: "canonical", href: `/products/${params.slug}` }],
    };
  },
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold text-accent">Product not found</h1>
        <p className="mt-3 text-muted-foreground">
          The product you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="mt-6">
          <Link to="/products">Browse all products</Link>
        </Button>
      </main>
      <SiteFooter />
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: NonNullable<ReturnType<typeof getProductBySlug>> };
  const info = categoryInfo[product.category];
  const related = products
    .filter((p) => p.category === product.category && p.name !== product.name)
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="container mx-auto px-4 py-14 text-primary-foreground md:px-6 md:py-20">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm text-white/85 transition-opacity hover:opacity-100 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> Back to products
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="bg-white/15 text-white border-white/20">
                {product.category}
              </Badge>
              <Badge variant="secondary" className="bg-white/15 text-white border-white/20">
                {product.form}
              </Badge>
            </div>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold md:text-5xl">
              {product.name}
            </h1>
            {product.tagline && (
              <p className="mt-3 max-w-2xl text-lg text-white/85">{product.tagline}</p>
            )}
          </div>
        </section>

        {/* Main content */}
        <section className="container mx-auto px-4 py-14 md:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="space-y-10 lg:col-span-2">
              {/* Composition */}
              <div>
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-accent">
                  <FlaskConical className="h-5 w-5 text-primary" /> Composition
                </h2>
                <p className="mt-3 rounded-xl border border-border bg-secondary/40 p-5 text-base leading-relaxed text-foreground">
                  {product.composition}
                </p>
              </div>

              {/* Indications */}
              <div>
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-accent">
                  <Stethoscope className="h-5 w-5 text-primary" /> Indications
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{info.description}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {info.indications.map((i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 rounded-lg border border-border bg-background p-3 text-sm text-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dosage / Usage */}
              <div>
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-accent">
                  <Pill className="h-5 w-5 text-primary" /> Dosage & Administration
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  To be taken as directed by a registered medical practitioner. Dosage
                  varies with patient age, weight, indication and concomitant therapy.
                  Do not self-medicate or alter the prescribed schedule.
                </p>
                <div className="mt-3 rounded-lg border border-dashed border-border bg-secondary/30 p-4 text-xs text-muted-foreground">
                  Store below 30°C in a dry place, protected from light. Keep out of
                  reach of children. Read the enclosed pack insert before use.
                </div>
              </div>

              {/* Quality */}
              <div>
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-accent">
                  <ShieldCheck className="h-5 w-5 text-primary" /> Quality Assurance
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  Manufactured at WHO-GMP certified facilities under strict quality
                  control. Every batch is tested for identity, purity, potency and
                  stability to ensure consistent therapeutic outcomes.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Pill className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-accent">
                  Product Snapshot
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-3 border-b border-border pb-2">
                    <dt className="text-muted-foreground">Brand</dt>
                    <dd className="font-medium text-foreground">{product.name}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-border pb-2">
                    <dt className="text-muted-foreground">Category</dt>
                    <dd className="font-medium text-foreground">{product.category}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-border pb-2">
                    <dt className="text-muted-foreground">Dosage Form</dt>
                    <dd className="font-medium text-foreground">{product.form}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Rx</dt>
                    <dd className="font-medium text-foreground">Prescription only</dd>
                  </div>
                </dl>
                <Button asChild className="mt-6 w-full">
                  <a href={`/contact?product=${encodeURIComponent(product.name)}`}>
                    <Mail className="mr-2 h-4 w-4" /> Enquire Now
                  </a>
                </Button>
              </div>

              <div
                className="rounded-2xl p-6 text-primary-foreground"
                style={{ background: "var(--gradient-hero)" }}
              >
                <h3 className="font-display text-lg font-bold">Looking for stockists?</h3>
                <p className="mt-2 text-sm text-white/85">
                  Connect with our team for distribution, PCD franchise and bulk orders.
                </p>
                <Button asChild variant="secondary" className="mt-4 w-full">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </aside>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-border bg-secondary/30 py-14">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-accent md:text-3xl">
                    Related {product.category} products
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Other formulations from the same therapeutic category.
                  </p>
                </div>
                <Link
                  to="/products"
                  className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex"
                >
                  View all <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProductCard key={p.name} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

export { slugify };
