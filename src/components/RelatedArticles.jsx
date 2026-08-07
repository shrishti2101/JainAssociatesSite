import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function RelatedArticles({ articles }) {
  if (!articles?.length) return null;

  return (
    <div
      className="bg-white border border-border rounded-lg p-5 shadow-[0_12px_40px_-28px_rgba(10,37,64,0.2)]"
      data-testid="related-articles"
    >
      <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-semibold mb-4">
        Related articles
      </div>
      <div className="flex flex-col gap-2">
        {articles.map((article) => (
          <Link
            key={article.to}
            to={article.to}
            className="group w-full text-left rounded-md border border-border bg-brand-bone/40 hover:bg-white hover:border-brand-navy/20 px-3.5 py-3 transition-colors"
            data-testid={`related-article-${article.to.split("/").pop()}`}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-semibold text-brand-navy leading-snug">{article.title}</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-brand-navy/40 group-hover:text-brand-blue transition-colors mt-0.5" />
            </div>
            {article.description && (
              <span className="mt-1 block text-xs text-muted-foreground leading-relaxed">
                {article.description}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
