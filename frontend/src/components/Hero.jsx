import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";
import { BRAND, HERO_IMAGE } from "@/data/brand";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      data-testid="hero-section"
    >
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="Modern glass office tower" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="relative container-page py-24 md:py-36 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-8 text-white section-fade">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/80 border border-white/25 rounded-full px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            Trusted Choice Since {BRAND.since}
          </div>
          <h1 className="mt-6 heading-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05]">
            {BRAND.tagline.split('with')[0]}
            <span className="block italic font-light text-white/85">with Integrity &amp; Expertise.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
            Two generations of advisors helping <strong className="text-white">1,400+ families</strong> in Jaipur grow and protect their wealth — across mutual funds, insurance, bonds and lending.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link
              to="/contact"
              data-testid="hero-cta-primary"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-navy px-7 py-3.5 rounded-sm font-semibold hover:bg-brand-bone transition-colors ring-focus"
            >
              Talk to an Advisor <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/calculators"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-7 py-3.5 rounded-sm font-semibold hover:bg-white/10 transition-colors ring-focus"
            >
              Explore Calculators
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80">
            <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> 100+ Cr AUM</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Top 50 in Rajasthan</div>
            <div className="flex items-center gap-2 opacity-90">45+ AMCs · 15+ Insurers</div>
          </div>
        </div>
      </div>
    </section>
  );
}
