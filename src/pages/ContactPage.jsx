import React from "react";
import PageHeader from "@/components/PageHeader";
import LeadForm from "@/components/LeadForm";
import { BRAND, FOUNDERS } from "@/data/brand";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div data-testid="contact-page">
      <PageHeader
        eyebrow="Get in touch"
        title="Speak with a Jain Associates advisor."
        subtitle="Whether you're starting your first SIP or restructuring a multi-crore portfolio — we'd love to hear from you. Drop us a note and we'll respond within 1 business day."
        testid="contact-header"
      />

      <section className="container-page py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-10" data-testid="contact-section">
        <div className="md:col-span-7">
          <div className="text-xs tracking-[0.2em] uppercase text-brand-blue font-semibold mb-4">Send us a note</div>
          <LeadForm source="contact_page" />
        </div>

        <aside className="md:col-span-5 space-y-6">
          <div className="bg-white border border-border rounded-lg p-7" data-testid="contact-direct">
            <div className="text-xs tracking-[0.2em] uppercase text-brand-blue font-semibold">Direct lines</div>
            <h3 className="mt-2 heading-display text-2xl text-brand-navy font-semibold">Prefer a call?</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {FOUNDERS.map((f) => (
                <li key={f.id} className="border-b border-border/60 pb-3 last:border-0">
                  <div className="font-semibold text-brand-navy">{f.name}</div>
                  {f.role && (
                    <div className="text-xs text-muted-foreground uppercase tracking-[0.12em]">{f.role}</div>
                  )}
                  <div className="mt-2 flex flex-col gap-1">
                    <a href={`tel:${f.phone.replace(/\s/g,'')}`} className="flex items-center gap-2 text-foreground/80 hover:text-brand-blue">
                      <Phone className="h-3.5 w-3.5" /> {f.phone}
                    </a>
                    {f.email && (
                      <a href={`mailto:${f.email}`} className="flex items-center gap-2 text-foreground/80 hover:text-brand-blue">
                        <Mail className="h-3.5 w-3.5" /> {f.email}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-brand-navy text-white rounded-lg p-7" data-testid="contact-hours">
            <Clock className="h-5 w-5 text-white/80" />
            <h3 className="mt-3 heading-display text-xl font-semibold">Office hours</h3>
            <p className="text-sm text-white/80 mt-1">Mon – Sat · 10:00 AM – 7:00 PM</p>
            <p className="text-xs text-white/60 mt-1">Closed on Sundays & national holidays.</p>
          </div>
        </aside>
      </section>

      {/* Map + addresses */}
      <section className="border-t border-border bg-white" data-testid="contact-offices">
        <div className="container-page py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="text-xs tracking-[0.2em] uppercase text-brand-blue font-semibold">Our offices</div>
            <h2 className="mt-3 heading-display text-3xl md:text-4xl text-brand-navy font-semibold leading-tight">
              Visit us in Jaipur.
            </h2>
            <div className="mt-6 brand-divider" />
            <ul className="mt-8 space-y-6">
              {BRAND.addresses.map((a, i) => (
                <li key={i} className="flex gap-3" data-testid={`office-address-${i}`}>
                  <MapPin className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{a.label}</div>
                    <div className="text-brand-navy font-medium mt-1">{a.line}</div>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href={BRAND.mapsLink}
              target="_blank"
              rel="noreferrer"
              data-testid="contact-maps-link"
              className="mt-8 inline-flex items-center gap-2 text-brand-navy font-semibold border-b-2 border-brand-navy/30 hover:border-brand-navy pb-1"
            >
              Open in Google Maps <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="md:col-span-7">
            <div className="aspect-[4/3] md:aspect-[16/12] rounded-lg overflow-hidden border border-border" data-testid="contact-map-frame">
              <iframe
                title="Jain Associates Office Map"
                src={BRAND.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
