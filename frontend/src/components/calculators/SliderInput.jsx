import React from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { compactInr } from "@/lib/finance";

/**
 * SliderInput - numeric input + slider, controlled
 * props: label, value, onChange, min, max, step, suffix, format(fn)
 */
export default function SliderInput({ label, value, onChange, min, max, step = 1, suffix = "", format, testid }) {
  const display = format ? format(value) : `${value}${suffix}`;
  return (
    <div className="space-y-3" data-testid={testid}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-brand-navy">{label}</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (!Number.isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
            }}
            className="h-9 w-32 text-right font-semibold text-brand-navy"
            data-testid={`${testid}-input`}
          />
        </div>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(v) => onChange(v[0])}
        data-testid={`${testid}-slider`}
      />
      <div className="flex justify-between text-[11px] text-muted-foreground">
        <span>{format ? format(min) : `${min}${suffix}`}</span>
        <span className="font-semibold text-brand-navy">{display}</span>
        <span>{format ? format(max) : `${max}${suffix}`}</span>
      </div>
    </div>
  );
}

export function StatChip({ label, value, accent = false, testid }) {
  return (
    <div
      data-testid={testid}
      className={`rounded-md border p-4 ${accent ? "bg-brand-navy text-white border-brand-navy" : "bg-white border-border"}`}
    >
      <div className={`text-[11px] uppercase tracking-[0.15em] ${accent ? "text-white/70" : "text-muted-foreground"}`}>{label}</div>
      <div className={`mt-1 heading-display text-xl md:text-2xl font-semibold ${accent ? "text-white" : "text-brand-navy"}`}>
        {typeof value === "number" ? compactInr(value) : value}
      </div>
    </div>
  );
}
