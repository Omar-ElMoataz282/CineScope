import MovieCardSkeleton from "../components/MovieCartSkelton";
import MoviesCard from "../components/MoviesCard";
import type { Movies } from "../types/types";

const ShowMovies = ({
  movies,
  isLoading,
}: {
  movies: Movies[];
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 special-width sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!movies.length) {
    return <div className="text-center py-10">No movies found!</div>;
  }

  return (
    <div className="grid grid-cols-1 special-width sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
      {movies.map((movie) => (
        <MoviesCard key={movie.id} movies={movie} />
      ))}
    </div>
  );
};

export default ShowMovies;
