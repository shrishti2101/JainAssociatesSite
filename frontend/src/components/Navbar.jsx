import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { BRAND } from "@/data/brand";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Vision" },
  { to: "/team", label: "Team" },
  { to: "/calculators", label: "Calculators" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`sticky top-0 z-50 transition-all border-b ${
        scrolled ? "glass-nav border-border/60 shadow-[0_1px_0_rgba(10,37,64,0.04)]" : "bg-transparent border-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center group" data-testid="navbar-logo-link">
          <img
            src={BRAND.logoUrl}
            alt={BRAND.name}
            className="h-11 md:h-12 w-auto object-contain"
            data-testid="navbar-logo-image"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1" data-testid="navbar-nav-desktop">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={`nav-link-${n.label.toLowerCase()}`}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-md transition-colors ring-focus ${
                  isActive ? "text-brand-navy bg-brand-navy/5" : "text-foreground/70 hover:text-brand-navy hover:bg-brand-navy/5"
                }`
              }
              end={n.to === "/"}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${BRAND.primaryPhone.replace(/\s/g, "")}`}
            className="text-sm font-medium text-brand-navy/80 flex items-center gap-2"
            data-testid="navbar-phone-link"
          >
            <Phone className="h-4 w-4" /> {BRAND.primaryPhone}
          </a>
          <a
            href={BRAND.loginUrl}
            target="_blank"
            rel="noreferrer"
            data-testid="navbar-cta-button"
            className="inline-flex items-center rounded-sm bg-brand-navy text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-blue transition-colors ring-focus"
          >
            Login
          </a>
        </div>

        <button
          className="md:hidden p-2 rounded-md text-brand-navy"
          onClick={() => setOpen((o) => !o)}
          data-testid="navbar-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-white" data-testid="navbar-mobile-menu">
          <div className="container-page py-3 flex flex-col">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                data-testid={`nav-mobile-link-${n.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `py-3 px-2 text-base font-medium border-b border-border/60 ${
                    isActive ? "text-brand-navy" : "text-foreground/80"
                  }`
                }
                end={n.to === "/"}
              >
                {n.label}
              </NavLink>
            ))}
            <a
              href={BRAND.loginUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex justify-center rounded-sm bg-brand-navy text-white px-5 py-3 text-sm font-semibold"
              data-testid="navbar-mobile-cta"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
