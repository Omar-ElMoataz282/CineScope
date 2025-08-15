import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useDataSWR } from "../lib/SWR";
import type { Genre, Movies } from "../types/types";
import fulbackImage from "../../public/poster-page.png";

function MovieCard({ movies }: { movies: Movies }) {
  const apiKEY = import.meta.env.VITE_API_KEY;
  //For Get Movie Details
  const movieDetails = useDataSWR({
    api: `https://api.themoviedb.org/3/movie/${movies.id}?api_key=${apiKEY}&language=en-US`,
  });

  //For Generate Movie Year
  const year = movieDetails.data?.release_date?.split("-")[0];

  //For Generate Movie Genres
  const genres = movieDetails.data?.genres;

  return (
    <Link
      to={`/movie/${movies.original_title}/${movies.id}`}
      className="group rounded-lg border border-gray-300 bg-card text-card-foreground overflow-hidden hover-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`${movies.original_title} (${year}) details`}
    >
      <div className="aspect-[2/3] w-full overflow-hidden">
        <img
          src={
            movies.poster_path
              ? `https://image.tmdb.org/t/p/original/${movies.poster_path}`
              : fulbackImage
          }
          alt={`${movies.original_title} movie poster`}
          className="h-full w-full object-cover bg-center transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium truncate" title={movies.title}>
            {movies.title || "Title Not Found"}
          </h3>

          <span className="text-xs text-gray-700 ml-2 shrink-0">
            {year || "-"}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-1">
          <Star className="text-rating" size={16} />
          <span className="text-sm">
            {(movies.vote_average || 0.0).toFixed(1)}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {genres?.length > 0 ? (
            genres?.map((genre: Genre) => (
              <span
                key={genre.id}
                className="text-xs text-gray-500 border border-gray-300 rounded px-2 py-0.5"
              >
                {genre.name}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-500 border border-gray-300 rounded px-2 py-0.5">
              -----
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
