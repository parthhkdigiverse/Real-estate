import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AdminCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  description?: string;
}

export function AdminCard({ title, children, className, description }: AdminCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-ink/5 bg-white p-6 shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      <div className="mb-4">
        <h3 className="font-display text-xl font-medium text-ink">{title}</h3>
        {description && <p className="mt-1 text-xs text-ink/50 uppercase tracking-wider">{description}</p>}
      </div>
      <div>{children}</div>
      {/* Subtle brand touch */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gold/5 blur-3xl" />
    </div>
  );
}
