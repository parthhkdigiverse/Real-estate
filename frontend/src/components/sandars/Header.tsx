import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { Logo } from "./Logo";

type NavItem = {
  label: string;
  to?: string;
  href?: string;
  children?: { label: string; to: string }[];
};

const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Sandars Lifestyle", to: "/lifestyle" },
  {
    label: "Properties",
    href: "/#properties",
    children: [
      { label: "Cullinan House", to: "/properties/cullinan-house" },
      { label: "Pollards Court", to: "/properties/pollards-court" },
      { label: "Eastley End House", to: "/properties/eastley-end-house" },
      { label: "Meadlake House", to: "/properties/meadlake-house" },
    ],
  },
  { label: "Specification", to: "/specification" },
  { label: "FAQ\u2019s", to: "/faqs" },
  { label: "Contact", to: "/contact" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (item: NavItem) => {
    if (item.to) return location.pathname === item.to;
    return false;
  };

  const renderLink = (item: NavItem, onClick?: () => void) => {
    const cls = `inline-flex items-center gap-1 text-[15px] text-ink/85 hover:text-rose transition-colors duration-300 ${
      isActive(item) ? "text-rose underline underline-offset-[10px] decoration-1" : ""
    }`;
    if (item.to) {
      return (
        <Link to={item.to} onClick={onClick} className={cls}>
          {item.label}
          {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
        </Link>
      );
    }
    return (
      <a href={item.href} onClick={onClick} className={cls}>
        {item.label}
        {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
      </a>
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-paper/95 backdrop-blur-md shadow-card" : "bg-paper"
      }`}
    >
      <div className="container-luxe flex items-center justify-between py-5 md:py-6">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <div key={item.label} className="relative group">
              {renderLink(item)}
              {item.children && (
                <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute left-1/2 -translate-x-1/2 top-full pt-4">
                  <ul className="bg-paper shadow-soft border border-border min-w-[220px] py-2">
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <Link
                          to={c.to}
                          className="block px-5 py-2.5 text-sm text-ink/80 hover:text-rose hover:bg-paper-soft transition-colors"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-ink p-2 -mr-2"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-[80vh] border-t border-border" : "max-h-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-luxe py-6 flex flex-col gap-4">
          {NAV.map((item) => (
            <div key={item.label}>
              {renderLink(item, () => setOpen(false))}
              {item.children && (
                <ul className="mt-3 ml-4 flex flex-col gap-2">
                  {item.children.map((c) => (
                    <li key={c.label}>
                      <Link
                        to={c.to}
                        onClick={() => setOpen(false)}
                        className="text-sm text-ink/70 hover:text-rose"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};
