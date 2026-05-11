import React from "react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { FOUNDERS } from "@/data/brand";
import { Phone, Mail } from "lucide-react";

export default function TeamPage() {
  return (
    <div data-testid="team-page">
      <PageHeader
        eyebrow="The Team"
        title="A family-led practice with institutional depth."
        subtitle="Three advisors. Forty years of combined experience across mutual funds, insurance, lending and equity research."
        testid="team-header"
      />

      <section className="container-page py-16 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-8" data-testid="team-grid">
        {FOUNDERS.map((f, i) => (
          <div key={f.id} data-testid={`team-member-${f.id}`} className="bg-white border border-border rounded-lg overflow-hidden lift-card">
            <div className="aspect-[4/5] team-portrait-wrap">
              <img src={f.image} alt={f.name} className="team-portrait" />
            </div>
            <div className="p-7">
              {f.role && (
                <div className="text-xs uppercase tracking-[0.14em] text-brand-blue font-semibold">{f.role}</div>
              )}
              <h3 className={`${f.role ? "mt-2" : ""} heading-display text-2xl text-brand-navy font-semibold`}>{f.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.summary}</p>
              <div className="mt-5 flex flex-col gap-2 text-sm">
                <a href={`tel:${f.phone.replace(/\s/g,'')}`} className="flex items-center gap-2 text-brand-navy hover:text-brand-blue" data-testid={`team-phone-${f.id}`}>
                  <Phone className="h-4 w-4" /> {f.phone}
                </a>
                {f.email && (
                  <a href={`mailto:${f.email}`} className="flex items-center gap-2 text-brand-navy hover:text-brand-blue" data-testid={`team-email-${f.id}`}>
                    <Mail className="h-4 w-4" /> {f.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      <CTASection />
    </div>
  );
}
