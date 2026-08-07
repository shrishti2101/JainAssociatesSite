import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CTASection from "@/components/CTASection";
import MutualFundArticle from "@/components/MutualFundArticle";
import IdcwVsSwpArticle from "@/components/IdcwVsSwpArticle";
import CreditScoreArticle from "@/components/CreditScoreArticle";
import {
  getKnowledgeArticle,
  getKnowledgeSection,
  getRelatedArticles,
} from "@/data/knowledge";

const ARTICLE_COMPONENTS = {
  "mutual-funds": MutualFundArticle,
  "idcw-vs-swp": IdcwVsSwpArticle,
  "credit-score": CreditScoreArticle,
};

export default function KnowledgeArticlePage() {
  const { section, article: slug } = useParams();
  const sectionData = getKnowledgeSection(section);
  const articleMeta = getKnowledgeArticle(section, slug);
  const Article = ARTICLE_COMPONENTS[slug];

  if (!sectionData || !articleMeta || !Article) {
    return <Navigate to={sectionData ? `/knowledge/${section}` : "/knowledge/investment"} replace />;
  }

  const relatedArticles = getRelatedArticles(section, slug);

  return (
    <div data-testid={`knowledge-article-${section}-${slug}`}>
      <div className="bg-white border-b border-border">
        <div className="container-page py-4">
          <Link
            to={`/knowledge/${section}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy/70 hover:text-brand-navy transition-colors"
            data-testid="knowledge-article-back"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {section.charAt(0).toUpperCase() + section.slice(1)}
          </Link>
        </div>
      </div>

      <Article relatedArticles={relatedArticles} />
      <CTASection />
    </div>
  );
}
