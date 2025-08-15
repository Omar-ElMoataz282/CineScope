import { Helmet } from "react-helmet";
import Hero from "../components/Hero";
import { Button } from "../components/ui/Button";
import { useMemo } from "react";
import ShowMovies from "../features/ShowMovies";
import { useDataSWR } from "../lib/SWR";
import type { Genre, Movies } from "../types/types";
import SearchInput from "../components/SearchInput";
import PaginatedItems from "../components/Pagination";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const apiKEY = import.meta.env.VITE_API_KEY;

  const [searchParams, setSearchParams] = useSearchParams();

  const genreParam = searchParams.get("genre") || "All";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const genre = genreParam;
  const page = pageParam;

  // Fetch Genres
  const genresList = useDataSWR({
    api: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKEY}&language=en-US`,
  });

  // Fetch Movies
  const getData = useDataSWR({
    api:
      genre === "All"
        ? `https://api.themoviedb.org/3/movie/popular?api_key=${apiKEY}&language=en-US&page=${page}`
        : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKEY}&language=en-US&page=${page}&with_genres=${genre}`,
  });
  const MOVIES: Movies[] | undefined = getData.data?.results;

  //For Get Sorted Movies by Rating
  const filteredData = useMemo(() => {
    return (MOVIES ?? []).sort((a, b) => b.vote_average - a.vote_average);
  }, [MOVIES]);

  //For Adding Genre to URL
  const handleGenreChange = (newGenre: string) => {
    setSearchParams({ genre: newGenre, page: "1" });
  };

  //For Adding Page Count to URL
  const handlePageChange = (newPage: number) => {
    setSearchParams({ genre, page: newPage.toString() });
  };

  return (
    <main>
      <Helmet>
        <title>CineScope — Discover Movies</title>
        <meta
          name="description"
          content="Browse trending films, filter by genre, and discover your next favorite movie on CineScope."
        />
        <link
          rel="canonical"
          href={typeof window !== "undefined" ? window.location.href : "/"}
        />
      </Helmet>

      <Hero />

      <section className="lg:container pt-10 m-auto px-[1rem]" id="browse">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-[2rem]">
          <SearchInput style="md:w-7xl" />

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <Button
              variant={genre === "All" ? "secondary" : "border"}
              size="sm"
              className={`cursor-pointer ${
                genre === "All" && "hover:bg-unset"
              }`}
              onClick={() => handleGenreChange("All")}
            >
              All
            </Button>

            {genresList.data?.genres.map((g: Genre) => (
              <Button
                key={g.id}
                variant={+genre === g.id ? "secondary" : "border"}
                size="sm"
                className={`cursor-pointer ${
                  genre === g.name && "hover:bg-unset"
                }`}
                onClick={() => handleGenreChange(g.id.toString())}
              >
                {g.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8" id="movies">
          <ShowMovies movies={filteredData} isLoading={getData.isLoading} />
        </div>

        <PaginatedItems
          setPage={handlePageChange}
          page={page}
          itemsPerPage={20}
          total={Math.min(getData.data?.total_results || 0, 1000)}
          pageLocation={500}
        />
      </section>
    </main>
  );
}

export default HomePage;
