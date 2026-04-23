import { Link } from "@tanstack/react-router";
import { useState } from "react";

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo = ({ className = "", variant = 'dark', size = 'md' }: LogoProps) => {
  const [imgError, setImgError] = useState(false);

  const sizes = {
    sm: { img: 'h-8', sandars: 'text-[10px]' },
    md: { img: 'h-10 md:h-12', sandars: 'text-[12px] md:text-[14px]' },
    lg: { img: 'h-24 md:h-28', sandars: 'text-[20px] md:text-[24px]' }
  };

  // Using /assets/ as it maps to the public directory in Vite
  const logoPath = "/assets/eden-logo.png";

  return (
    <Link
      to="/"
      aria-label="Eden Retirement Living — home"
      className={`group no-underline inline-flex items-center gap-4 ${className}`}
    >
      <div className="relative flex items-center">
        {!imgError ? (
          <img 
            src={logoPath} 
            alt="Eden" 
            onError={() => {
              console.error("Logo failed to load at:", logoPath);
              setImgError(true);
            }}
            className={`${sizes[size].img} w-auto object-contain transition-all duration-300 group-hover:opacity-80 ${
              variant === 'light' ? 'brightness-0 invert' : ''
            }`}
          />
        ) : (
          <div className="flex flex-col items-start select-none">
            <span className={`font-['Great_Vibes'] leading-[0.6] transition-colors ${
              size === 'sm' ? 'text-[24px]' : size === 'md' ? 'text-[32px]' : 'text-[64px]'
            } ${
              variant === 'dark' ? 'text-gold' : 'text-paper'
            }`}>
              Eden
            </span>
            <span className={`uppercase tracking-[0.15em] font-sans font-medium mt-3 whitespace-nowrap ${
              size === 'sm' ? 'text-[6px]' : size === 'md' ? 'text-[8px]' : 'text-[12px]'
            } ${
              variant === 'dark' ? 'text-ink' : 'text-paper/60'
            }`}>
              Retirement Living
            </span>
          </div>
        )}
      </div>

      <div className={`h-8 w-[1px] ${variant === 'dark' ? 'bg-ink/10' : 'bg-paper/20'} ${size === 'lg' ? 'h-16' : ''}`} aria-hidden="true" />

      <div className="flex flex-col items-start leading-[1.1]">
        <span className={`font-display tracking-[0.15em] uppercase transition-colors ${sizes[size].sandars} ${
          variant === 'dark' ? 'text-ink' : 'text-paper'
        }`}>
          The Sandars
        </span>
      </div>
    </Link>
  );
};
