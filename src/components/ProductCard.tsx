import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/products";
import { Pill } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group h-full overflow-hidden border-border/70 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-card)]">
      <CardContent className="flex h-full flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Pill className="h-5 w-5" />
          </div>
          <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
            {product.form}
          </Badge>
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-accent">{product.name}</h3>
          {product.tagline && (
            <p className="mt-1 text-xs font-medium text-primary">{product.tagline}</p>
          )}
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4">
          {product.composition}
        </p>
        <div className="mt-auto pt-3">
          <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-foreground/70">
            {product.category}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
