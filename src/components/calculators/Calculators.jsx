import React from "react";
import SliderInput, { StatChip } from "./SliderInput";
import GrowthAreaChart from "./GrowthAreaChart";
import { sipProjection, lumpsumProjection, goalCalc, retirementCalc, emiCalc, termCoverCalc, compactInr, inr } from "@/lib/finance";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const PIE_COLORS = ["#0A2540", "#0056b3", "#0066FF"];

const Wrap = ({ children, testid }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" data-testid={testid}>{children}</div>
);
const FormCol = ({ children }) => (
  <div className="lg:col-span-5 bg-white border border-border rounded-lg p-6 md:p-8 space-y-7">{children}</div>
);
const ResultCol = ({ children }) => (
  <div className="lg:col-span-7 bg-white border border-border rounded-lg p-6 md:p-8">{children}</div>
);

// ---------------- SIP ----------------
export function SIPCalculator() {
  const [monthly, setMonthly] = React.useState(10000);
  const [years, setYears] = React.useState(15);
  const [rate, setRate] = React.useState(12);
  const r = sipProjection({ monthly, years, ratePct: rate });
  const pieData = [
    { name: "Invested", value: r.invested },
    { name: "Estimated Gains", value: r.gains },
  ];
  return (
    <Wrap testid="sip-calculator">
      <FormCol>
        <h3 className="heading-display text-2xl text-brand-navy">SIP Calculator</h3>
        <p className="text-sm text-muted-foreground">Estimate the future value of your monthly investments.</p>
        <SliderInput testid="sip-monthly" label="Monthly Investment" value={monthly} onChange={setMonthly} min={500} max={500000} step={500} format={compactInr} />
        <SliderInput testid="sip-years" label="Investment Duration (years)" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" yrs" />
        <SliderInput testid="sip-rate" label="Expected Return (p.a.)" value={rate} onChange={setRate} min={1} max={25} step={0.5} suffix="%" />
      </FormCol>
      <ResultCol>
        <div className="grid grid-cols-3 gap-3">
          <StatChip testid="sip-stat-invested" label="Invested" value={r.invested} />
          <StatChip testid="sip-stat-gains" label="Est. Gains" value={r.gains} />
          <StatChip testid="sip-stat-value" label="Future Value" value={r.value} accent />
        </div>
        <div className="mt-6"><GrowthAreaChart data={r.data} dataKeys={["invested", "value"]} /></div>
        <div className="mt-2 h-44">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={36} outerRadius={64} paddingAngle={2}>
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v) => compactInr(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ResultCol>
    </Wrap>
  );
}

// ---------------- Lumpsum ----------------
export function LumpsumCalculator() {
  const [amount, setAmount] = React.useState(500000);
  const [years, setYears] = React.useState(10);
  const [rate, setRate] = React.useState(12);
  const r = lumpsumProjection({ amount, years, ratePct: rate });
  return (
    <Wrap testid="lumpsum-calculator">
      <FormCol>
        <h3 className="heading-display text-2xl text-brand-navy">Lumpsum Calculator</h3>
        <p className="text-sm text-muted-foreground">Project the growth of a one-time investment.</p>
        <SliderInput testid="lump-amount" label="Investment Amount" value={amount} onChange={setAmount} min={10000} max={20000000} step={10000} format={compactInr} />
        <SliderInput testid="lump-years" label="Duration (years)" value={years} onChange={setYears} min={1} max={40} suffix=" yrs" />
        <SliderInput testid="lump-rate" label="Expected Return (p.a.)" value={rate} onChange={setRate} min={1} max={25} step={0.5} suffix="%" />
      </FormCol>
      <ResultCol>
        <div className="grid grid-cols-3 gap-3">
          <StatChip testid="lump-stat-invested" label="Invested" value={r.invested} />
          <StatChip testid="lump-stat-gains" label="Est. Gains" value={r.gains} />
          <StatChip testid="lump-stat-value" label="Future Value" value={r.value} accent />
        </div>
        <div className="mt-6"><GrowthAreaChart data={r.data} dataKeys={["invested", "value"]} /></div>
      </ResultCol>
    </Wrap>
  );
}

// ---------------- Goal ----------------
export function GoalCalculator() {
  const [target, setTarget] = React.useState(10000000); // 1 Cr
  const [years, setYears] = React.useState(15);
  const [rate, setRate] = React.useState(12);
  const r = goalCalc({ target, years, ratePct: rate });
  return (
    <Wrap testid="goal-calculator">
      <FormCol>
        <h3 className="heading-display text-2xl text-brand-navy">Goal Planner</h3>
        <p className="text-sm text-muted-foreground">Find the monthly SIP needed to hit a future financial goal.</p>
        <SliderInput testid="goal-target" label="Target Corpus" value={target} onChange={setTarget} min={100000} max={500000000} step={50000} format={compactInr} />
        <SliderInput testid="goal-years" label="Years to Goal" value={years} onChange={setYears} min={1} max={40} suffix=" yrs" />
        <SliderInput testid="goal-rate" label="Expected Return (p.a.)" value={rate} onChange={setRate} min={1} max={25} step={0.5} suffix="%" />
      </FormCol>
      <ResultCol>
        <div className="grid grid-cols-3 gap-3">
          <StatChip testid="goal-stat-monthly" label="Monthly SIP Needed" value={r.monthly} accent />
          <StatChip testid="goal-stat-invested" label="Total Invested" value={r.invested} />
          <StatChip testid="goal-stat-value" label="Goal at Maturity" value={r.value} />
        </div>
        <div className="mt-6"><GrowthAreaChart data={r.data} dataKeys={["invested", "value"]} /></div>
      </ResultCol>
    </Wrap>
  );
}

// ---------------- Retirement ----------------
export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = React.useState(30);
  const [retireAge, setRetireAge] = React.useState(60);
  const [monthly, setMonthly] = React.useState(15000);
  const [rate, setRate] = React.useState(12);
  const [currentCorpus, setCurrentCorpus] = React.useState(200000);
  const r = retirementCalc({ currentAge, retireAge, monthly, ratePct: rate, currentCorpus });
  return (
    <Wrap testid="retirement-calculator">
      <FormCol>
        <h3 className="heading-display text-2xl text-brand-navy">Retirement Planner</h3>
        <p className="text-sm text-muted-foreground">See the corpus you'll have at retirement at today's contribution levels.</p>
        <div className="grid grid-cols-2 gap-4">
          <SliderInput testid="ret-cur-age" label="Current Age" value={currentAge} onChange={(v) => setCurrentAge(Math.min(retireAge - 1, v))} min={18} max={60} suffix=" yrs" />
          <SliderInput testid="ret-target-age" label="Retirement Age" value={retireAge} onChange={(v) => setRetireAge(Math.max(currentAge + 1, v))} min={40} max={75} suffix=" yrs" />
        </div>
        <SliderInput testid="ret-monthly" label="Monthly Investment" value={monthly} onChange={setMonthly} min={1000} max={500000} step={500} format={compactInr} />
        <SliderInput testid="ret-corpus" label="Existing Corpus" value={currentCorpus} onChange={setCurrentCorpus} min={0} max={50000000} step={10000} format={compactInr} />
        <SliderInput testid="ret-rate" label="Expected Return (p.a.)" value={rate} onChange={setRate} min={1} max={20} step={0.5} suffix="%" />
      </FormCol>
      <ResultCol>
        <div className="grid grid-cols-3 gap-3">
          <StatChip testid="ret-stat-years" label="Years to Retire" value={`${r.years} yrs`} />
          <StatChip testid="ret-stat-monthly" label="Monthly Contribution" value={monthly} />
          <StatChip testid="ret-stat-corpus" label="Retirement Corpus" value={r.corpus} accent />
        </div>
        <div className="mt-6"><GrowthAreaChart data={r.data} dataKeys={["value"]} xKey="year" /></div>
        <p className="mt-2 text-[11px] text-muted-foreground">X-axis represents your age across the accumulation phase.</p>
      </ResultCol>
    </Wrap>
  );
}

// ---------------- EMI ----------------
export function EMICalculator() {
  const [principal, setPrincipal] = React.useState(2500000);
  const [rate, setRate] = React.useState(9);
  const [years, setYears] = React.useState(20);
  const r = emiCalc({ principal, ratePct: rate, years });
  const pieData = [
    { name: "Principal", value: r.principal },
    { name: "Interest", value: r.interest },
  ];
  return (
    <Wrap testid="emi-calculator">
      <FormCol>
        <h3 className="heading-display text-2xl text-brand-navy">EMI Calculator</h3>
        <p className="text-sm text-muted-foreground">Plan repayments on home, vehicle or LAS loans.</p>
        <SliderInput testid="emi-principal" label="Loan Amount" value={principal} onChange={setPrincipal} min={50000} max={50000000} step={50000} format={compactInr} />
        <SliderInput testid="emi-rate" label="Interest Rate (p.a.)" value={rate} onChange={setRate} min={5} max={20} step={0.1} suffix="%" />
        <SliderInput testid="emi-years" label="Tenure" value={years} onChange={setYears} min={1} max={30} suffix=" yrs" />
      </FormCol>
      <ResultCol>
        <div className="grid grid-cols-3 gap-3">
          <StatChip testid="emi-stat-emi" label="Monthly EMI" value={r.emi} accent />
          <StatChip testid="emi-stat-interest" label="Total Interest" value={r.interest} />
          <StatChip testid="emi-stat-total" label="Total Payment" value={r.total} />
        </div>
        <div className="mt-6 h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v) => compactInr(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: PIE_COLORS[0] }} /> Principal: <strong className="text-brand-navy ml-1">{inr(r.principal)}</strong></div>
          <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: PIE_COLORS[1] }} /> Interest: <strong className="text-brand-navy ml-1">{inr(r.interest)}</strong></div>
        </div>
      </ResultCol>
    </Wrap>
  );
}

// ---------------- Term Insurance ----------------
export function TermInsuranceCalculator() {
  const [income, setIncome] = React.useState(1500000);
  const [age, setAge] = React.useState(32);
  const [dependents, setDependents] = React.useState(2);
  const [liabilities, setLiabilities] = React.useState(2500000);
  const r = termCoverCalc({ income, age, dependents, liabilities });
  return (
    <Wrap testid="term-calculator">
      <FormCol>
        <h3 className="heading-display text-2xl text-brand-navy">Term Cover Estimator</h3>
        <p className="text-sm text-muted-foreground">An indicative human-life-value based estimate. Final cover is finalised after a 1:1 review.</p>
        <SliderInput testid="term-income" label="Annual Income" value={income} onChange={setIncome} min={300000} max={50000000} step={50000} format={compactInr} />
        <SliderInput testid="term-age" label="Your Age" value={age} onChange={setAge} min={18} max={60} suffix=" yrs" />
        <SliderInput testid="term-dependents" label="Dependents" value={dependents} onChange={setDependents} min={0} max={6} />
        <SliderInput testid="term-liab" label="Outstanding Liabilities" value={liabilities} onChange={setLiabilities} min={0} max={50000000} step={50000} format={compactInr} />
      </FormCol>
      <ResultCol>
        <div className="grid grid-cols-1 gap-3">
          <StatChip testid="term-stat-cover" label="Suggested Term Cover" value={r.cover} accent />
          <div className="grid grid-cols-3 gap-3">
            <StatChip testid="term-stat-yrs" label="Years to Plan For" value={`${r.yearsToWork} yrs`} />
            <StatChip testid="term-stat-replace" label="Income Replacement" value={r.incomeReplacement} />
            <StatChip testid="term-stat-buffer" label="Dependent Buffer" value={r.dependentBuffer} />
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          The Jain Associates team will help you compare term plans across <strong className="text-brand-navy">15+ insurers</strong> based on this estimate, your health and family history.
        </p>
      </ResultCol>
    </Wrap>
  );
}
