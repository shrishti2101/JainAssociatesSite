import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { BRAND } from "@/data/brand";

export default function Footer() {
  return (
    <footer
      className="bg-brand-navy text-white relative overflow-hidden"
      data-testid="site-footer"
    >
      <div
        className="absolute inset-0 grain-overlay opacity-[0.07]"
        aria-hidden="true"
      />
      <div className="container-page py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 bg-white rounded-md p-3 w-fit">
            <img
              src={BRAND.logoUrl}
              alt={BRAND.name}
              className="h-12 w-auto object-contain"
              data-testid="footer-logo"
            />
          </div>
          <div className="mt-3 text-[11px] tracking-[0.18em] uppercase text-white/60">
            Trusted Since {BRAND.since}
          </div>
          <p className="mt-6 text-white/70 text-sm leading-relaxed max-w-md">
            {BRAND.tagline}. Mutual funds, insurance, bonds and lending —
            handled by three generations of advisors in Jaipur.
          </p>
          <div className="mt-6 flex flex-col gap-2 text-sm text-white/80">
            <a
              href={`tel:${BRAND.primaryPhone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 hover:text-white"
              data-testid="footer-phone"
            >
              <Phone className="h-4 w-4" /> {BRAND.primaryPhone}
            </a>
            <a
              href={`mailto:${BRAND.primaryEmail}`}
              className="flex items-center gap-2 hover:text-white"
              data-testid="footer-email"
            >
              <Mail className="h-4 w-4" /> {BRAND.primaryEmail}
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-[0.18em] text-white/50 mb-4">
            Explore
          </div>
          <ul className="space-y-2 text-sm">
            {/* <li>
              <Link
                to={`${import.meta.env.BASE_URL || ""}/`}
                className="text-white/80 hover:text-white"
                data-testid="footer-link-home"
              >
                Home
              </Link> </li>*/}
            <li>
              <Link
                to="/"
                className="text-white/80 hover:text-white"
                data-testid="footer-link-home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white/80 hover:text-white"
                data-testid="footer-link-vision"
              >
                Vision & Philosophy
              </Link>
            </li>
            <li>
              <Link
                to="/team"
                className="text-white/80 hover:text-white"
                data-testid="footer-link-team"
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                to="/policy"
                className="text-white/80 hover:text-white"
                data-testid="footer-link-policy"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/calculators"
                className="text-white/80 hover:text-white"
                data-testid="footer-link-calculators"
              >
                Calculators
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white/80 hover:text-white"
                data-testid="footer-link-contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="text-xs uppercase tracking-[0.18em] text-white/50 mb-4">
            Offices · Jaipur
          </div>
          <ul className="space-y-4 text-sm text-white/80">
            {BRAND.addresses.map((a, i) => (
              <li key={i} className="flex gap-3">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <div>
                  <div className="text-white">{a.label}</div>
                  <div className="text-white/70">{a.line}</div>
                </div>
              </li>
            ))}
          </ul>
          <a
            href={BRAND.mapsLink}
            target="_blank"
            rel="noreferrer"
            data-testid="footer-maps-link"
            className="mt-4 inline-flex items-center gap-1 text-sm text-white/90 hover:text-white border-b border-white/30 hover:border-white pb-0.5"
          >
            View on Google Maps <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>
          <div>NAVIN KUMAR JAIN | GST No: 08ABTOJ8220H2ZC | ARN No: 0966 </div>
          <div>
            Mutual fund investments are subject to market risks. Read all
            scheme-related documents carefully.
          </div>
        </div>
      </div>
    </footer>
  );
}
