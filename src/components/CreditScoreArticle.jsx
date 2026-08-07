import React from "react";
import {
  Gauge,
  ShieldCheck,
  Calculator,
  Database,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

const scrollToId = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const SCORE_BANDS = [
  { range: "750+", label: "Excellent", desc: "Higher likelihood of loan approval", bar: "bg-brand-navy" },
  { range: "700–749", label: "Good", desc: "Solid credit profile", bar: "bg-brand-blue" },
  { range: "650–699", label: "Fair", desc: "Lenders may evaluate carefully", bar: "bg-brand-blue/60" },
  { range: "Below 650", label: "Needs work", desc: "May affect approvals or costs", bar: "bg-brand-navy/35" },
];

const CALC_FACTORS = [
  {
    num: "01",
    title: "Payment History",
    body: "The single most important component of your credit score. It reflects whether you have paid EMIs on time, cleared credit card bills before the due date, missed or delayed payments, or defaulted on loans. Consistently making payments on time helps build a strong credit profile.",
  },
  {
    num: "02",
    title: "Credit Utilization Ratio",
    body: "The percentage of your available credit limit that you regularly use. For example, if your credit card limit is ₹1,00,000 and you regularly spend ₹30,000, your utilization ratio is 30%. A lower ratio indicates responsible credit management — aim to keep utilization below 30%.",
  },
  {
    num: "03",
    title: "Length of Credit History",
    body: "The age of your credit accounts influences your score. Lenders generally prefer borrowers who have successfully managed credit over a longer period. Keeping older, well-managed accounts active can positively contribute to your profile.",
  },
  {
    num: "04",
    title: "Credit Enquiries",
    body: "Whenever you apply for a new loan or credit card, the lender performs a hard enquiry. Occasional enquiries are normal, but applying for multiple products in a short period may signal financial stress and can negatively impact your score.",
  },
];

const DATA_POINTS = [
  "Outstanding loan balances",
  "EMI payments",
  "Credit card payments",
  "Defaults or overdue amounts",
  "New credit accounts",
  "Closed loan accounts",
];

const DISPUTE_STEPS = [
  "Report the incorrect information through the CIBIL dispute portal.",
  "CIBIL forwards the dispute to the concerned bank or financial institution for verification.",
  "The lender verifies the records and updates the information if an error is found.",
  "CIBIL updates your credit report after receiving confirmation from the lender.",
];

const TIPS = [
  {
    title: "Build a Credit History",
    body: "If you do not have a credit history, consider starting with a credit card or a small loan and use it responsibly.",
  },
  {
    title: "Pay All EMIs and Credit Card Bills on Time",
    body: "Timely repayment is the most important factor affecting your credit score. Auto-debit or payment reminders can help avoid missed payments.",
  },
  {
    title: "Always Clear Outstanding Dues",
    body: "If you disagree with charges, communicate promptly with your lender. Resolving or paying undisputed dues on time helps avoid overdue reporting while a dispute is addressed.",
  },
  {
    title: "Clear Existing Overdue Accounts",
    body: "Outstanding dues and defaults can significantly affect your score. Repaying overdue amounts and regularizing accounts helps improve your profile over time.",
  },
  {
    title: "Keep Credit Utilization Below 30%",
    body: "Using only a small portion of available credit demonstrates responsible borrowing and generally has a positive impact on your score.",
  },
  {
    title: "Avoid Frequent Loan Applications",
    body: "Multiple applications in a short period can reduce your score due to repeated hard enquiries. Apply for new credit only when genuinely required.",
  },
];

const TOC = [
  { id: "what-is-cibil", label: "What is a CIBIL Score?" },
  { id: "why-important", label: "Why it matters" },
  { id: "how-calculated", label: "How it is calculated" },
  { id: "data-collected", label: "How data is collected" },
  { id: "dispute-errors", label: "If there is an error" },
  { id: "improve-score", label: "Tips to improve" },
  { id: "conclusion", label: "Conclusion" },
];

function SectionLabel({ icon: Icon, children }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-4">
      <span className="grid h-8 w-8 place-items-center rounded-md bg-brand-navy/5 text-brand-navy">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <span className="text-xs tracking-[0.18em] uppercase text-brand-blue font-semibold">{children}</span>
    </div>
  );
}

export default function CreditScoreArticle({ relatedArticles = [] }) {
  return (
    <section className="bg-background" data-testid="credit-score-article">
      {/* Feature header */}
      <div className="relative overflow-hidden bg-white border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-brand-bone to-brand-navy/[0.04]" />
        <div className="container-page relative py-16 md:py-20">
          <div className="text-xs tracking-[0.2em] uppercase text-brand-blue font-semibold">
            Credit knowledge
          </div>
          <h1 className="mt-3 heading-display text-3xl md:text-5xl text-brand-navy font-semibold leading-[1.08] max-w-3xl">
            Everything around Credit Score
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">
            Understanding Your CIBIL Score: Why It Matters and How to Improve It
          </p>
          <div className="mt-8 brand-divider" />
        </div>
      </div>

      <div className="container-page py-16 md:py-24">
        <div className="lg:hidden mb-10">
          <RelatedArticles articles={relatedArticles} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Sticky TOC */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-4">
              <div className="bg-white border border-border rounded-lg p-5 shadow-[0_12px_40px_-28px_rgba(10,37,64,0.2)]">
                <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-semibold mb-4">
                  In this article
                </div>
                <nav className="flex flex-col gap-0.5" aria-label="Article sections">
                  {TOC.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToId(item.id)}
                      className="text-left text-sm text-foreground/70 hover:text-brand-navy py-1.5 border-l-2 border-transparent hover:border-brand-blue pl-3 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
              <RelatedArticles articles={relatedArticles} />
            </div>
          </aside>

          {/* Article body */}
          <article className="lg:col-span-9 space-y-16 md:space-y-20">
            {/* Intro */}
            <div className="bg-white border border-border rounded-lg p-7 md:p-9">
              <p className="text-base md:text-lg text-brand-navy/90 leading-relaxed">
                Whenever you apply for a loan or a credit card, one of the first things a lender checks is your{" "}
                <strong className="font-semibold text-brand-navy">CIBIL Score</strong>. This three-digit number
                summarizes your credit history and helps lenders assess how responsibly you have managed borrowed
                money in the past.
              </p>
              <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed">
                In this article, we explain what a CIBIL Score is, why it is important, how it is calculated, how your
                credit data is collected, how to raise a dispute if there is an error, and the steps you can take to
                build or improve your credit score.
              </p>
            </div>

            {/* What is */}
            <div id="what-is-cibil" className="scroll-mt-28">
              <SectionLabel icon={Gauge}>What is a CIBIL Score?</SectionLabel>
              <h3 className="heading-display text-2xl md:text-3xl text-brand-navy font-semibold leading-tight">
                A three-digit number that reflects your creditworthiness
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
                A CIBIL Score ranges from <strong className="text-brand-navy font-semibold">300 to 900</strong>,
                generated by TransUnion CIBIL, one of India&apos;s licensed credit information companies. The score
                reflects your creditworthiness based on your borrowing and repayment history.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SCORE_BANDS.map((band) => (
                  <div
                    key={band.range}
                    className="relative overflow-hidden rounded-lg border border-border bg-white p-5 lift-card"
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${band.bar}`} />
                    <div className="heading-display text-2xl text-brand-navy font-semibold">{band.range}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em] text-brand-blue font-semibold">
                      {band.label}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{band.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                A higher score generally improves your chances of obtaining loans and credit cards on favorable terms,
                although the final lending decision always rests with the financial institution.
              </p>
            </div>

            {/* Why important */}
            <div id="why-important" className="scroll-mt-28">
              <SectionLabel icon={ShieldCheck}>Why is a CIBIL Score Important?</SectionLabel>
              <h3 className="heading-display text-2xl md:text-3xl text-brand-navy font-semibold leading-tight">
                Helping lenders evaluate credit risk — and helping you borrow better
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
                The primary purpose of a CIBIL Score is to help banks and financial institutions evaluate the credit
                risk of a borrower before approving a loan or issuing a credit card.
              </p>
              <p className="mt-4 text-sm text-brand-navy font-medium">A strong credit score can help you:</p>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Improve your chances of loan approval",
                  "Obtain higher credit limits",
                  "Receive more competitive interest rates",
                  "Speed up the loan approval process",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-lg bg-white border border-border px-4 py-3.5 text-sm text-brand-navy/90"
                  >
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand-blue" strokeWidth={1.75} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                In some cases, credit reports may also be considered by financial institutions during certain financial
                assessments or verification processes, subject to applicable laws and policies.
              </p>
            </div>

            {/* How calculated */}
            <div id="how-calculated" className="scroll-mt-28">
              <SectionLabel icon={Calculator}>How is Your CIBIL Score Calculated?</SectionLabel>
              <h3 className="heading-display text-2xl md:text-3xl text-brand-navy font-semibold leading-tight">
                Four factors that matter most
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
                Your CIBIL Score is calculated using several factors, with the following being the most important.
              </p>
              <div className="mt-8 space-y-4">
                {CALC_FACTORS.map((factor) => (
                  <div
                    key={factor.num}
                    className="bg-white border border-border rounded-lg p-6 md:p-7 grid grid-cols-[auto_1fr] gap-4 md:gap-6"
                  >
                    <div className="heading-display text-3xl md:text-4xl text-brand-blue/80 font-semibold leading-none pt-1">
                      {factor.num}
                    </div>
                    <div>
                      <h4 className="heading-display text-xl md:text-2xl text-brand-navy font-semibold">
                        {factor.title}
                      </h4>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{factor.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data collected */}
            <div id="data-collected" className="scroll-mt-28">
              <SectionLabel icon={Database}>How is Your Credit Data Collected?</SectionLabel>
              <h3 className="heading-display text-2xl md:text-3xl text-brand-navy font-semibold leading-tight">
                Reported by lenders, updated on your CIBIL Report
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
                Banks, Non-Banking Financial Companies (NBFCs), and other lending institutions periodically report your
                loan and credit card information to TransUnion CIBIL. This information includes:
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {DATA_POINTS.map((point) => (
                  <div
                    key={point}
                    className="rounded-lg border border-border bg-white px-4 py-3.5 text-sm text-brand-navy/85"
                  >
                    {point}
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-brand-blue/20 bg-brand-blue/[0.04] px-5 py-4 text-sm text-brand-navy/85 leading-relaxed">
                It typically takes <strong className="font-semibold">15 to 30 days</strong> for recent payment
                information to be updated in your CIBIL Report after being reported by the lender.
              </div>
            </div>

            {/* Dispute */}
            <div id="dispute-errors" className="scroll-mt-28">
              <SectionLabel icon={AlertTriangle}>What Should You Do If There Is an Error?</SectionLabel>
              <h3 className="heading-display text-2xl md:text-3xl text-brand-navy font-semibold leading-tight">
                Raise a dispute with TransUnion CIBIL
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
                If you notice incorrect information, duplicate accounts, fraudulent loans, or inaccurate payment records
                in your CIBIL Report, you can raise a dispute with TransUnion CIBIL. The process generally involves:
              </p>
              <ol className="mt-6 space-y-3">
                {DISPUTE_STEPS.map((step, i) => (
                  <li
                    key={step}
                    className="flex gap-4 rounded-lg bg-white border border-border px-4 py-4 text-sm text-muted-foreground leading-relaxed"
                  >
                    <span className="heading-display text-lg text-brand-navy font-semibold shrink-0 w-6">
                      {i + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                If you believe your credit report contains inaccurate information, it is advisable to initiate the
                dispute process as soon as possible.
              </p>
            </div>

            {/* Tips */}
            <div id="improve-score" className="scroll-mt-28">
              <SectionLabel icon={TrendingUp}>Tips to Improve Your CIBIL Score</SectionLabel>
              <h3 className="heading-display text-2xl md:text-3xl text-brand-navy font-semibold leading-tight">
                Disciplined habits that strengthen your score
              </h3>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {TIPS.map((tip, i) => (
                  <div key={tip.title} className="bg-white border border-border rounded-lg p-6 h-full lift-card">
                    <div className="flex items-start gap-3">
                      <span className="heading-display text-2xl text-brand-blue font-semibold leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="heading-display text-lg text-brand-navy font-semibold leading-snug">
                        {tip.title}
                      </h4>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{tip.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conclusion */}
            <div
              id="conclusion"
              className="scroll-mt-28 relative overflow-hidden rounded-lg bg-brand-navy text-white p-8 md:p-10"
            >
              <div className="absolute inset-0 grain-overlay opacity-10 pointer-events-none" />
              <div className="relative">
                <div className="text-xs tracking-[0.2em] uppercase text-white/55 font-semibold">Conclusion</div>
                <h3 className="mt-3 heading-display text-2xl md:text-3xl font-semibold leading-tight">
                  Your CIBIL Score is one of the most important indicators of your financial credibility.
                </h3>
                <p className="mt-5 text-white/75 leading-relaxed max-w-3xl">
                  A strong credit score not only improves your chances of obtaining loans and credit cards but may also
                  help you secure better interest rates and borrowing terms.
                </p>
                <p className="mt-4 text-white/75 leading-relaxed max-w-3xl">
                  Building a good credit score requires disciplined financial habits—paying your dues on time,
                  maintaining low credit utilization, avoiding unnecessary borrowing, and regularly reviewing your
                  credit report for errors.
                </p>
                <p className="mt-4 text-white/90 leading-relaxed max-w-3xl">
                  By managing your credit responsibly, you can strengthen your financial profile and improve your access
                  to future borrowing opportunities.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
