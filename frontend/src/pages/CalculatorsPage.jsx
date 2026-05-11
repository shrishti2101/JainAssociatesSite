import React from "react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SIPCalculator, LumpsumCalculator, GoalCalculator,
  RetirementCalculator, EMICalculator, TermInsuranceCalculator
} from "@/components/calculators/Calculators";

const TABS = [
  { id: "sip", label: "SIP", el: <SIPCalculator /> },
  { id: "lumpsum", label: "Lumpsum", el: <LumpsumCalculator /> },
  { id: "goal", label: "Goal", el: <GoalCalculator /> },
  { id: "retirement", label: "Retirement", el: <RetirementCalculator /> },
  { id: "emi", label: "EMI", el: <EMICalculator /> },
  { id: "term", label: "Term Cover", el: <TermInsuranceCalculator /> },
];

export default function CalculatorsPage() {
  return (
    <div data-testid="calculators-page">
      <PageHeader
        eyebrow="Interactive Tools"
        title="Run the numbers. See the trajectory."
        subtitle="Six calculators powered by live charts. Default 12% expected return — adjust every variable to model your own scenario."
        testid="calc-header"
      />

      <section className="container-page py-12 md:py-16" data-testid="calculators-section">
        <Tabs defaultValue="sip" className="w-full">
          <TabsList
            className="w-full flex flex-wrap h-auto bg-white border border-border p-1 mb-8 gap-1"
            data-testid="calc-tabs-list"
          >
            {TABS.map((t) => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                data-testid={`calc-tab-${t.id}`}
                className="flex-1 min-w-[110px] data-[state=active]:bg-brand-navy data-[state=active]:text-white px-5 py-2.5 text-sm font-semibold"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {TABS.map((t) => (
            <TabsContent key={t.id} value={t.id} data-testid={`calc-content-${t.id}`}>
              {t.el}
            </TabsContent>
          ))}
        </Tabs>

        <p className="mt-10 text-xs text-muted-foreground max-w-3xl">
          Disclaimer: These calculators are for illustration only and assume the inputs you provide are accurate. Actual returns are subject to market conditions and individual fund performance. Mutual fund investments are subject to market risks; please read all scheme-related documents carefully.
        </p>
      </section>

      <CTASection />
    </div>
  );
}
