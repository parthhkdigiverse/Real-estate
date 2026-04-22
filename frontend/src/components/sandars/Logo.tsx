import { Link } from "@tanstack/react-router";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => (
  <Link
    to="/"
    aria-label="The Sandars — home"
    className={`font-display text-ink tracking-display text-2xl md:text-[28px] leading-none whitespace-nowrap ${className}`}
  >
    THE SANDARS
  </Link>
);
