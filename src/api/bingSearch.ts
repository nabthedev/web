export async function bingSearch(query, options = {}) {
  // DuckDuckGo Instant Answer API endpoint
  const params = new URLSearchParams({
    q: query,
    format: "json",
    no_redirect: "1",
    no_html: "1",
    skip_disambig: "1"
  });

  // DuckDuckGo doesn't support advanced options, but you could append them to the query string if desired.

  const response = await fetch(`https://api.duckduckgo.com/?${params.toString()}`);
  const data = await response.json();

  // Helper to flatten RelatedTopics (which can be nested)
  function flattenTopics(arr) {
    let out = [];
    for (const item of arr) {
      if (item.Topics) {
        out = out.concat(flattenTopics(item.Topics));
      } else {
        out.push(item);
      }
    }
    return out;
  }

  const related = flattenTopics(data.RelatedTopics || []);
  const results = [];

  if (data.AbstractURL && data.AbstractText) {
    results.push({
      id: "duckduckgo-abstract",
      title: data.Heading || query,
      url: data.AbstractURL,
      domain: data.AbstractURL ? new URL(data.AbstractURL).hostname : "",
      domainAuthority: 7,
      contentType: "web",
      readingLevel: "unknown",
      estimatedReadTime: Math.ceil((data.AbstractText.split(/\s+/).length || 100) / 200 * 2),
      wordCount: data.AbstractText.split(/\s+/).length || 100,
      lastUpdated: "Unknown",
      freshness: "Unknown",
      sourceCredibility: 7,
      snippet: data.AbstractText,
      relatedTopics: related.slice(0, 3).map(r => r.Text || "").filter(Boolean),
      citation: `${data.Heading || query}. ${data.AbstractURL}`,
      lineage: [data.AbstractURL].filter(Boolean)
    });
  }

  for (const topic of related) {
    results.push({
      id: topic.FirstURL,
      title: topic.Text?.split(" - ")[0] || topic.Text || topic.FirstURL,
      url: topic.FirstURL,
      domain: topic.FirstURL ? new URL(topic.FirstURL).hostname : "",
      domainAuthority: 6,
      contentType: "web",
      readingLevel: "unknown",
      estimatedReadTime: Math.ceil((topic.Text?.split(/\s+/).length || 80) / 200 * 2),
      wordCount: topic.Text?.split(/\s+/).length || 80,
      lastUpdated: "Unknown",
      freshness: "Unknown",
      sourceCredibility: 6,
      snippet: topic.Text,
      relatedTopics: [],
      citation: `${topic.Text?.split(" - ")[0] || topic.Text}. ${topic.FirstURL}`,
      lineage: [topic.FirstURL].filter(Boolean)
    });
  }

  return results;
}
