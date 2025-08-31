import React from "react";
import "../styles/theme.css";

type Props = {
  results: any[];
};

// For demo, a simple connection between topics as lines.
function ResearchTrail({ results }: Props) {
  if (!results.length) return null;

  // Collect unique topics and draw lines.
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
        {/* For demo, lines between topics omitted. */}
      </div>
      {/* In production, use a graph library for topic connections */}
    </section>
  );
}

export default ResearchTrail;
