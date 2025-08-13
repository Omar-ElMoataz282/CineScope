import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";

function SearchInput({ style, value }: { style?: string; value?: string }) {
  const [query, setQuery] = useState(value ?? "");
  const navigate = useNavigate();

  // Handle Search Add Search Query To Url And Navigate
  function handleSearch() {
    if (query) {
      navigate(`/search/?search=${query}&page=1`);
    }
  }

  return (
    <div className={`relative w-full ${style}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} />
      <input
        aria-label="Search movies"
        placeholder="Search movies..."
        className="pl-9 flex h-10 w-full rounded-md border-1 border-gray-300 border-input bg-background ps-3 py-2 text-base focus:outline-none focus:shadow-lg md:text-sm transition-all"
        value={query || value || ""}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
        variant="hero"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
}

export default SearchInput;
