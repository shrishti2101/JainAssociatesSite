import React from "react";
import {
  ArrowRightLeft,
  CircleDollarSign,
  RefreshCw,
  Receipt,
  ThumbsUp,
  CheckCircle2,
  Scale,
} from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

const scrollToId = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const TOC = [
  { id: "idcw-intro", label: "Overview" },
  { id: "what-is-idcw", label: "What is IDCW?" },
  { id: "what-is-swp", label: "What is SWP?" },
  { id: "swp-taxation", label: "Taxation of SWP" },
  { id: "why-prefer-swp", label: "Why many prefer SWP" },
  { id: "idcw-swp-conclusion", label: "Conclusion" },
];

const IDCW_FEATURES = [
  "The distribution is entirely at the discretion of the Asset Management Company (AMC). It is neither fixed nor guaranteed.",
  "The frequency and amount of distribution can vary depending on the fund's distributable surplus.",
  "Every IDCW payout reduces the fund's Net Asset Value (NAV).",
  "The investor has limited control over the amount and timing of distributions.",
  "IDCW received by investors is taxable according to their applicable income tax slab.",
];

const SWP_ADVANTAGES = [
  "The investor decides the withdrawal amount and frequency.",
  "Withdrawals can be increased, reduced, paused, or stopped whenever required.",
  "Since the investment remains in the Growth Option, the remaining corpus continues to participate in market growth.",
  "SWP provides greater flexibility and control over retirement or regular income planning.",
];

const PREFER_SWP = [
  "Greater control over cash flows.",
  "Better tax efficiency.",
  "Higher long-term wealth creation through the Growth Option.",
  "Flexibility to pause or modify withdrawals at any time.",
  "The ability to leave the remaining investment invested for future growth.",
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

export default function IdcwVsSwpArticle({ relatedArticles = [] }) {
  return (
    <section className="bg-background" data-testid="idcw-vs-swp-article">
      <div className="relative overflow-hidden bg-white border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-brand-bone to-brand-navy/[0.04]" />
        <div className="container-page relative py-16 md:py-20">
          <div className="text-xs tracking-[0.2em] uppercase text-brand-blue font-semibold">
            Investment knowledge
          </div>
          <h1 className="mt-3 heading-display text-3xl md:text-5xl text-brand-navy font-semibold leading-[1.08] max-w-4xl">
            IDCW vs. SWP
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">
            Which Is Better for Generating Regular Income?
          </p>
          <div className="mt-8 brand-divider" />
        </div>
      </div>

      <div className="container-page py-16 md:py-24">
        <div className="lg:hidden mb-10">
          <RelatedArticles articles={relatedArticles} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
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

          <article className="lg:col-span-9 space-y-16 md:space-y-20">
            <div id="idcw-intro" className="scroll-mt-28">
              <SectionLabel icon={ArrowRightLeft}>Overview</SectionLabel>
              <div className="bg-white border border-border rounded-lg p-7 md:p-9 space-y-4">
                <p className="text-base md:text-lg text-brand-navy/90 leading-relaxed">
                  Many investors look for regular cash flow from their mutual fund investments. Two common ways to
                  achieve this are through the{" "}
                  <strong className="font-semibold text-brand-navy">IDCW (Income Distribution cum Capital Withdrawal)</strong>{" "}
                  option and a <strong className="font-semibold text-brand-navy">Systematic Withdrawal Plan (SWP)</strong>.
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Although both provide periodic payouts, they work very differently and have different tax implications.
                </p>
              </div>
            </div>

            <div id="what-is-idcw" className="scroll-mt-28">
              <SectionLabel icon={CircleDollarSign}>What is IDCW?</SectionLabel>
              <h3 className="heading-display text-2xl md:text-3xl text-brand-navy font-semibold leading-tight">
                Income Distribution cum Capital Withdrawal
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
                IDCW is a mutual fund option under which the fund house may distribute a portion of the available
                surplus to investors.
              </p>
              <p className="mt-4 text-sm text-brand-navy font-medium">Some important features of IDCW include:</p>
              <ul className="mt-4 space-y-3">
                {IDCW_FEATURES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-lg bg-white border border-border px-4 py-3.5 text-sm text-muted-foreground leading-relaxed"
                  >
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand-blue" strokeWidth={1.75} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-lg border border-brand-blue/20 bg-brand-blue/[0.04] px-5 py-4 text-sm text-brand-navy/85 leading-relaxed">
                Because a portion of the fund&apos;s value is periodically distributed, the NAV of an IDCW plan
                generally grows slower than that of the corresponding Growth Plan.
              </div>
            </div>

            <div id="what-is-swp" className="scroll-mt-28">
              <SectionLabel icon={RefreshCw}>What is an SWP (Systematic Withdrawal Plan)?</SectionLabel>
              <h3 className="heading-display text-2xl md:text-3xl text-brand-navy font-semibold leading-tight">
                Fixed withdrawals from a Growth Option investment
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
                A Systematic Withdrawal Plan (SWP) allows investors to invest through the Growth Option of a mutual fund
                while withdrawing a fixed amount at regular intervals, such as monthly or quarterly.
              </p>
              <p className="mt-4 text-sm text-brand-navy font-medium">The key advantages of SWP are:</p>
              <ul className="mt-4 space-y-3">
                {SWP_ADVANTAGES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-lg bg-white border border-border px-4 py-3.5 text-sm text-muted-foreground leading-relaxed"
                  >
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand-blue" strokeWidth={1.75} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="swp-taxation" className="scroll-mt-28">
              <SectionLabel icon={Receipt}>Taxation of SWP</SectionLabel>
              <h3 className="heading-display text-2xl md:text-3xl text-brand-navy font-semibold leading-tight">
                Only the capital gains portion is taxed
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
                Unlike IDCW, SWP withdrawals are not fully taxable. Each withdrawal consists of:
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-border rounded-lg p-6">
                  <div className="text-xs uppercase tracking-[0.14em] text-brand-blue font-semibold">Not taxable</div>
                  <h4 className="mt-2 heading-display text-xl text-brand-navy font-semibold">
                    Return of original investment
                  </h4>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    The portion of each withdrawal that returns your original capital is not taxable.
                  </p>
                </div>
                <div className="bg-white border border-border rounded-lg p-6">
                  <div className="text-xs uppercase tracking-[0.14em] text-brand-blue font-semibold">Taxable</div>
                  <h4 className="mt-2 heading-display text-xl text-brand-navy font-semibold">Capital gains</h4>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Only the capital gains portion is taxed according to the applicable capital gains rules based on the
                    type of mutual fund and the holding period.
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                This often makes SWP significantly more tax-efficient than IDCW.
              </p>
            </div>

            <div id="why-prefer-swp" className="scroll-mt-28">
              <SectionLabel icon={ThumbsUp}>Why Many Investors Prefer SWP</SectionLabel>
              <h3 className="heading-display text-2xl md:text-3xl text-brand-navy font-semibold leading-tight">
                More control, better tax efficiency, stronger long-term growth
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
                For most investors seeking regular income, SWP is generally considered a better option because it
                offers:
              </p>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PREFER_SWP.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-lg bg-white border border-border px-4 py-3.5 text-sm text-brand-navy/90"
                  >
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand-blue" strokeWidth={1.75} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-lg border border-brand-blue/20 bg-brand-blue/[0.04] px-5 py-4 text-sm text-brand-navy/85 leading-relaxed">
                Many financial planners also recommend limiting annual withdrawals to a sustainable level (often around{" "}
                <strong className="font-semibold">4%</strong> of the portfolio value, depending on market conditions,
                inflation, and individual financial goals) to help preserve the investment corpus over the long term.
              </div>
            </div>

            <div
              id="idcw-swp-conclusion"
              className="scroll-mt-28 relative overflow-hidden rounded-lg bg-brand-navy text-white p-8 md:p-10"
            >
              <div className="absolute inset-0 grain-overlay opacity-10 pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center gap-2.5 mb-4">
                  <Scale className="h-4 w-4 text-white/70" strokeWidth={1.75} />
                  <span className="text-xs tracking-[0.2em] uppercase text-white/55 font-semibold">Conclusion</span>
                </div>
                <h3 className="heading-display text-2xl md:text-3xl font-semibold leading-tight">
                  Both provide income — but SWP usually offers more control and better tax efficiency.
                </h3>
                <p className="mt-5 text-white/75 leading-relaxed max-w-3xl">
                  While IDCW and SWP both provide regular income, they serve investors differently. IDCW depends on the
                  fund house&apos;s decision and generally offers less flexibility with relatively less favorable
                  taxation. SWP, on the other hand, gives investors complete control over their withdrawals while
                  allowing the remaining investment to continue compounding.
                </p>
                <p className="mt-4 text-white/90 leading-relaxed max-w-3xl">
                  For most long-term investors—especially retirees or those seeking regular income—an SWP from a Growth
                  Plan is typically the more flexible and tax-efficient choice.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
