import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { Product } from "@/data/products";
import { Pill, Mail, ArrowRight } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="group h-full cursor-pointer overflow-hidden border-border/70 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-card)]"
      >
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
          <div className="mt-auto flex items-center justify-between pt-3">
            <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-foreground/70">
              {product.category}
            </span>
            <span className="inline-flex items-center text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
              View Details <ArrowRight className="ml-1 h-3 w-3" />
            </span>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Pill className="h-6 w-6" />
              </div>
              <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                {product.form}
              </Badge>
            </div>
            <DialogTitle className="mt-4 font-display text-2xl text-accent">
              {product.name}
            </DialogTitle>
            {product.tagline && (
              <DialogDescription className="text-primary font-medium">
                {product.tagline}
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Composition
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                {product.composition}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground">
                Category: {product.category}
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground">
                Form: {product.form}
              </span>
            </div>
            <div className="rounded-lg border border-dashed border-border bg-secondary/30 p-3 text-xs text-muted-foreground">
              For prescription information and dosage, please consult a registered medical practitioner.
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button asChild>
              <a
                href={`/contact?product=${encodeURIComponent(product.name)}`}
                onClick={() => setOpen(false)}
              >
                <Mail className="mr-2 h-4 w-4" /> Enquire Now
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
