import React from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Services from "@/components/Services";
import CTASection from "@/components/CTASection";
import { ABSTRACT_IMAGE, FOUNDERS } from "@/data/brand";
import { ArrowUpRight, Calculator, Quote } from "lucide-react";

export default function HomePage() {
  return (
    <div data-testid="home-page">
      <Hero />
      <StatsBar />
      <Services />

      {/* Calculator preview band */}
      <section className="relative overflow-hidden border-y border-border" data-testid="home-calculator-preview">
        <div className="absolute inset-0">
          <img src={ABSTRACT_IMAGE} alt="" className="w-full h-full object-cover opacity-[0.18]" />
          <div className="absolute inset-0 bg-brand-bone/85" />
        </div>
        <div className="container-page relative py-20 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="text-xs tracking-[0.2em] uppercase text-brand-blue font-semibold">Plan with confidence</div>
            <h2 className="mt-3 heading-display text-3xl md:text-5xl text-brand-navy font-semibold leading-[1.08]">
              Six interactive calculators. <br />
              <span className="italic font-light">Numbers you can actually trust.</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-xl">
              SIP, Lumpsum, Goal, Retirement, EMI and Term Cover — all visualised on live charts. Default 12% return assumption with full control over every variable.
            </p>
          </div>
          <div className="md:col-span-5 md:justify-self-end">
            <Link
              to="/calculators"
              data-testid="home-calc-cta"
              className="inline-flex items-center gap-3 bg-brand-navy text-white px-7 py-4 rounded-sm font-semibold hover:bg-brand-blue transition-colors group"
            >
              <Calculator className="h-5 w-5" />
              Open Calculators
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team teaser */}
      <section className="container-page py-20 md:py-28" data-testid="home-team-teaser">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="text-xs tracking-[0.2em] uppercase text-brand-blue font-semibold">Two generations</div>
            <h2 className="mt-3 heading-display text-3xl md:text-4xl text-brand-navy font-semibold leading-tight">
              Family-led advisory <br /> with institutional rigor.
            </h2>
            <div className="mt-6 brand-divider" />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Jain Associates is led by Navin, Rakesh and Sambhav Jain — combining 40+ years of distribution experience with CFA-trained equity research from a top global private equity firm.
            </p>
            <Link
              to="/team"
              data-testid="home-team-cta"
              className="mt-8 inline-flex items-center gap-2 text-brand-navy font-semibold border-b-2 border-brand-navy/30 hover:border-brand-navy pb-1"
            >
              Meet the team <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {FOUNDERS.map((f, i) => (
              <div key={f.id} data-testid={`home-team-card-${i}`} className="lift-card bg-white border border-border rounded-lg overflow-hidden">
                <div className="aspect-[4/5] team-portrait-wrap">
                  <img src={f.image} alt={f.name} className="team-portrait" />
                </div>
                <div className="p-5">
                  <div className="heading-display text-lg text-brand-navy font-semibold">{f.name}</div>
                  {f.role && (
                    <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground mt-1">{f.role}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote band */}
      <section className="bg-white border-y border-border" data-testid="home-quote">
        <div className="container-page py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-2"><Quote className="h-10 w-10 text-brand-blue" /></div>
          <blockquote className="md:col-span-10 heading-display text-2xl md:text-3xl text-brand-navy leading-snug">
            "Wealth is not built by chasing returns. It's built by staying disciplined, protecting downside, and giving compounding the time it deserves."
            <footer className="mt-4 text-sm font-sans tracking-[0.16em] uppercase text-muted-foreground">— Jain Associates · Since 1987</footer>
          </blockquote>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
