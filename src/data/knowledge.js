export const KNOWLEDGE_SECTIONS = {
  investment: {
    eyebrow: "Knowledge · Investment",
    title: "Build wealth with clarity and discipline.",
    subtitle:
      "Understand mutual funds, SIPs, asset allocation and long-horizon investing — so every rupee you put to work has a purpose.",
    articles: [
      {
        slug: "mutual-funds",
        title: "Mutual Funds",
        description:
          "Learn how mutual funds work, SIP vs lump sum, asset-class categories, and Growth vs IDCW options.",
      },
      {
        slug: "idcw-vs-swp",
        title: "IDCW vs. SWP",
        description: "Which is better for generating regular income from mutual funds?",
      },
    ],
  },
  insurance: {
    eyebrow: "Knowledge · Insurance",
    title: "Protect first. Then grow with confidence.",
    subtitle:
      "Life, health and motor cover are the foundation of a sound financial plan — so compounding can work without a setback undoing years of progress.",
    articles: [],
    topics: [
      {
        title: "Term & Life Cover",
        body: "Adequate term insurance protects your family’s income goals if something happens to you. Cover should follow need, not commission.",
      },
      {
        title: "Health Insurance",
        body: "Medical inflation rises every year. The right health policy protects savings from hospital bills and keeps your investment plan on track.",
      },
      {
        title: "Motor & Other Cover",
        body: "From motor insurance to specialised covers, we help you choose protection that fits how you live and what you own.",
      },
    ],
  },
  others: {
    eyebrow: "Knowledge · Others",
    title: "Beyond funds and cover — the rest of your plan.",
    subtitle:
      "Bonds, liquidity from your portfolio, credit health, and practical money decisions that sit alongside investments and insurance.",
    articles: [
      {
        slug: "credit-score",
        title: "Credit Score",
        description:
          "Understand your CIBIL Score, why lenders care about it, and the habits that help you build and protect a strong credit profile.",
      },
    ],
    topics: [
      {
        title: "Govt. & Corporate Bonds",
        body: "Fixed-income options for stability, predictable cash flows and capital preservation when equity risk isn’t the right fit.",
      },
      {
        title: "Loan Against Securities",
        body: "Access liquidity from your portfolio without selling investments — useful for short-term needs while staying invested for the long term.",
      },
    ],
  },
};

export function getKnowledgeSection(section) {
  return KNOWLEDGE_SECTIONS[section] || null;
}

export function getKnowledgeArticle(section, slug) {
  const data = getKnowledgeSection(section);
  if (!data) return null;
  return data.articles?.find((a) => a.slug === slug) || null;
}

export function getRelatedArticles(section, currentSlug) {
  const data = getKnowledgeSection(section);
  if (!data?.articles?.length) return [];
  return data.articles
    .filter((a) => a.slug !== currentSlug)
    .map((a) => ({
      title: a.title,
      description: a.description,
      to: `/knowledge/${section}/${a.slug}`,
    }));
}

export function getArticlePath(section, slug) {
  return `/knowledge/${section}/${slug}`;
}
