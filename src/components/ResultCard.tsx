import React from "react";
import "../styles/theme.css";

type Props = {
  result: any;
  onBookmark: (result: any) => void;
};

function ResultCard({ result, onBookmark }: Props) {
  return (
    <article className="classic-card">
      <div className="classic-card-header">
        <div className="classic-card-title">
          <a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a>
        </div>
        <div className="classic-card-domain">
          {result.domain} <span className={`trust-indicator trust-${result.domainAuthority}`}></span>
        </div>
      </div>
      <div className="classic-card-meta">
        <span className="meta-item">Content: {result.contentType}</span>
        <span className="meta-item">Read Level: {result.readingLevel}</span>
        <span className="meta-item">Word Count: {result.wordCount}</span>
        <span className="meta-item">Est. Read: {result.estimatedReadTime} min</span>
        <span className="meta-item">Last Updated: {result.lastUpdated}</span>
        <span className="meta-item">Freshness: {result.freshness}</span>
        <span className="meta-item">Source Credibility: <span className={`cred-score cred-score-${result.sourceCredibility}`}></span> {result.sourceCredibility}/10</span>
      </div>
      <blockquote className="classic-card-snippet">
        {result.snippet}
      </blockquote>
      <div className="classic-card-actions">
        <button className="classic-btn-plain" onClick={() => onBookmark(result)}>📑 Bookmark</button>
        <button className="classic-btn-plain" onClick={() => navigator.clipboard.writeText(result.citation)}>Copy Citation</button>
      </div>
      <div className="classic-card-footer">
        <span>Related topics: {result.relatedTopics.join(", ")}</span>
        <span>Lineage: {result.lineage.join(" → ")}</span>
      </div>
    </article>
  );
}

export default ResultCard;
