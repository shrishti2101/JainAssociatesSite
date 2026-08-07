import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown, TrendingUp, ShieldCheck, Layers } from "lucide-react";
import { BRAND } from "@/data/brand";

const KNOWLEDGE_LINKS = [
  {
    to: "/knowledge/investment",
    label: "Investment",
    description: "Mutual funds, SIPs and goal-based portfolios to grow wealth steadily.",
    icon: TrendingUp,
  },
  {
    to: "/knowledge/insurance",
    label: "Insurance",
    description: "Life, health and motor cover to protect your family and savings.",
    icon: ShieldCheck,
  },
  {
    to: "/knowledge/others",
    label: "Others",
    description: "Bonds, loan against securities and other planning essentials.",
    icon: Layers,
  },
];

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Vision" },
  { to: "/team", label: "Team" },
  { label: "Knowledge", children: KNOWLEDGE_LINKS },
  { to: "/calculators", label: "Calculators" },
  { to: "/contact", label: "Contact" },
];

const linkClass = ({ isActive }) =>
  `px-4 py-2 text-sm font-medium rounded-md transition-colors ring-focus ${
    isActive ? "text-brand-navy bg-brand-navy/5" : "text-foreground/70 hover:text-brand-navy hover:bg-brand-navy/5"
  }`;

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = React.useState(false);
  const [knowledgePopupOpen, setKnowledgePopupOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const closeTimerRef = React.useRef(null);
  const { pathname } = useLocation();
  const knowledgeActive = pathname.startsWith("/knowledge");

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openKnowledgePopup = () => {
    clearCloseTimer();
    setKnowledgePopupOpen(true);
  };

  const scheduleCloseKnowledgePopup = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setKnowledgePopupOpen(false), 120);
  };

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
    setKnowledgeOpen(false);
    setKnowledgePopupOpen(false);
    clearCloseTimer();
  }, [pathname]);

  React.useEffect(() => () => clearCloseTimer(), []);

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
          {NAV.map((n) =>
            n.children ? (
              <div
                key={n.label}
                className="relative"
                onMouseEnter={openKnowledgePopup}
                onMouseLeave={scheduleCloseKnowledgePopup}
              >
                <button
                  type="button"
                  data-testid="nav-link-knowledge"
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ring-focus inline-flex items-center gap-1 ${
                    knowledgeActive || knowledgePopupOpen
                      ? "text-brand-navy bg-brand-navy/5"
                      : "text-foreground/70 hover:text-brand-navy hover:bg-brand-navy/5"
                  }`}
                  aria-haspopup="dialog"
                  aria-expanded={knowledgePopupOpen}
                >
                  {n.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 opacity-70 transition-transform ${knowledgePopupOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {knowledgePopupOpen && (
                  <div
                    data-testid="nav-knowledge-popup"
                    className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                    onMouseEnter={openKnowledgePopup}
                    onMouseLeave={scheduleCloseKnowledgePopup}
                  >
                    <div className="w-[22rem] rounded-lg border border-border bg-white p-2 shadow-[0_12px_40px_rgba(10,37,64,0.14)]">
                      <div className="px-3 pt-2 pb-1 text-[11px] uppercase tracking-[0.16em] text-brand-blue font-semibold">
                        Explore knowledge
                      </div>
                      <div className="flex flex-col gap-0.5">
                        {n.children.map((child) => {
                          const Icon = child.icon;
                          return (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              data-testid={`nav-link-${child.label.toLowerCase()}`}
                              className={({ isActive }) =>
                                `flex items-start gap-3 rounded-md px-3 py-3 transition-colors ${
                                  isActive
                                    ? "bg-brand-navy/5 text-brand-navy"
                                    : "text-foreground/80 hover:bg-brand-navy/[0.04] hover:text-brand-navy"
                                }`
                              }
                            >
                              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-md bg-brand-navy/5 text-brand-navy">
                                <Icon className="h-4 w-4" />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold text-brand-navy">{child.label}</span>
                                <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                                  {child.description}
                                </span>
                              </span>
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={n.to}
                to={n.to}
                data-testid={`nav-link-${n.label.toLowerCase()}`}
                className={linkClass}
                end={n.to === "/"}
              >
                {n.label}
              </NavLink>
            )
          )}
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
            {NAV.map((n) =>
              n.children ? (
                <div key={n.label} className="border-b border-border/60">
                  <button
                    type="button"
                    data-testid="nav-mobile-link-knowledge"
                    onClick={() => setKnowledgeOpen((o) => !o)}
                    className={`w-full py-3 px-2 text-base font-medium flex items-center justify-between ${
                      knowledgeActive ? "text-brand-navy" : "text-foreground/80"
                    }`}
                    aria-expanded={knowledgeOpen}
                  >
                    {n.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${knowledgeOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {knowledgeOpen && (
                    <div className="pb-3 pl-2" data-testid="nav-mobile-knowledge-submenu">
                      {n.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          onClick={() => setOpen(false)}
                          data-testid={`nav-mobile-link-${child.label.toLowerCase()}`}
                          className={({ isActive }) =>
                            `block rounded-md px-2 py-2.5 ${
                              isActive ? "text-brand-navy bg-brand-navy/5" : "text-foreground/80"
                            }`
                          }
                        >
                          <span className="block text-sm font-semibold">{child.label}</span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                            {child.description}
                          </span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
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
              )
            )}
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
