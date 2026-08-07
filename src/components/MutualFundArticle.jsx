import React from "react";
import {
  Layers,
  Building2,
  PiggyBank,
  CheckCircle2,
  TrendingUp,
  Landmark,
  Wallet,
  Blend,
  Boxes,
  Sprout,
  Banknote,
} from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

const scrollToId = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const TOC = [
  { id: "mf-what-is", label: "What is a Mutual Fund?" },
  { id: "mf-returns", label: "How investors earn returns" },
  { id: "mf-structures", label: "Fund structures" },
  { id: "mf-how-to-invest", label: "How to invest" },
  { id: "mf-asset-class", label: "By asset class" },
  { id: "mf-distribution", label: "Distribution options" },
];

const RETURN_WAYS = [
  "Appreciation in the Net Asset Value (NAV) of the fund.",
  "Income distributions (if applicable under the IDCW option).",
];

const STRUCTURES = [
  {
    title: "Open-Ended Funds",
    body: "Investors can purchase or redeem units at any time.",
  },
  {
    title: "Closed-Ended Funds",
    body: "Investments can be made only during the initial offer period, and units are generally redeemed on maturity or traded on the stock exchange.",
  },
];

const INVEST_WAYS = [
  {
    title: "SIP (Systematic Investment Plan)",
    body: "Invest a fixed amount at regular intervals.",
  },
  {
    title: "Lump Sum Investment",
    body: "Invest a larger amount in one transaction.",
  },
];

const ASSET_CLASSES = [
  {
    num: "01",
    title: "Equity Funds",
    icon: TrendingUp,
    body: "Equity funds primarily invest in shares of listed companies. To qualify as an equity-oriented mutual fund for taxation purposes, at least 65% of the portfolio must be invested in equity and equity-related instruments. These funds are generally suitable for long-term wealth creation.",
  },
  {
    num: "02",
    title: "Debt Funds",
    icon: Landmark,
    body: "Debt funds invest primarily in fixed-income instruments such as government securities, corporate bonds, treasury bills, certificates of deposit, and commercial papers. They are generally chosen by investors seeking relatively stable returns with lower volatility than equity funds.",
  },
  {
    num: "03",
    title: "Money Market Funds",
    icon: Wallet,
    body: "Money Market Funds invest in short-term money market instruments such as Treasury Bills (T-Bills), Commercial Papers (CPs), Certificates of Deposit (CDs), and other instruments with a Macaulay Duration of up to one year. These funds are designed to provide high liquidity with relatively low risk.",
  },
  {
    num: "04",
    title: "Hybrid Funds",
    icon: Blend,
    body: "Hybrid funds invest in a combination of equity and debt securities. Depending on the investment strategy, the allocation to equity can vary significantly, allowing investors to choose a balance between growth potential and stability.",
  },
  {
    num: "05",
    title: "Multi Asset Allocation Funds",
    icon: Boxes,
    body: "Multi Asset Allocation Funds invest in at least three different asset classes, such as equity, debt, gold, silver, or international securities. As per SEBI regulations, each asset class must have a minimum allocation of 10%. These funds help investors achieve better diversification through asset allocation.",
  },
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

export default function MutualFundArticle({ relatedArticles = [] }) {
  return (
    <section className="bg-background" data-testid="mutual-fund-article">
      <div className="relative overflow-hidden bg-white border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-brand-bone to-brand-navy/[0.04]" />
        <div className="container-page relative py-16 md:py-20">
          <div className="text-xs tracking-[0.2em] uppercase text-brand-blue font-semibold">
            Investment knowledge
          </div>
          <h1 className="mt-3 heading-display text-3xl md:text-5xl text-brand-navy font-semibold leading-[1.08] max-w-3xl">
            Mutual Funds
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">
            How mutual funds work, how you can invest, the main fund types by asset class, and Growth vs IDCW options.
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
            {/* What is */}
            <div id="mf-what-is" className="scroll-mt-28">
              <SectionLabel icon={Layers}>What is a Mutual Fund?</SectionLabel>
              <h3 className="heading-display text-2xl md:text-3xl text-brand-navy font-semibold leading-tight">
                Pooled money. Professional management. Proportional ownership.
              </h3>
              <div className="mt-5 bg-white border border-border rounded-lg p-7 md:p-9 space-y-4">
                <p className="text-base md:text-lg text-brand-navy/90 leading-relaxed">
                  A mutual fund is an investment vehicle that pools money from multiple investors. This pooled money is
                  professionally managed by experienced fund managers, who invest it in a diversified portfolio of
                  assets such as stocks, bonds, money market instruments, and other securities based on the fund&apos;s
                  objective.
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  In return for their investment, each investor receives units of the mutual fund. These units represent
                  proportional ownership in the fund&apos;s underlying assets. The value of these units changes based on
                  the performance of the investments held by the fund.
                </p>
              </div>
            </div>

            {/* Returns */}
            <div id="mf-returns" className="scroll-mt-28">
              <SectionLabel icon={PiggyBank}>How Investors Earn Returns</SectionLabel>
              <h3 className="heading-display text-2xl md:text-3xl text-brand-navy font-semibold leading-tight">
                Two primary ways mutual funds generate investor returns
              </h3>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RETURN_WAYS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-lg bg-white border border-border px-4 py-3.5 text-sm text-brand-navy/90"
                  >
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand-blue" strokeWidth={1.75} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Structures */}
            <div id="mf-structures" className="scroll-mt-28">
              <SectionLabel icon={Building2}>Mutual Fund Structures</SectionLabel>
              <h3 className="heading-display text-2xl md:text-3xl text-brand-navy font-semibold leading-tight">
                Available in two broad structures
              </h3>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {STRUCTURES.map((item) => (
                  <div key={item.title} className="bg-white border border-border rounded-lg p-6">
                    <h4 className="heading-display text-xl text-brand-navy font-semibold">{item.title}</h4>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How to invest */}
            <div id="mf-how-to-invest" className="scroll-mt-28">
              <SectionLabel icon={Banknote}>How You Can Invest</SectionLabel>
              <h3 className="heading-display text-2xl md:text-3xl text-brand-navy font-semibold leading-tight">
                SIP or lump sum — both routes are available
              </h3>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {INVEST_WAYS.map((item) => (
                  <div key={item.title} className="bg-white border border-border rounded-lg p-6 lift-card">
                    <h4 className="heading-display text-xl text-brand-navy font-semibold">{item.title}</h4>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-brand-blue/20 bg-brand-blue/[0.04] px-5 py-4 text-sm text-brand-navy/85 leading-relaxed">
                The mutual fund industry in India is regulated by the{" "}
                <strong className="font-semibold">Securities and Exchange Board of India (SEBI)</strong>, while the{" "}
                <strong className="font-semibold">Association of Mutual Funds in India (AMFI)</strong> promotes ethical
                practices, investor awareness, and industry standards.
              </div>
            </div>

            {/* Asset class types */}
            <div id="mf-asset-class" className="scroll-mt-28">
              <SectionLabel icon={Boxes}>Types of Mutual Funds (Based on Asset Class)</SectionLabel>
              <h3 className="heading-display text-2xl md:text-3xl text-brand-navy font-semibold leading-tight">
                Five core categories by where the money is invested
              </h3>
              <div className="mt-8 space-y-4">
                {ASSET_CLASSES.map((fund) => {
                  const Icon = fund.icon;
                  return (
                    <div
                      key={fund.title}
                      className="bg-white border border-border rounded-lg p-6 md:p-7 grid grid-cols-[auto_1fr] gap-4 md:gap-6"
                    >
                      <div className="flex flex-col items-center gap-3 pt-1">
                        <span className="heading-display text-2xl md:text-3xl text-brand-blue/80 font-semibold leading-none">
                          {fund.num}
                        </span>
                        <span className="grid h-9 w-9 place-items-center rounded-md bg-brand-navy/5 text-brand-navy">
                          <Icon className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                      </div>
                      <div>
                        <h4 className="heading-display text-xl md:text-2xl text-brand-navy font-semibold">
                          {fund.title}
                        </h4>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{fund.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Distribution options */}
            <div id="mf-distribution" className="scroll-mt-28">
              <SectionLabel icon={Sprout}>Types of Mutual Fund Plans (Based on Distribution Option)</SectionLabel>
              <h3 className="heading-display text-2xl md:text-3xl text-brand-navy font-semibold leading-tight">
                Growth vs IDCW — how income is handled
              </h3>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-border rounded-lg p-6 md:p-7">
                  <div className="text-xs uppercase tracking-[0.14em] text-brand-blue font-semibold">Growth Option</div>
                  <h4 className="mt-2 heading-display text-xl md:text-2xl text-brand-navy font-semibold">
                    Income stays invested
                  </h4>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Under the Growth Option, any income generated by the fund remains invested within the scheme. This
                    allows the investment to benefit from long-term compounding, making it a preferred choice for
                    investors focused on capital appreciation.
                  </p>
                </div>
                <div className="bg-white border border-border rounded-lg p-6 md:p-7">
                  <div className="text-xs uppercase tracking-[0.14em] text-brand-blue font-semibold">
                    IDCW Option
                  </div>
                  <h4 className="mt-2 heading-display text-xl md:text-2xl text-brand-navy font-semibold">
                    Income Distribution cum Capital Withdrawal
                  </h4>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Under the IDCW option, the fund may distribute a portion of the available surplus to investors at
                    the discretion of the fund house. These distributions are not fixed or guaranteed and depend on the
                    fund&apos;s distributable surplus and applicable regulations. Investors should note that IDCW
                    payments reduce the fund&apos;s Net Asset Value (NAV).
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
