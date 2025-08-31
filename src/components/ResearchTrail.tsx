import React from "react";
import "../styles/theme.css";

type Props = {
  results: any[];
};

function ResearchTrail({ results }: Props) {
  if (!results.length) return null;

  const topics = [
    ...new Set(results.flatMap((r) => r.relatedTopics))
  ];

  return (
    <section className="classic-research-trail">
      <h4>Research Trail</h4>
      <div className="trail-map">
        {topics.map((t, i) => (
          <span className="trail-topic" key={i}>{t}</span>
        ))}
      </div>
    </section>
  );
}

export default ResearchTrail;
