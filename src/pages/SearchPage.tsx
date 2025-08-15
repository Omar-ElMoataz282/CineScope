import { useSearchParams } from "react-router-dom";
import { useDataSWR } from "../lib/SWR";
import type { Movies } from "../types/types";
import ShowMovies from "../features/ShowMovies";
import PaginatedItems from "../components/Pagination";
import SearchInput from "../components/SearchInput";

function SearchPage() {
  const apiKEY = import.meta.env.VITE_API_KEY;
  //Get Search Query
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search");

  //For Pagination
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const page = pageParam;

  // Fetch Movies
  const getData = useDataSWR({
    api: `https://api.themoviedb.org/3/search/movie?api_key=${apiKEY}&query=${query}&language=en-US&page=${page}`,
  });
  const MOVIES: Movies[] | undefined = getData.data?.results;

  //For Adding Page Count to URL
  const handlePageChange = (newPage: number) => {
    setSearchParams({ search: query || "", page: newPage.toString() });
  };

  return (
    <section className="lg:container pt-10 m-auto px-[1rem]">
      <SearchInput value={query ?? ""} />

      <div className="mt-8" id="movies">
        <ShowMovies movies={MOVIES || []} isLoading={getData.isLoading} />
      </div>

      <PaginatedItems
        setPage={handlePageChange}
        page={page}
        itemsPerPage={20}
        total={getData.data?.total_results || 0}
        pageLocation={0}
      />
    </section>
  );
}

export default SearchPage;
