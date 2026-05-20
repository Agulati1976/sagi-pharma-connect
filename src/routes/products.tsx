import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { products, categories, type ProductCategory } from "@/data/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — SAGI Pharmaceutical" },
      { name: "description", content: "Browse SAGI Pharmaceutical's complete portfolio of 20+ formulations across bone care, gastro, pain, neuro, anti-infective, nutraceutical, respiratory and allergy categories." },
      { property: "og:title", content: "Our Products — SAGI Pharmaceutical" },
      { property: "og:description", content: "Complete portfolio of SAGI Pharmaceutical formulations." },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: Products,
});

type Filter = "All" | ProductCategory;

function Products() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = filter === "All" || p.category === filter;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.composition.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [filter, query]);

  const chips: Filter[] = ["All", ...categories];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="container mx-auto px-4 py-16 text-center text-primary-foreground md:px-6 md:py-20">
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              Comprehensive Product Portfolio
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold md:text-5xl">
              Our Products
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Browse our complete portfolio of {products.length} formulations
              across {categories.length} therapeutic categories.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 md:px-6">
          {/* Search */}
          <div className="relative mx-auto max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or composition..."
              className="pl-10"
            />
          </div>

          {/* Filter chips */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {chips.map((c) => {
              const active = filter === c;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-foreground/80 hover:border-primary/40 hover:text-primary"
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Results */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Showing {filtered.length} of {products.length} products
          </div>

          {filtered.length === 0 ? (
            <div className="mx-auto mt-12 max-w-md rounded-2xl border border-dashed border-border p-10 text-center">
              <p className="text-muted-foreground">
                No products match your search. Try a different keyword or category.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.name} product={p} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
