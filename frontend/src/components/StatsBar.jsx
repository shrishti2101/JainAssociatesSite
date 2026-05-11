import React from "react";
import { STATS } from "@/data/brand";

export default function StatsBar() {
  return (
    <section className="bg-white border-y border-border" data-testid="stats-showcase">
      <div className="container-page py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
        {STATS.map((s, i) => (
          <div
            key={i}
            data-testid={`stat-card-${i}`}
            className="border-l-2 border-brand-navy/15 pl-4 md:pl-6"
          >
            <div className="heading-display text-3xl md:text-4xl text-brand-navy font-semibold tracking-tight">
              {s.value}
            </div>
            <div className="mt-1 text-xs md:text-sm text-muted-foreground uppercase tracking-[0.12em]">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
