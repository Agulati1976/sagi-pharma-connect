import { Droplet } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-sm">
        <Droplet className="h-5 w-5" fill="currentColor" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-accent">
          SAGI
        </span>
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          Pharmaceutical
        </span>
      </div>
    </Link>
  );
}
