import React from "react";
import { TrendingUp, ShieldCheck, Landmark, BadgeIndianRupee, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SERVICES } from "@/data/brand";

const ICONS = { TrendingUp, ShieldCheck, Landmark, BadgeIndianRupee };

export default function Services() {
  return (
    <section className="container-page py-20 md:py-28" data-testid="services-overview">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-4">
          <div className="text-xs tracking-[0.2em] uppercase text-brand-blue font-semibold">What we do</div>
          <h2 className="mt-3 heading-display text-3xl md:text-4xl text-brand-navy font-semibold leading-tight">
            A full stack of services <br /> for serious wealth.
          </h2>
          <div className="mt-6 brand-divider" />
          <p className="mt-6 text-muted-foreground leading-relaxed">
            From your first SIP to multi-generational estate planning — we handle every layer of your financial life under one trusted roof.
          </p>
          <Link
            to="/contact"
            data-testid="services-talk-cta"
            className="mt-8 inline-flex items-center gap-2 text-brand-navy font-semibold border-b-2 border-brand-navy/30 hover:border-brand-navy pb-1"
          >
            Speak to an advisor <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || TrendingUp;
            return (
              <div
                key={s.title}
                data-testid={`service-card-${i}`}
                className="lift-card bg-white border border-border rounded-lg p-7 group"
              >
                <div className="h-11 w-11 rounded-md bg-brand-navy/5 text-brand-navy grid place-items-center group-hover:bg-brand-navy group-hover:text-white transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 heading-display text-xl font-semibold text-brand-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
