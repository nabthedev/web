import React from "react";
import "../styles/theme.css";

function History({ history, onClose }) {
  return (
    <div className="classic-modal">
      <div className="classic-modal-content">
        <button className="classic-btn-close" onClick={onClose}>×</button>
        <h3>Research Journal</h3>
        <ul>
          {history.length === 0 && <li>No history yet.</li>}
          {history.map((h, i) => (
            <li key={i}>
              <span className="classic-history-query">{h.query}</span>
              <span className="classic-history-date">{h.date.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default History;
