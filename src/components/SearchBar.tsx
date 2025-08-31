import React, { useState } from "react";
import "../styles/theme.css";

const defaultOptions = {
  dateRange: "any",
  contentType: "any",
  readingLevel: "any"
};

type Props = {
  onSearch: (query: string, options: any) => void;
};

function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [options, setOptions] = useState(defaultOptions);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, options);
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOptions({ ...options, [e.target.name]: e.target.value });
  };

  return (
    <section className="classic-searchbox">
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={handleInput}
          className="classic-input"
          placeholder="Enter your research query..."
        />
        <button className="classic-btn" type="submit">
          Search
        </button>
        <button
          className="classic-btn-plain"
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? "Hide" : "Advanced"}
        </button>
      </form>
      {showAdvanced && (
        <div className="classic-advanced-panel">
          <label>
            Date Range:
            <select name="dateRange" onChange={handleOptionChange} value={options.dateRange}>
              <option value="any">Any</option>
              <option value="24h">Last 24h</option>
              <option value="week">Last week</option>
              <option value="year">Last year</option>
              <option value="decade">Last decade</option>
            </select>
          </label>
          <label>
            Content Type:
            <select name="contentType" onChange={handleOptionChange} value={options.contentType}>
              <option value="any">Any</option>
              <option value="academic">Academic</option>
              <option value="news">News</option>
              <option value="blog">Blog</option>
              <option value="commercial">Commercial</option>
            </select>
          </label>
          <label>
            Reading Level:
            <select name="readingLevel" onChange={handleOptionChange} value={options.readingLevel}>
              <option value="any">Any</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>
        </div>
      )}
    </section>
  );
}

export default SearchBar;
