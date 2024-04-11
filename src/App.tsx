/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./App.css";



function App() {
  const [searchResults, setSearchResults] = useState<any[]>([]); //resp.hits.hits
  const [query, setQuery] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    let key: string | null = apiKey ? apiKey : "";
    if (!key) {
      const data = window.prompt("Enter api key");

      data && setApiKey(data);
      key = data;
    }

    if (!key) {
      window.alert("Please enter api key");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://qotkkpz8oa.execute-api.us-east-2.amazonaws.com/api-opensearch-movies?q=${encodeURIComponent(query)}`,
        {
          headers: {
            "x-api-key": key,
          },
        },
      );

      if (!response.ok) {
        setLoading(false);
        if (response.status === 403) {
          throw new Error("Access forbidden. Please check your API key.");
        }
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResults(data.hits.hits); // Adjust based on your API response structure
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      {/* Input field for search query */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Button to trigger search */}
      <button onClick={handleSearch} disabled={loading || query === ""}>
        Search
      </button>

      {/* Display your search results here */}
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: 10,
          flexWrap: "wrap"
        }}
      >
        {loading
          ? "Loading"
          : searchResults?.length === 0 && <div>No data</div>}

        {searchResults.map((result) => (
          <div
            key={result.id}
            style={{ padding: 10, background: "#ddd", borderRadius: 4, width: 180 }}
          >
            <div>
              <img
                src={result._source.image_url}
                alt="img"
                height={100}
                width={"auto"}
              />
            </div>
            <div style={{ fontSize: 15, fontWeight: "bold" }}>
              {result._source.title}
            </div>
            <div>{result._source.plot}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
