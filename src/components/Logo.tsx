import { Link } from "@tanstack/react-router";
import logo from "@/assets/sagi-logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center ${className}`} aria-label="SAGI Pharmaceutical home">
      <img src={logo} alt="SAGI Pharmaceutical" className="h-10 w-auto md:h-11" />
    </Link>
  );
}
