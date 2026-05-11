// Helper utilities for financial calculators
export const inr = (n) => {
  if (!isFinite(n)) return "₹0";
  const v = Math.round(n);
  return "₹" + v.toLocaleString("en-IN");
};

export const compactInr = (n) => {
  const v = Number(n) || 0;
  if (v >= 1e7) return "₹" + (v / 1e7).toFixed(2) + " Cr";
  if (v >= 1e5) return "₹" + (v / 1e5).toFixed(2) + " L";
  if (v >= 1e3) return "₹" + (v / 1e3).toFixed(1) + "k";
  return "₹" + Math.round(v);
};

// SIP — monthly investment, return monthly compounded
export function sipProjection({ monthly, years, ratePct }) {
  const r = ratePct / 100 / 12;
  const data = [];
  let invested = 0;
  for (let y = 0; y <= years; y++) {
    const months = y * 12;
    invested = monthly * months;
    let value = 0;
    if (months === 0) value = 0;
    else if (r === 0) value = monthly * months;
    else value = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
    data.push({ year: y, invested, value: Math.round(value), gains: Math.max(0, Math.round(value - invested)) });
  }
  const last = data[data.length - 1];
  return { data, invested: last.invested, value: last.value, gains: last.gains };
}

// Lumpsum
export function lumpsumProjection({ amount, years, ratePct }) {
  const r = ratePct / 100;
  const data = [];
  for (let y = 0; y <= years; y++) {
    const value = amount * Math.pow(1 + r, y);
    data.push({ year: y, invested: amount, value: Math.round(value), gains: Math.max(0, Math.round(value - amount)) });
  }
  const last = data[data.length - 1];
  return { data, invested: amount, value: last.value, gains: last.gains };
}

// Goal — required monthly SIP to hit a target
export function goalCalc({ target, years, ratePct }) {
  const r = ratePct / 100 / 12;
  const months = years * 12;
  let monthly = 0;
  if (months === 0) monthly = target;
  else if (r === 0) monthly = target / months;
  else monthly = target / (((Math.pow(1 + r, months) - 1) / r) * (1 + r));
  const proj = sipProjection({ monthly, years, ratePct });
  return { monthly: Math.ceil(monthly), ...proj };
}

// Retirement corpus — accumulation phase
export function retirementCalc({ currentAge, retireAge, monthly, ratePct, currentCorpus = 0 }) {
  const years = Math.max(1, retireAge - currentAge);
  const r = ratePct / 100 / 12;
  const data = [];
  for (let y = 0; y <= years; y++) {
    const months = y * 12;
    const fromCurrent = currentCorpus * Math.pow(1 + r, months);
    let fromSip = 0;
    if (months === 0) fromSip = 0;
    else if (r === 0) fromSip = monthly * months;
    else fromSip = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
    data.push({ year: currentAge + y, value: Math.round(fromCurrent + fromSip) });
  }
  return { data, years, corpus: data[data.length - 1].value };
}

// EMI
export function emiCalc({ principal, ratePct, years }) {
  const n = years * 12;
  const r = ratePct / 100 / 12;
  let emi = 0;
  if (r === 0) emi = principal / n;
  else emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  const interest = total - principal;
  return { emi: Math.round(emi), total: Math.round(total), interest: Math.round(interest), principal };
}

// Term insurance — simple human-life-value style suggestion
export function termCoverCalc({ income, age, dependents, liabilities }) {
  // Suggest coverage = income * (60 - age) capped, plus liabilities, plus dependent buffer
  const yearsToWork = Math.max(5, 60 - age);
  const incomeReplacement = income * yearsToWork * 0.7;
  const dependentBuffer = dependents * income * 5;
  const cover = Math.round(incomeReplacement + dependentBuffer + liabilities);
  return { cover, yearsToWork, incomeReplacement: Math.round(incomeReplacement), dependentBuffer: Math.round(dependentBuffer) };
}
