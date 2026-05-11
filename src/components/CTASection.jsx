import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-brand-navy" data-testid="home-cta-section">
      <div className="absolute inset-0 grain-overlay opacity-10" aria-hidden="true" />
      <div className="container-page py-20 md:py-24 relative grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-8">
          <div className="text-xs tracking-[0.2em] uppercase text-white/60 font-semibold">Let's begin</div>
          <h2 className="mt-3 heading-display text-3xl md:text-5xl text-white font-semibold leading-[1.08]">
            A 15-minute call could <br className="hidden md:block" />
            <span className="italic font-light">change how your money compounds.</span>
          </h2>
          <p className="mt-5 text-white/75 max-w-xl">
            Free, no-obligation consultation with a Jain Associates advisor. We'll review your goals, current portfolio and recommend the next best step.
          </p>
        </div>
        <div className="md:col-span-4 flex md:justify-end">
          <Link
            to="/contact"
            data-testid="home-cta-button"
            className="inline-flex items-center gap-2 bg-white text-brand-navy px-7 py-4 rounded-sm font-semibold hover:bg-brand-bone transition-colors ring-focus"
          >
            Book a free consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
