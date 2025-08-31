import React from "react";
import "../styles/theme.css";

// For demo purposes, use static suggestions.
const suggestions = [
  "The influence of Renaissance libraries on modern information science",
  "Comparative analysis of academic search engines",
  "How to evaluate source credibility in online research",
  "History of card catalog systems in libraries"
];

function Suggestions() {
  return (
    <aside className="classic-suggestions">
      <h3>Suggested Academic Queries:</h3>
      <ul>
        {suggestions.map((s, i) => (
          <li key={i}><em>“{s}”</em></li>
        ))}
      </ul>
    </aside>
  );
}

export default Suggestions;
