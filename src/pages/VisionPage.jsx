import React from "react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { ABSTRACT_IMAGE } from "@/data/brand";
import { Compass, Shield, Sparkles, HeartHandshake, Play } from "lucide-react";

const PRINCIPLES = [
  { icon: Compass, title: "Goal-First Advice", desc: "We start from your life goals, not from product brochures. Every recommendation maps to a real outcome — a home, a child's education, a worry-free retirement." },
  { icon: Shield, title: "Protect, Then Grow", desc: "Insurance and emergency planning are non-negotiable. We protect your downside before optimising for upside — because compounding only works when capital is safe." },
  { icon: Sparkles, title: "Boring Beats Brilliant", desc: "Long-horizon SIPs, asset allocation and rebalancing — done with consistency — outperform 'hot tips' in 90% of cases. We commit to the boring path on your behalf." },
  { icon: HeartHandshake, title: "Multi-Generational Trust", desc: "Most of our clients have been with us for 15+ years. Their children — and now grandchildren — are clients too. We build relationships, not transactions." },
];

export default function VisionPage() {
  return (
    <div data-testid="vision-page">
      <PageHeader
        eyebrow="Our Vision & Philosophy"
        title="Three generations. One promise — your wealth, treated like our own."
        subtitle="Since 1987 we have helped families in Jaipur navigate every market cycle. Our philosophy is simple, conservative and tested across four decades."
        testid="vision-header"
      />

      {/* Founder note */}
      <section className="container-page py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-12" data-testid="vision-founder-note">
        <div className="md:col-span-7">
          <div className="text-xs tracking-[0.2em] uppercase text-brand-blue font-semibold">A note from the founder</div>
          <h2 className="mt-3 heading-display text-3xl md:text-4xl text-brand-navy font-semibold leading-tight">
            "We don't sell products. We help you make decisions you'll be proud of in 20 years."
          </h2>
          <div className="mt-6 brand-divider" />
          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
            <p>When I started Jain Associates in 1987, mutual funds were a niche idea in India and term insurance was almost unheard of. What hasn't changed in four decades is the only thing that matters — that money behaves predictably only when behaviour is predictable.</p>
            <p>Today we have evolved our processes around client interaction and research, which gives us a real edge in the current market. Our discipline and a client-first principle — across both insurance and investments — is the reason we still serve the third generation of many of our founding clients. Our north-star is unchanged: <strong className="text-brand-navy">Protect First, Grow Steadily, Deliver Always.</strong></p>
            <p className="italic text-brand-navy">— Navin Kumar Jain, Founder</p>
          </div>
        </div>
        <div className="md:col-span-5">
          {/* Embedded video placeholder - user can replace with real video */}
          {/* <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-brand-navy" data-testid="vision-video">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
              title="Jain Associates — Our Philosophy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div> */}
          {/* <p className="mt-3 text-xs text-muted-foreground flex items-center gap-2">
            <Play className="h-3.5 w-3.5" /> Replace this placeholder video with your own message — share it from the founder note.
          </p> */}
        </div>
      </section>

      {/* Principles */}
      <section className="relative overflow-hidden border-y border-border" data-testid="vision-principles">
        <div className="absolute inset-0">
          <img src={ABSTRACT_IMAGE} alt="" className="w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-brand-bone/90" />
        </div>
        <div className="container-page relative py-20 md:py-24">
          <div className="text-xs tracking-[0.2em] uppercase text-brand-blue font-semibold">Four principles</div>
          <h2 className="mt-3 heading-display text-3xl md:text-4xl text-brand-navy font-semibold max-w-3xl leading-tight">
            The discipline behind every portfolio we manage.
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} data-testid={`principle-${i}`} className="bg-white border border-border rounded-lg p-7 lift-card">
                <div className="h-11 w-11 rounded-md bg-brand-navy/5 text-brand-navy grid place-items-center">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 heading-display text-xl font-semibold text-brand-navy">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
