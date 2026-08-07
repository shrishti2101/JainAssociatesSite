import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { getArticlePath, getKnowledgeSection } from "@/data/knowledge";

export default function KnowledgePage() {
  const { section } = useParams();
  const content = getKnowledgeSection(section);

  if (!content) {
    return <Navigate to="/knowledge/investment" replace />;
  }

  const articles = content.articles || [];
  const topics = content.topics || [];

  return (
    <div data-testid={`knowledge-page-${section}`}>
      <PageHeader
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        testid={`knowledge-header-${section}`}
      />

      {articles.length > 0 && (
        <section className="container-page py-16 md:py-20" data-testid={`knowledge-articles-${section}`}>
          <div className="text-xs tracking-[0.2em] uppercase text-brand-blue font-semibold">Articles</div>
          <h2 className="mt-2 heading-display text-2xl md:text-3xl text-brand-navy font-semibold">
            Guides in this category
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={getArticlePath(section, article.slug)}
                className="bg-white border border-border rounded-lg p-6 md:p-7 block transition-colors hover:border-brand-navy/25 lift-card"
                data-testid={`knowledge-article-card-${article.slug}`}
              >
                <div className="text-xs uppercase tracking-[0.14em] text-brand-blue font-semibold">Article</div>
                <h3 className="mt-2 heading-display text-xl md:text-2xl text-brand-navy font-semibold">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{article.description}</p>
                <span className="mt-4 inline-block text-xs font-semibold tracking-wide text-brand-navy border-b border-brand-navy/30 pb-0.5">
                  Read the full guide →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {topics.length > 0 && (
        <section
          className={`container-page ${articles.length ? "pb-16 md:pb-20" : "py-16 md:py-20"}`}
          data-testid={`knowledge-topics-${section}`}
        >
          {articles.length > 0 && (
            <>
              <div className="text-xs tracking-[0.2em] uppercase text-brand-blue font-semibold">Also explore</div>
              <h2 className="mt-2 heading-display text-2xl md:text-3xl text-brand-navy font-semibold mb-8">
                Related themes
              </h2>
            </>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {topics.map((topic) => (
              <div
                key={topic.title}
                className="bg-white border border-border rounded-lg p-6 md:p-7"
              >
                <h3 className="heading-display text-xl md:text-2xl text-brand-navy font-semibold">{topic.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{topic.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {!articles.length && !topics.length && (
        <section className="container-page py-16 md:py-20">
          <p className="text-muted-foreground">More knowledge content coming soon.</p>
        </section>
      )}

      <CTASection />
    </div>
  );
}
