import React from "react";
import "../styles/theme.css";

function Bookmarks({ bookmarks, onClose }) {
  return (
    <div className="classic-modal">
      <div className="classic-modal-content">
        <button className="classic-btn-close" onClick={onClose}>×</button>
        <h3>Library Bookmarks</h3>
        <ul>
          {bookmarks.length === 0 && <li>No bookmarks yet.</li>}
          {bookmarks.map((b, i) => (
            <li key={i}>
              <a href={b.url} target="_blank" rel="noopener noreferrer">{b.title}</a>
              <span className="classic-bookmark-meta">{b.domain}</span>
              <button className="classic-btn-plain" onClick={() => navigator.clipboard.writeText(b.citation)}>Copy Citation</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Bookmarks;
