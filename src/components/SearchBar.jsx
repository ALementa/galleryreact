export default function SearchBar({ query, setQuery }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search images..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
