import React from "react";

export default function PageHeader({ eyebrow, title, subtitle, testid }) {
  return (
    <section className="bg-white border-b border-border" data-testid={testid || "page-header"}>
      <div className="container-page pt-20 md:pt-28 pb-14 md:pb-20">
        {eyebrow && (
          <div className="text-xs tracking-[0.2em] uppercase text-brand-blue font-semibold">{eyebrow}</div>
        )}
        <h1 className="mt-3 heading-display text-4xl sm:text-5xl lg:text-6xl text-brand-navy font-semibold leading-[1.05] max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
        )}
        <div className="mt-8 brand-divider" />
      </div>
    </section>
  );
}
