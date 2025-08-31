import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ResultCard from "./components/ResultCard";
import Suggestions from "./components/Suggestions";
import ResearchTrail from "./components/ResearchTrail";
import Bookmarks from "./components/Bookmarks";
import History from "./components/History";
import { mockSearch } from "./mock/searchApi";
import "./styles/theme.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (q: string, options: any) => {
    setLoading(true);
    setQuery(q);
    const res = await mockSearch(q, options);
    setResults(res);
    setHistory([{ query: q, date: new Date() }, ...history]);
    setLoading(false);
  };

  const handleBookmark = (result: any) => {
    setBookmarks([result, ...bookmarks.filter(b => b.id !== result.id)]);
  };

  return (
    <div className="classic-container">
      <header className="classic-header">
        <h1>Classic Detailed Search Engine</h1>
        <nav>
          <button onClick={() => setShowBookmarks(!showBookmarks)}>
            📑 Bookmarks
          </button>
          <button onClick={() => setShowHistory(!showHistory)}>
            📖 History
          </button>
        </nav>
      </header>
      <main>
        <SearchBar onSearch={handleSearch} />
        <Suggestions />
        {loading && <div className="classic-loader">Searching the archives...</div>}
        <div className="results-list">
          {results.map(r => (
            <ResultCard key={r.id} result={r} onBookmark={handleBookmark} />
          ))}
        </div>
        <ResearchTrail results={results} />
      </main>
      {showBookmarks && <Bookmarks bookmarks={bookmarks} onClose={() => setShowBookmarks(false)} />}
      {showHistory && <History history={history} onClose={() => setShowHistory(false)} />}
      <footer className="classic-footer">
        <span>Inspired by the grand libraries of academia. © 2025</span>
      </footer>
    </div>
  );
}

export default App;
